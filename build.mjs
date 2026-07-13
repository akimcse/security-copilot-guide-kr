import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const OUT = join(ROOT, 'site');

const SITE_TITLE = 'Microsoft Security Copilot 실전 가이드';
const REPO_URL = 'https://github.com/akimcse/security-copilot-guide-kr';

// 사이드바/순서 메타 (part, 소요시간, 아이콘)
const NAV = [
  { part: '홈', icon: '🏠', items: [
    { file: 'README.md', out: 'index.html', label: '가이드 홈', time: '' },
  ]},
  { part: 'Part 1 · 시작하기', icon: '🚀', items: [
    { file: '00-overview.md', out: '00-overview.html', label: '00 · 개요', time: '6분' },
    { file: '01-prerequisites.md', out: '01-prerequisites.html', label: '01 · 사전 준비', time: '9분' },
    { file: '02-concepts.md', out: '02-concepts.html', label: '02 · 핵심 개념', time: '7분' },
  ]},
  { part: 'Part 2 · 핵심 기능', icon: '🧩', items: [
    { file: '03-standalone-portal.md', out: '03-standalone-portal.html', label: '03 · Standalone 포털', time: '7분' },
    { file: '04-promptbooks.md', out: '04-promptbooks.html', label: '04 · 프롬프트북', time: '8분' },
    { file: '05-plugins.md', out: '05-plugins.html', label: '05 · 플러그인', time: '7분' },
    { file: '06-embedded-experiences.md', out: '06-embedded-experiences.html', label: '06 · 임베디드 경험', time: '9분' },
    { file: '07-agents.md', out: '07-agents.html', label: '07 · 에이전트', time: '8분' },
  ]},
  { part: 'Part 3 · 운영·거버넌스', icon: '🛡️', items: [
    { file: '08-usage-monitoring.md', out: '08-usage-monitoring.html', label: '08 · 사용량 모니터링', time: '6분' },
    { file: '09-responsible-ai.md', out: '09-responsible-ai.html', label: '09 · 책임 있는 AI', time: '8분' },
  ]},
  { part: 'Part 4 · 실습·활용·참조', icon: '🧪', items: [
    { file: '10-handson-lab.md', out: '10-handson-lab.html', label: '10 · 핸즈온 랩', time: '20분' },
    { file: '11-use-cases.md', out: '11-use-cases.html', label: '11 · 실무 활용', time: '30분+' },
    { file: '99-troubleshooting.md', out: '99-troubleshooting.html', label: '99 · 부록', time: '참조' },
  ]},
];

const ALERTS = { NOTE:'노트', TIP:'팁', IMPORTANT:'중요', WARNING:'주의', CAUTION:'경고' };
const ALERT_ICON = { NOTE:'📝', TIP:'💡', IMPORTANT:'❗', WARNING:'⚠️', CAUTION:'🚫' };

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
      out.push(`<div class="callout callout-${kind.toLowerCase()}"><div class="callout-title"><span class="callout-ico">${ALERT_ICON[kind]}</span>${ALERTS[kind]}</div>${inner}</div>`);
    } else {
      out.push(lines[i]);
      i++;
    }
  }
  return out.join('\n');
}

function rewriteLinks(md) {
  return md
    .replace(/\(\.\/images\/README\.md\)/g, `(${REPO_URL}/blob/main/images/README.md)`)
    .replace(/\(\.\/README\.md([^)]*)\)/g, '(./index.html$1)')
    .replace(/"\.\/README\.md"/g, '"./index.html"')
    .replace(/\(\.\/([0-9A-Za-z\-]+)\.md([^)]*)\)/g, '(./$1.html$2)')
    .replace(/"\.\/([0-9A-Za-z\-]+)\.md"/g, '"./$1.html"');
}

// 마크다운에 들어있던 브레드크럼 줄과 하단 "다음 읽을거리/코스를 마치며" 블록 제거 (사이트는 자체 크롬 생성)
function stripInlineChrome(md) {
  md = md.replace(/^\[🏠 전체 목차\][^\n]*\n+/, '');
  md = md.replace(/\n(?:---\s*\n+)?###\s*(다음 읽을거리|코스를 마치며)[\s\S]*$/, '\n');
  // 사이트 홈에서는 자기 자신을 가리키는 '웹사이트로 보기' 줄 제거 (README에는 유지)
  md = md.replace(/^\s*🌐\s*\*\*웹사이트로 보기[^\n]*\n+/m, '');
  return md;
}

// HTML 주석(<!-- ... -->)을 파싱 전에 통째로 제거.
// (marked가 리스트/인라인 문맥에서 닫는 -->를 --&gt;로 이스케이프해 주석이 안 닫히고
//  이후 전체 내용이 사라지는 문제를 방지. 주석 내용은 의도대로 출력에서 제외됨.)
function stripHtmlComments(md) {
  return md.replace(/<!--[\s\S]*?-->/g, '');
}

// 굵은 글씨(**...**)를 파싱 전에 <strong>...</strong>로 변환.
// (CommonMark의 flanking 규칙상 닫는 **가 ')' 등 구두점 뒤 + 한글 앞에 오면
//  볼드로 인식되지 않아 **가 그대로 노출되는 문제를 방지. 한국어 문서에서 흔함.)
// 코드 펜스(```)와 인라인 코드(`...`)는 건드리지 않는다.
function fixBold(md) {
  const parts = md.split(/(```[\s\S]*?```)/g); // 코드펜스 보존
  return parts.map(seg => {
    if (seg.startsWith('```')) return seg;
    // 인라인 코드 보존하며 나머지에서만 ** 변환
    return seg.split(/(`[^`]*`)/g).map(s => {
      if (s.startsWith('`')) return s;
      return s.replace(/\*\*(?=\S)([\s\S]+?)(?<=\S)\*\*/g, '<strong>$1</strong>');
    }).join('');
  }).join('');
}

function extractTitle(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/[#*`]/g, '').trim() : fallback;
}

// 렌더된 HTML의 h2/h3에 id 부여 + TOC 수집
function injectHeadingIds(html) {
  const toc = [];
  let n = 0;
  const out = html.replace(/<(h2|h3)>([\s\S]*?)<\/\1>/g, (full, tag, inner) => {
    const id = 'sec-' + (++n);
    const text = inner.replace(/<[^>]+>/g, '').trim();
    toc.push({ level: tag === 'h2' ? 2 : 3, id, text });
    return `<${tag} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${inner}</${tag}>`;
  });
  return { html: out, toc };
}

function buildTocHtml(toc) {
  if (!toc.length) return '';
  let html = '<div class="toc-title">이 페이지</div><ul>';
  for (const t of toc) {
    html += `<li class="toc-l${t.level}"><a href="#${t.id}">${t.text}</a></li>`;
  }
  html += '</ul>';
  return html;
}

function buildSidebar(currentOut) {
  let html = '';
  for (const group of NAV) {
    html += `<div class="nav-group"><div class="nav-part"><span class="nav-ico">${group.icon}</span>${group.part}</div><ul>`;
    for (const it of group.items) {
      const active = it.out === currentOut ? ' class="active"' : '';
      const t = it.time ? `<span class="nav-time">${it.time}</span>` : '';
      html += `<li><a href="./${it.out}"${active}>${it.label}${t}</a></li>`;
    }
    html += `</ul></div>`;
  }
  return html;
}

// 부위/이전-다음 계산
const FLAT = [];
for (const g of NAV) for (const it of g.items) FLAT.push({ ...it, part: g.part, icon: g.icon });
function metaFor(out) {
  const idx = FLAT.findIndex(x => x.out === out);
  return { cur: FLAT[idx], prev: FLAT[idx-1], next: FLAT[idx+1], idx };
}

function buildBreadcrumb(cur) {
  if (cur.out === 'index.html') return '';
  return `<nav class="crumb"><a href="./index.html">홈</a><span class="sep">›</span><span class="crumb-part">${cur.part}</span>${cur.time ? `<span class="crumb-time">⏱️ ${cur.time}</span>` : ''}</nav>`;
}

function buildPrevNext(prev, next) {
  if (!prev && !next) return '';
  const p = prev ? `<a class="pn pn-prev" href="./${prev.out}"><span class="pn-dir">← 이전</span><span class="pn-label">${prev.label}</span></a>` : `<span class="pn pn-empty"></span>`;
  const n = next ? `<a class="pn pn-next" href="./${next.out}"><span class="pn-dir">다음 →</span><span class="pn-label">${next.label}</span></a>` : `<span class="pn pn-empty"></span>`;
  return `<nav class="prevnext">${p}${n}</nav>`;
}

// 홈: 헤더에 '소요'가 있는 코스 표에만 카드 스타일 클래스 부여
function markCourseTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (full, inner) => {
    return inner.includes('>소요<') ? `<table class="cards">${inner}</table>` : full;
  });
}

marked.use({
  renderer: {
    code(token) {
      const text = typeof token === 'object' ? token.text : token;
      const lang = typeof token === 'object' ? token.lang : arguments[1];
      if (lang === 'mermaid') return `<pre class="mermaid">${text}</pre>`;
      return false;
    }
  }
});

const template = readFileSync(join(ROOT, 'site-assets', 'template.html'), 'utf8');
const styleCss = readFileSync(join(ROOT, 'site-assets', 'style.css'), 'utf8');
const CSS_VER = createHash('sha256').update(styleCss).digest('hex').slice(0, 8);

if (existsSync(OUT)) rmSync(OUT, { recursive:true, force:true });
mkdirSync(OUT, { recursive:true });

for (const g of NAV) for (const item of g.items) {
  const isHome = item.out === 'index.html';
  const raw = readFileSync(join(ROOT, item.file), 'utf8');
  const title = extractTitle(raw, item.label);
  let md = rewriteLinks(raw);
  md = stripHtmlComments(md);
  md = stripInlineChrome(md);
  md = fixBold(md);
  md = transformAlerts(md);
  let bodyHtml = marked.parse(md);
  let toc = [];
  if (!isHome) { const r = injectHeadingIds(bodyHtml); bodyHtml = r.html; toc = r.toc; }
  if (isHome) bodyHtml = markCourseTables(bodyHtml);

  const { cur, prev, next } = metaFor(item.out);
  const page = template
    .replaceAll('{{SITE_TITLE}}', SITE_TITLE)
    .replaceAll('{{PAGE_TITLE}}', title)
    .replaceAll('{{REPO_URL}}', REPO_URL)
    .replaceAll('{{CSS_VER}}', CSS_VER)
    .replaceAll('{{BODY_CLASS}}', isHome ? 'is-home' : 'is-doc')
    .replace('{{SIDEBAR}}', buildSidebar(item.out))
    .replace('{{BREADCRUMB}}', buildBreadcrumb(cur))
    .replace('{{TOC}}', isHome ? '' : buildTocHtml(toc))
    .replace('{{CONTENT}}', bodyHtml)
    .replace('{{PREVNEXT}}', isHome ? buildPrevNext(null, next) : buildPrevNext(prev, next));
  writeFileSync(join(OUT, item.out), page, 'utf8');
  console.log('built', item.out);
}

if (existsSync(join(ROOT, 'images'))) cpSync(join(ROOT, 'images'), join(OUT, 'images'), { recursive:true });
cpSync(join(ROOT, 'site-assets', 'style.css'), join(OUT, 'style.css'));
writeFileSync(join(OUT, '.nojekyll'), '');
console.log('done ->', OUT);
