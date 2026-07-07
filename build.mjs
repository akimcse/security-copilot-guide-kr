import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const OUT = join(ROOT, 'site');

// 사이트 메타
const SITE_TITLE = 'Microsoft Security Copilot 실전 가이드';
const REPO_URL = 'https://github.com/akimcse/security-copilot-guide-kr';

// 사이드바 순서 (Part 그룹)
const NAV = [
  { part: '홈', items: [ { file: 'README.md', out: 'index.html', label: '가이드 홈' } ] },
  { part: 'Part 1 · 시작하기', items: [
    { file: '00-overview.md', out: '00-overview.html', label: '00 · 개요' },
    { file: '01-prerequisites.md', out: '01-prerequisites.html', label: '01 · 사전 준비' },
    { file: '02-concepts.md', out: '02-concepts.html', label: '02 · 핵심 개념' },
  ]},
  { part: 'Part 2 · 핵심 기능', items: [
    { file: '03-standalone-portal.md', out: '03-standalone-portal.html', label: '03 · Standalone 포털' },
    { file: '04-promptbooks.md', out: '04-promptbooks.html', label: '04 · 프롬프트북' },
    { file: '05-plugins.md', out: '05-plugins.html', label: '05 · 플러그인' },
    { file: '06-embedded-experiences.md', out: '06-embedded-experiences.html', label: '06 · 임베디드 경험' },
    { file: '07-agents.md', out: '07-agents.html', label: '07 · 에이전트' },
  ]},
  { part: 'Part 3 · 운영·거버넌스', items: [
    { file: '08-usage-monitoring.md', out: '08-usage-monitoring.html', label: '08 · 사용량 모니터링' },
    { file: '09-responsible-ai.md', out: '09-responsible-ai.html', label: '09 · 책임 있는 AI' },
  ]},
  { part: 'Part 4 · 실습·참조', items: [
    { file: '10-handson-lab.md', out: '10-handson-lab.html', label: '10 · 핸즈온 랩' },
    { file: '99-troubleshooting.md', out: '99-troubleshooting.html', label: '99 · 부록' },
  ]},
];

// GitHub 스타일 alert(콜아웃) 변환: > [!NOTE] ... 블록
const ALERTS = { NOTE:'노트', TIP:'팁', IMPORTANT:'중요', WARNING:'주의', CAUTION:'경고' };
function transformAlerts(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/);
    if (m) {
      const kind = m[1];
      const body = [];
      i++;
      while (i < lines.length && lines[i].startsWith('>')) {
        body.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const inner = marked.parse(body.join('\n'));
      out.push(`<div class="callout callout-${kind.toLowerCase()}"><div class="callout-title">${ALERTS[kind]}</div>${inner}</div>`);
    } else {
      out.push(lines[i]);
      i++;
    }
  }
  return out.join('\n');
}

// .md 링크를 .html로 (일반 링크 + mermaid click 지시문 모두)
function rewriteLinks(md) {
  return md
    .replace(/\(\.\/images\/README\.md\)/g, '(https://github.com/akimcse/security-copilot-guide-kr/blob/main/images/README.md)')
    .replace(/\(\.\/README\.md([^)]*)\)/g, '(./index.html$1)')
    .replace(/"\.\/README\.md"/g, '"./index.html"')
    .replace(/\(\.\/([0-9A-Za-z\-]+)\.md([^)]*)\)/g, '(./$1.html$2)')
    .replace(/"\.\/([0-9A-Za-z\-]+)\.md"/g, '"./$1.html"');
}

// 첫 H1을 페이지 제목으로 추출
function extractTitle(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/[#*`]/g,'').trim() : fallback;
}

function buildSidebar(currentOut) {
  let html = '';
  for (const group of NAV) {
    html += `<div class="nav-group"><div class="nav-part">${group.part}</div><ul>`;
    for (const it of group.items) {
      const active = it.out === currentOut ? ' class="active"' : '';
      html += `<li><a href="./${it.out}"${active}>${it.label}</a></li>`;
    }
    html += `</ul></div>`;
  }
  return html;
}

// mermaid 코드펜스를 <pre class="mermaid">로 렌더되게 처리
marked.use({
  renderer: {
    code(token) {
      const text = typeof token === 'object' ? token.text : token;
      const lang = typeof token === 'object' ? token.lang : arguments[1];
      if (lang === 'mermaid') return `<pre class="mermaid">${text}</pre>`;
      return false; // 기본 렌더러 사용
    }
  }
});

const template = readFileSync(join(ROOT, 'site-assets', 'template.html'), 'utf8');

// 빌드
if (existsSync(OUT)) rmSync(OUT, { recursive:true, force:true });
mkdirSync(OUT, { recursive:true });

const allItems = NAV.flatMap(g => g.items);
for (const item of allItems) {
  const raw = readFileSync(join(ROOT, item.file), 'utf8');
  const title = extractTitle(raw, item.label);
  let md = rewriteLinks(raw);
  md = transformAlerts(md);
  const bodyHtml = marked.parse(md);
  const sidebar = buildSidebar(item.out);
  const page = template
    .replaceAll('{{SITE_TITLE}}', SITE_TITLE)
    .replaceAll('{{PAGE_TITLE}}', title)
    .replaceAll('{{REPO_URL}}', REPO_URL)
    .replace('{{SIDEBAR}}', sidebar)
    .replace('{{CONTENT}}', bodyHtml);
  writeFileSync(join(OUT, item.out), page, 'utf8');
  console.log('built', item.out);
}

// 이미지 및 정적 자산 복사
if (existsSync(join(ROOT, 'images'))) cpSync(join(ROOT, 'images'), join(OUT, 'images'), { recursive:true });
cpSync(join(ROOT, 'site-assets', 'style.css'), join(OUT, 'style.css'));
// GitHub Pages가 Jekyll 처리를 건너뛰도록
writeFileSync(join(OUT, '.nojekyll'), '');
console.log('done ->', OUT);
