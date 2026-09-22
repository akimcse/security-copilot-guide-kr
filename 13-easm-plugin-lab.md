[🏠 전체 목차](./README.md)　·　**Part 4 · 실습·활용**　·　페이지 14 / 15

# 13 · 핸즈온 랩 3) EASM 연동

> [!NOTE]
> **이 페이지에서 얻는 것**
> - Microsoft 공식 **Defender EASM 플러그인**을 Security Copilot에 **직접 연동**하는 전체 절차(연결 → 리소스 설정 → 실행)
> - 플러그인이 제공하는 **8가지 기능(capability)**을 자연어 프롬프트로 호출하는 법 — 한국어/원문 병기
> - **Logic Apps로 리포팅 자동화** — 매일 아침 공격면 요약을 디자인된 HTML 메일로 무인 발송(조회·서식 2단계 분리 패턴 포함)
>
> ⏱️ 예상 소요 **40분+**　·　🎯 대상: SOC 분석가 · 위협·취약점 관리(TVM) 담당 · IT/보안 관리자

조직의 방화벽 **바깥**에는 우리가 미처 인지하지 못한 자산이 존재합니다 — 잊힌 테스트 서브도메인, 만료된 인증서, 섀도 IT가 띄운 SaaS, 노출된 포트. **Microsoft Defender External Attack Surface Management(EASM)**는 이 외부 노출면을 지속적으로 발견·매핑하고, **Security Copilot 플러그인**을 통해 그 결과를 자연어로 질의할 수 있게 합니다. 이 랩은 **플러그인을 켜고(1단계) → 실제 프롬프트로 위험을 조사하고(2단계) → Logic Apps로 매일 아침 리포트 메일을 자동 발송(3단계)**하는 과정을 처음부터 끝까지 따라갑니다.

---

## 이 플러그인이 답해 주는 것 — 4가지 핵심 가치

| 가치 | 설명 |
| --- | --- |
| **외부 공격면 스냅샷** | 인터넷에 공개된 정보 + EASM 고유 탐색 알고리즘을 결합해, 호스트·도메인·웹페이지·IP 등 **외부 노출 자산과 그에 딸린 핵심 위험**을 자연어로 요약합니다. |
| **위험 기반 우선순위** | 취약점·인프라 데이터를 분석해 **어떤 자산과 어떤 CVE가 가장 위험한지** 짚고, 권고 조치를 자연어로 설명합니다. |
| **자연어 인사이트 추출** | "안전하지 않은 SSL 인증서 수는?", "열려 있는 포트는?", "이 취약점의 영향 자산은?" 같은 질문을 **KQL·쿼리 문법 없이** 던집니다. |
| **공격면 큐레이션 가속** | 라벨·외부 ID·상태 변경을 자산 집합에 적용해 **인벤토리 정리 속도**를 높입니다. |

---

## 사전 확인 — 이게 안 되면 진행이 막힙니다

시작 전 아래 항목을 먼저 확인하세요.

| 항목 | 필요 조건 |
| --- | --- |
| **Security Copilot 접근** | Security Copilot이 프로비저닝되어 있고 로그인 가능해야 합니다(최소 1 SCU 이상). |
| **플러그인 활성화 권한** | 새 연결을 **활성화(activate)할 권한**이 필요합니다. 개인 범위는 **Contributor**로 충분하지만, 워크스페이스 전체에 켜려면 **Owner**가 **Plugin settings**에서 허용해야 합니다. |
| **EASM 리소스** | 내 조직의 외부 공격면 데이터를 조회하려면 Azure에 **Defender EASM 리소스**가 있어야 합니다. |
| **EASM 데이터 접근** | 로그인한 사용자가 해당 EASM 리소스를 **읽을 수 있는 Azure RBAC 권한**을 보유해야 합니다. |

참고: [EASM–Security Copilot 통합 개요](https://learn.microsoft.com/azure/external-attack-surface-management/easm-copilot) · [EASM Azure 리소스 만들기](https://learn.microsoft.com/azure/external-attack-surface-management/deploying-the-defender-easm-azure-resource)

---

## 1단계 — 플러그인 연동 (연결부터 리소스 설정까지)

**플러그인 켜기 → 내 EASM 리소스 값 입력 → 저장.** 이 3개 동작이 연동의 전부입니다.

### 1-1. 플러그인 켜기

1. [Security Copilot](https://securitycopilot.microsoft.com/)에 접속해 로그인 상태인지 확인합니다.
2. 프롬프트 입력창 하단의 **출처(Sources)** 버튼을 눌러 **원본 관리** 창을 엽니다.
3. **Microsoft** 그룹에서 **Microsoft Defender External Attack Surface Management**를 찾아(검색창에 `Attack Surface` 입력하면 바로 나옵니다) 토글을 **On**으로 켭니다.

![원본 관리 창에서 Microsoft Defender External Attack Surface Management 플러그인을 On으로 켠 화면](./images/13-easm-plugin-on.png)
*원본 관리 → Microsoft 그룹의 EASM 플러그인을 켭니다. 오른쪽 톱니바퀴로 리소스를 설정합니다.*

> [!TIP]
> Microsoft 플러그인은 **온-비할프(on-behalf-of)** 인증으로 동작합니다 — 별도 API 키·시크릿을 넣지 않아도, 로그인한 사용자의 권한으로 EASM 데이터에 접근합니다. (커스텀 플러그인처럼 앱 등록·시크릿을 만들 필요가 없습니다.)

### 1-2. 내 EASM 리소스 연결 (톱니바퀴 → 설정)

내 조직의 공격면을 조회하려면 플러그인이 **어느 EASM 리소스를 볼지** 알려줘야 합니다. 플러그인 항목 오른쪽의 **톱니바퀴(설정) 아이콘**을 눌러 아래 3개 값을 입력합니다. 값은 모두 **Azure Portal → 해당 Defender EASM 리소스 → 개요(Overview) → 필수(Essentials)**에서 그대로 복사하면 됩니다.

![Azure Portal의 Defender EASM 리소스 개요 화면 — 리소스 그룹, 위치, 구독 ID 등 필수 정보](./images/13-easm-azure-essentials.png)
*Azure Portal → EASM 리소스 → 개요 → 필수. 리소스 이름(상단)·리소스 그룹·구독 ID를 여기서 복사합니다.*

| 설정 필드 | 어디서 얻나 (Essentials) | 이 예시의 값 |
| --- | --- | --- |
| **Resource name** | EASM 리소스(워크스페이스) 이름 — 화면 상단 제목 | `EASMdemo` |
| **Subscription ID** | 필수 섹션의 **구독 ID** | `58cbeffb-de96-4722-afd3-…` |
| **Resource group name** | 필수 섹션의 **리소스 그룹** 이름 | `rg-seccop` |

![EASM 플러그인 설정 창 — Resource name, Subscription ID, Resource group name 3개 필드에 값 입력](./images/13-easm-resource-settings.png)
*플러그인 설정 — 3개 필드를 채우고 저장하면 연결이 완료됩니다.*

입력 후 **저장**하면 연결이 완료됩니다. 이제 "내 공격면" 질문에 이 리소스 데이터로 답합니다.

> [!WARNING]
> **연동은 됐는데 다른 플러그인이 물려요** — Copilot은 프롬프트를 보고 플러그인을 **스스로 선택**합니다. EASM가 아닌 다른 플러그인이 응답하면, 프롬프트에 **"Defender EASM"**을 명시하세요(아래 2단계 프롬프트들이 모두 이 패턴을 따릅니다). 응답 하단 **프로세스 로그**를 열면 실제로 어떤 플러그인이 호출됐는지 확인할 수 있습니다.

---

## 2단계 — 실행: 기능별 프롬프트 8종

플러그인은 아래 **8가지 기능**을 제공합니다. 각 기능을 자연어로 호출하는 **한국어/원문 프롬프트**를 그대로 복사해 쓰세요. 모든 프롬프트는 **연결한 내 조직의 EASM 리소스**를 기준으로 조회합니다.

![Defender EASM 기준으로 외부 공격면 요약을 요청한 프롬프트 실행 결과 — 총 자산 수와 대표 자산 목록 테이블](./images/13-easm-prompt-result.png)
*프롬프트 실행 예시 — EASM 플러그인이 연결된 리소스에서 자산을 집계해 총 자산 수·대표 자산(유형·최초 발견일)을 표로 보여줍니다. 상단 "N개 단계 완료"를 펼치면 어떤 플러그인·스킬이 호출됐는지 확인할 수 있습니다.*

> [!TIP]
> 프롬프트에 **"Defender EASM"**과 자산 이름·CVE ID 같은 **구체적 값**을 넣을수록 정확해집니다. 첫 질문 이후 후속 프롬프트는 같은 리소스 기준으로 이어집니다.

### 2-1. 공격면 요약 (Get attack surface summary)

외부 노출 자산 전반을 자연어로 요약합니다. **여기서 시작하세요.**

> 🇰🇷 "Defender EASM 기준으로 내 외부 공격면을 요약해 줘."
>
> 🇺🇸 *`Get my attack surface according to Defender EASM.`*

### 2-2. 공격면 인사이트 — 우선순위별 (Get attack surface insights)

우선순위(**high/medium/low**)를 지정해 위험 인사이트를 받습니다. 지정하지 않으면 기본값은 **high**입니다.

> 🇰🇷 "Defender EASM에서 내 공격면의 높은 우선순위 인사이트를 알려 줘."
>
> 🇺🇸 *`Get my high-priority attack surface insights from Defender EASM.`*

> 🇰🇷 "내 외부 공격면에 심각한 취약점이 있나요? (Defender EASM)"
>
> 🇺🇸 *`Do I have high-priority vulnerabilities in my external attack surface according to Defender EASM?`*

### 2-3. 특정 CVE의 영향 자산 (Get assets affected by a CVE)

특정 취약점(CVE ID)이 **우리 자산 중 무엇에 영향을 주는지** 찾습니다. 신규 CVE 공시 시 **노출 여부를 즉시 확인**하는 용도입니다.

> 🇰🇷 "Defender EASM에서 CVE-2023-0012의 영향을 받는 내 자산을 알려 줘."
>
> 🇺🇸 *`Which of my assets are affected by CVE-2023-0012 according to Defender EASM?`*

### 2-4. CVSS 점수별 영향 자산 (Get assets affected by a CVSS)

CVSS 심각도(**critical/high/medium/low**)로 영향 자산을 집계합니다. **"위험한 것부터"** 정리할 때 씁니다.

> 🇰🇷 "Defender EASM에서 내 자산 중 CVSS가 critical인 자산은 몇 개이고 어떤 것들인가요?"
>
> 🇺🇸 *`How many of my assets have critical CVSS scores, and which ones? (Defender EASM)`*

### 2-5. 만료된 도메인 (Get expired domains)

만료됐거나 곧 만료될 도메인은 **도메인 탈취·피싱**의 통로가 됩니다.

> 🇰🇷 "Defender EASM 기준으로 내 공격면에서 만료된 도메인은 몇 개인가요?"
>
> 🇺🇸 *`How many domains are expired in my attack surface according to Defender EASM?`*

### 2-6. 만료된 SSL 인증서 (Get expired certificates)

만료 인증서는 **신뢰 경고·중단·중간자 공격** 위험을 만듭니다.

> 🇰🇷 "Defender EASM에서 내 만료된 SSL 인증서를 알려 줘."
>
> 🇺🇸 *`What are my expired SSL certificates according to Defender EASM?`*

### 2-7. SHA-1 인증서 (Get SHA1 certificates)

취약한 **SHA-1 서명** 인증서를 식별해 최신 알고리즘으로 교체 우선순위를 잡습니다.

> 🇰🇷 "Defender EASM 기준으로 내 자산 중 SSL SHA1을 쓰는 인증서는 몇 개인가요?"
>
> 🇺🇸 *`How many of my assets are using SSL SHA1 according to Defender EASM?`*

### 2-8. 자연어 → EASM 쿼리 (Translate natural language to a Defender EASM query)

**가장 강력한 기능.** 임의의 자연어 질문을 EASM 쿼리로 번역해 조건에 맞는 자산을 반환합니다. 포트·기술 스택·등록자 이메일 등 **인벤토리 필터**를 문법 없이 검색합니다.

> 🇰🇷 "내 공격면에서 80번 포트가 열려 있는 호스트를 찾아 줘. (Defender EASM)"
>
> 🇺🇸 *`Get the hosts with port 80 open in my attack surface. (Defender EASM)`*

> 🇰🇷 "jQuery 3.1.0 버전을 사용하는 자산을 모두 찾아 줘. (Defender EASM)"
>
> 🇺🇸 *`What assets are using jQuery version 3.1.0 according to Defender EASM?`*

> 🇰🇷 "등록자 이메일이 name@example.com 인 내 자산을 찾아 줘."
>
> 🇺🇸 *`Which of my assets have a registrant email of name@example.com according to Defender EASM?`*

### 기능 ↔ 프롬프트 한눈에 보기

| # | 기능(capability) | 필수 입력 | 대표 프롬프트(한국어) |
| :--: | --- | --- | --- |
| 1 | 공격면 요약 | — | Defender EASM 기준으로 내 외부 공격면을 요약해 줘. |
| 2 | 공격면 인사이트 | `PriorityLevel`(기본 high) | Defender EASM에서 내 공격면의 높은 우선순위 인사이트를 알려 줘. |
| 3 | CVE 영향 자산 | `CveId` | Defender EASM에서 CVE-2023-0012의 영향을 받는 내 자산을 알려 줘. |
| 4 | CVSS 영향 자산 | `CvssPriority`(critical/high/medium/low) | Defender EASM에서 내 자산 중 CVSS가 critical인 자산을 알려 줘. |
| 5 | 만료 도메인 | — | Defender EASM 기준으로 내 공격면에서 만료된 도메인은 몇 개인가요? |
| 6 | 만료 SSL 인증서 | — | Defender EASM에서 내 만료된 SSL 인증서를 알려 줘. |
| 7 | SHA-1 인증서 | — | Defender EASM 기준으로 내 자산 중 SSL SHA1을 쓰는 인증서는 몇 개인가요? |
| 8 | 자연어→쿼리 | 자연어 질문 | 내 공격면에서 80번 포트가 열려 있는 호스트를 찾아 줘. (Defender EASM) |

---

## 3단계 — 리포팅 자동화 (매일 아침 공격면 요약 메일)

2단계까지는 사용자가 직접 프롬프트를 입력해 답을 받았습니다. 3단계에서는 이 과정을 **Azure Logic Apps로 무인 자동화**합니다 — 매일 정해진 시각에 Security Copilot이 EASM 데이터를 조회하고, 그 결과를 **보기 용이한 HTML 리포트**로 변환해 메일로 발송합니다. SOC 담당자가 업무 시작 전에 "당일 외부 공격면 현황"을 자동으로 수신하는 구조입니다.

### 전체 흐름 — 왜 4개 액션인가

![Logic Apps 디자이너 — Recurrence, Submit a Security Copilot prompt, Format report HTML, Send email (V2) 4개 액션이 순서대로 연결된 워크플로](./images/13-la3-designer-flow.png)
*완성된 워크플로.*

| 순서 | 액션 | 커넥터 | 역할 |
| :--: | --- | --- | --- |
| ① | **Recurrence** | Schedule | 매일 09:00(KST) 트리거 |
| ② | **Submit a Security Copilot prompt** | Microsoft Security Copilot | EASM 데이터 **조회**(숫자·자산 목록) |
| ③ | **Format report HTML** | Microsoft Security Copilot | ②의 결과를 **보기 용이한 HTML 리포트로 변환** |
| ④ | **Send email (V2)** | Office 365 Outlook | ③의 HTML을 메일 본문으로 **발송** |

---

### 3-1. Recurrence — 발송 시각 설정

**Logic Apps 리소스를 생성**하고, 첫 트리거로 **Recurrence**(일정)를 추가합니다.

![Recurrence 트리거 설정 — Interval 1, Frequency 일, Time zone (UTC+09:00) 서울, At these hours 9](./images/13-la3-recurrence.png)
*매일 오전 9시 발송 설정.*

| 필드 | 값 | 커스터마이즈 |
| --- | --- | --- |
| **Interval / Frequency** | `1` / `일(Day)` | 주간 리포트는 `1`/`주`, 시간별은 `1`/`시간` |
| **Time zone** | `(UTC+09:00) 서울` | 반드시 지정 — 미지정 시 UTC 기준이라 9시간 밀립니다 |
| **At these hours / minutes** | `9` / `0` | 오후 6시 마감 리포트는 `18`/`0` |

---

### 3-2. 조회 액션 — 수신할 정보를 결정하는 단계

**Submit a Security Copilot prompt** 액션을 추가하고 커넥션에 로그인한 뒤, **Prompt Content**에 **조회 전용 프롬프트**를 입력합니다.

![Submit a Security Copilot prompt 액션 — Prompt Content에 8개 항목을 조회하는 한국어 프롬프트가 입력된 화면](./images/13-la3-query-prompt.png)
*조회 프롬프트. 여기서 요청한 항목이 곧 리포트에 담기는 데이터가 됩니다.*

이 예시에서 사용한 프롬프트:

> 🇰🇷 "Microsoft Defender EASM에서 confirmed 상태의 자산 인벤토리를 조회해 줘. 다음을 한국어로 정리해 줘: 1) 전체 자산 수 2) 최근 30일 신규 발견 자산 수 3) CVE 관련 자산 수 4) 로그인 페이지 포함 자산 수 5) 웹 서버 기본 페이지 노출 자산 수 6) 30일 내 SSL 인증서 만료 예정 수 7) 신규 발견 자산 상위 5개 (자산명, 유형, 구성정보/CVE) 8) CVE 관련 자산 상위 5개 (자산명, 서비스, CVE). 실제 EASM 데이터를 조회해서 수치를 채워줘."

> [!TIP]
> **원하는 정보로 바꾸는 방법 — 이 프롬프트가 리포트의 설계도입니다.**
> 리포트에 포함할 항목을 **번호 목록으로 나열**하면 그대로 반영됩니다. 아래와 같이 자유롭게 커스터마이즈할 수 있습니다.
> - **지표 변경** → 목록 항목을 교체: 예) `열려 있는 포트별 자산 수`, `만료된 도메인 수`, `SHA-1 인증서 수`, `특정 CVE(예: CVE-2024-3400)의 영향 자산`.
> - **순위 개수 변경** → `상위 5개` → `상위 10개`.
> - **범위 조정** → `confirmed 상태` → `모든 상태`, 또는 `특정 라벨이 붙은 자산만`.
>
> **유의 사항:** (1) 프롬프트에 **"Defender EASM"**과 **"실제 데이터를 조회해서 채워줘"**를 명시해 EASM 스킬로 라우팅되도록 하고, (2) 이 액션에는 **HTML·서식 지시를 포함하지 않습니다.** 서식은 다음 액션이 담당합니다.

---

### 3-3. 서식 변환 액션 — 조회 결과를 리포트로 변환

두 번째 **Submit a Security Copilot prompt** 액션을 추가하고 이름을 **Format report HTML**로 변경합니다. Prompt Content에 **조회 결과를 HTML 템플릿에 채우는** 변환 프롬프트를 입력하되, `<조회결과>` 자리에 **앞 액션의 출력 토큰(`EvaluationResultContent`)**을 삽입합니다.

![Format report HTML 액션 — 변환 규칙 6개와 조회결과 토큰(EvaluationResultContent), HTML 템플릿이 들어간 Prompt Content](./images/13-la3-format-prompt.png)
*서식 변환 프롬프트. 빨간 박스의 `EvaluationResultContent`가 앞 조회 액션의 결과를 전달받는 토큰입니다.*

이 액션에 사용한 **전체 변환 프롬프트 원문**(지시문 + 다크 테마 HTML 템플릿 전체)은 아래에서 내려받아 **Prompt Content에 그대로 붙여넣을 수 있습니다.** `<조회결과>` 내부의 토큰만 앞 조회 액션의 `EvaluationResultContent`로 지정하면 됩니다.

<a href="./assets/13-format-prompt.txt" download="13-format-prompt.txt">📄 전체 변환 프롬프트 원문 내려받기 (.txt)</a>

> [!TIP]
> **디자인을 바꾸는 방법 — HTML 템플릿만 수정하면 됩니다.**
> `<HTML템플릿>`에 넣는 HTML을 교체하면 리포트 외관이 전체적으로 바뀝니다. 이메일 클라이언트(특히 Outlook)는 `<style>` 블록·`class`·`flex` 등을 무시하므로, **모든 스타일을 각 태그에 `style="…"` 인라인으로** 지정하고 **표는 `<table>` + `width` %**로 잡는 것이 안정적입니다. 색상·항목 순서·열 구성만 변경하고 규칙 6개는 유지합니다.

---

### 3-4. 메일 발송 — 결과 연결

마지막으로 **Office 365 Outlook · 메일 보내기(V2)** 액션을 추가합니다.

![Send email (V2) 액션 상세 — 받는 사람, 제목([Microsoft] 공격표면 관제 레포트), 본문에 EvaluationResultContent 토큰이 지정된 화면](./images/13-la3-email-action.png)
*메일 보내기(V2) 액션. 본문에 앞 서식 액션의 출력 토큰(`EvaluationResultContent`)을 지정합니다.*

| 필드 | 값 |
| --- | --- |
| **받는 사람(To)** | 리포트 수신자 메일 주소 |
| **제목(Subject)** | 예) `[Microsoft] 공격표면 관제 레포트 (자동)` |
| **본문(Body)** | **Format report HTML** 액션의 출력 토큰 `EvaluationResultContent` |

> [!IMPORTANT]
> 본문에는 반드시 **③ Format report HTML의 출력**을 지정합니다. ②(조회)의 출력을 직접 연결하면 서식이 적용되지 않은 마크다운이 그대로 발송됩니다. 또한 메일 본문은 **HTML로 해석**되도록 설정합니다.

---

### 완성된 리포트

저장 후 **Run Trigger**로 즉시 실행하거나 다음 09:00 트리거를 기다리면, 조회(②)로 채운 실데이터에 서식(③)으로 입힌 디자인이 함께 적용된 리포트 메일이 수신됩니다.

아래는 값이 채워지기 전의 **리포트 템플릿 구조**입니다 — 실행 시 `…` 자리에 조회한 실제 자산 수와 목록이 채워집니다.

![EASM 리포트 HTML 템플릿 — 다크 테마 헤더, 핵심 지표 요약 표, 신규 발견·CVE·로그인 페이지·기본 페이지 노출·SSL 만료 표가 값 자리(…)를 비워 둔 상태로 렌더링된 화면](./images/13-la3-report-template.png)
*리포트 템플릿 구조. 각 표의 `…` 자리에 조회 결과가 채워집니다.*

---

## 참고 링크

- [Microsoft Security Copilot in Defender EASM (공식)](https://learn.microsoft.com/azure/external-attack-surface-management/easm-copilot)
- [Defender EASM Azure 리소스 만들기](https://learn.microsoft.com/azure/external-attack-surface-management/deploying-the-defender-easm-azure-resource)
- [인벤토리 자산 이해](https://learn.microsoft.com/azure/external-attack-surface-management/understanding-inventory-assets)
- [인벤토리 필터 개요](https://learn.microsoft.com/azure/external-attack-surface-management/inventory-filters)
- [Azure Copilot로 공격면 질의(임베디드)](https://learn.microsoft.com/azure/copilot/query-attack-surface)
- [플러그인 관리](https://learn.microsoft.com/security-copilot/manage-plugins) · [프롬프트 팁](https://learn.microsoft.com/security-copilot/prompting-tips)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [12 · 핸즈온 랩 2) CA 정책 최적화](./12-ca-agent-lab.md) | [99 · 부록](./99-troubleshooting.md) |

[🏠 전체 목차로 돌아가기](./README.md)
