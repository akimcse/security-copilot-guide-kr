[🏠 전체 목차](./README.md)　·　**Part 4 · 실습과 참조**　·　페이지 11 / 12

# 10 · 핸즈온 랩 (6단계 실습)

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 첫 프롬프트부터 에이전트까지 6단계 직접 실습
> - 각 단계에서 관찰할 화면과 포인트
> - 실제 SCU 소비를 확인하는 법
>
> ⏱️ 예상 소요 **20분**　·　🎯 대상: 실습을 원하는 모든 독자

이 랩은 **공식 문서에 기반한 초보자용 단계별 실습**입니다. 앞선 Step에서 다룬 개념(첫 프롬프트 → 프롬프트북 → 플러그인 → 임베디드 경험 → 커스텀 프롬프트북 → 에이전트)을 실제 포털에서 순서대로 경험합니다. 각 단계에는 **화면에서 관찰할 점**과 **공식 how-to URL**을 함께 표기했습니다.

> [!WARNING]
> 이 랩의 모든 프롬프트·프롬프트북·플러그인·에이전트 실행은 **실제 SCU(Security Compute Unit)를 소비**합니다. 정식 출시(GA) 및 공개 프리뷰(Public Preview) 기능은 모두 과금 대상입니다. 실습 전 사용 가능한 용량과 오버리지 설정을 확인하세요(→ [Step 8: 사용량 모니터링](./08-usage-monitoring.md)).

---

## Step 1 — Standalone 포털에서 첫 프롬프트 실행

**무엇을 하나요:** https://securitycopilot.microsoft.com 에 로그인합니다. **에이전트 우선(agents-first) 경험**이 표시되면 **All history → New session**으로 이동해 채팅 세션을 시작합니다. 그런 다음 첫 프롬프트를 입력합니다.

**예시 시작 프롬프트(공식 문서 예시):**

> *"Can you give me information about Pearl Sleet activity, including a list of known indicators of compromise and tools, tactics, and procedures (TTPs)?"*
> (Pearl Sleet 활동에 대한 정보를, 알려진 침해 지표(IoC)와 도구·전술·기법·절차(TTP) 목록을 포함해 알려줄 수 있나요?)

**화면에서 관찰할 점:**
- **프로세스 로그(process log)** — 응답이 어떤 단계를 거쳐 생성되었는지
- **어떤 플러그인이 사용되었는지**
- 응답 서식(response format)
- 각 응답 하단의 **피드백 아이콘(feedback icons)**

![Step 1 first prompt in the standalone portal](./images/10-lab-step1-first-prompt.png)
*그림: Standalone 포털에서 첫 프롬프트를 실행하고 프로세스 로그를 확인하는 화면*

참고: [프롬프트 작성](https://learn.microsoft.com/en-us/security-copilot/prompting-security-copilot) · [프롬프트 팁](https://learn.microsoft.com/en-us/security-copilot/prompting-tips)

---

## Step 2 — 기본 제공 프롬프트북 실행

**무엇을 하나요:** 활성 세션에서 **✨ Prompts** 아이콘을 클릭 → **Promptbooks**로 필터 → **"Vulnerability impact assessment"**(또는 다른 기본 제공 프롬프트북)를 선택합니다.

**입력:** CVE 번호를 입력합니다(예: 최근 공개된 CVE).

**화면에서 관찰할 점:**
- 프롬프트가 **순차적으로 실행(sequential execution)**되는 과정
- 각 응답이 이전 응답 위에 어떻게 쌓이는지
- 마지막 프롬프트가 생성하는 **최종 요약 보고서(executive summary)**
- 실행 후 **대시보드의 SCU 사용량**

![Step 2 running a built-in promptbook](./images/10-lab-step2-builtin-promptbook.png)
*그림: 기본 제공 프롬프트북 "Vulnerability impact assessment"를 실행하고 순차 결과를 확인하는 화면*

참고: [프롬프트북 사용](https://learn.microsoft.com/en-us/security-copilot/using-promptbooks)

---

## Step 3 — 플러그인 활성화 및 사용

**무엇을 하나요:** 프롬프트 바에서 **Sources** 아이콘 선택 → **Manage plugins**로 이동합니다. 이미 활성화된 Microsoft 플러그인을 검토하고, **Microsoft Threat Intelligence**가 활성화되어 있는지 확인합니다. 그런 다음 다음 프롬프트를 실행합니다.

> *"Provide a threat actor profile for Midnight Blizzard."*
> (Midnight Blizzard에 대한 위협 행위자 프로파일을 제공해 주세요.)

**화면에서 관찰할 점:**
- **프로세스 로그**에서 **어떤 플러그인이 사용되었는지** 확인

![Step 3 enabling and using a plugin](./images/10-lab-step3-plugin.png)
*그림: Manage plugins에서 Microsoft Threat Intelligence를 확인하고 위협 행위자 프로파일을 실행하는 화면*

참고: [플러그인 관리](https://learn.microsoft.com/en-us/security-copilot/manage-plugins) · [플러그인 개요](https://learn.microsoft.com/en-us/security-copilot/plugin-overview)

---

## Step 4 — Defender XDR 임베디드 경험: 인시던트 요약

**무엇을 하나요:** Microsoft Defender 포털(https://security.microsoft.com)에서 아무 **인시던트(incident)**나 엽니다. **Copilot 사이드카(sidecar) 패널**이 자동으로 나타나며 **인시던트 요약(Incident Summary)**이 생성됩니다.

**화면에서 관찰할 점:**
- 공격 시점 및 대상 엔터티(time/entity of attack)
- **공격 타임라인(attack timeline)**
- 관련 자산(assets involved)
- **IoC(침해 지표)**
- 위협 행위자 이름(threat actor names)
- **See prompts** — 제안된 후속 프롬프트 확인
- **Open in Security Copilot** — Standalone 포털에서 조사를 이어가기
- (선택) **유도된 대응(Guided Response)** 탭 — Triage/Containment/Investigation/Remediation 액션 카드 관찰

![Step 4 embedded incident summary in Defender XDR](./images/10-lab-step4-embedded-incident.png)
*그림: Defender XDR에서 Copilot 사이드카 패널이 인시던트를 자동 요약하는 화면*

참고: [인시던트 요약](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-incident-summary) · [유도된 대응](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-guided-response)

---

## Step 5 — 커스텀 프롬프트북 생성

**무엇을 하나요:** 여러 단계로 진행한 조사 세션이 끝난 뒤, 재사용하고 싶은 **3~5개 프롬프트 옆의 체크박스**를 선택합니다. **Create promptbook**를 클릭하고 다음을 입력합니다.

- **이름(Name):** 예) "My Incident Investigation Flow"
- **태그(Tags):** 예) "SOC", "incident"
- **설명(Description):** 프롬프트북의 목적
- 특정 **인시던트 ID를 `<IncidentID>` 매개변수 구문으로 치환**
- **가시성(Visibility):** **Just me**(테스트용) 또는 **Anyone in my organization**(공유)

그런 다음 **프롬프트북 라이브러리**로 이동 → 새로 만든 프롬프트북을 **실행(Run)** → 매개변수 값을 입력합니다.

![Step 5 creating a custom promptbook](./images/10-lab-step5-custom-promptbook.png)
*그림: 세션의 프롬프트를 선택해 매개변수화된 커스텀 프롬프트북을 생성하는 화면*

참고: [프롬프트북 빌드](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)

---

## Step 6 (선택/고급) — 에이전트 검색 및 설정

**무엇을 하나요:** 홈 메뉴 → **Agents** → 에이전트 라이브러리를 탐색합니다. **Threat Intelligence Briefing Agent**를 선택 → **Set up** → **ID 할당**(새 에이전트 ID 생성 또는 기존 계정 사용) → **트리거(스케줄) 구성** → **Run**을 실행합니다.

**화면에서 관찰할 점:**
- 에이전트 출력 — **구조화된 보고서(structured report)** 형태로 전달되는 위협 인텔리전스 브리핑

![Step 6 discover and set up an agent](./images/10-lab-step6-agent-setup.png)
*그림: Threat Intelligence Briefing Agent를 설정하고 구조화된 브리핑 결과를 확인하는 화면*

참고: [에이전트 검색](https://learn.microsoft.com/en-us/security-copilot/discover-agents) · [에이전트 설정·관리](https://learn.microsoft.com/en-us/security-copilot/agents-manage)

---

## 랩 마무리 체크리스트

- [ ] Step 1 — Standalone 포털에서 첫 프롬프트를 실행하고 프로세스 로그·플러그인·피드백 아이콘을 관찰함
- [ ] Step 2 — 기본 제공 프롬프트북("Vulnerability impact assessment")을 CVE로 실행하고 순차 실행·최종 요약·SCU 사용량을 확인함
- [ ] Step 3 — Microsoft Threat Intelligence 플러그인을 확인하고 위협 행위자 프로파일 프롬프트를 실행함
- [ ] Step 4 — Defender XDR에서 인시던트 요약(사이드카)을 확인하고 See prompts / Open in Security Copilot를 사용함
- [ ] Step 5 — 세션 프롬프트를 매개변수화한 커스텀 프롬프트북을 생성하고 라이브러리에서 실행함
- [ ] Step 6 (선택) — Threat Intelligence Briefing Agent를 설정하고 구조화된 브리핑을 확인함

---

## 참고 링크

- [프롬프트 작성(Prompting in Security Copilot)](https://learn.microsoft.com/en-us/security-copilot/prompting-security-copilot)
- [프롬프트 팁(Prompting best practices)](https://learn.microsoft.com/en-us/security-copilot/prompting-tips)
- [기본 제공 프롬프트북 사용(Using promptbooks)](https://learn.microsoft.com/en-us/security-copilot/using-promptbooks)
- [플러그인 관리(Manage plugins)](https://learn.microsoft.com/en-us/security-copilot/manage-plugins)
- [플러그인 개요(Plugin overview)](https://learn.microsoft.com/en-us/security-copilot/plugin-overview)
- [Defender XDR 인시던트 요약](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-incident-summary)
- [Defender XDR 유도된 대응](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-guided-response)
- [커스텀 프롬프트북 빌드(Build promptbooks)](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)
- [에이전트 검색(Discover agents)](https://learn.microsoft.com/en-us/security-copilot/discover-agents)
- [에이전트 설정·관리(Agents manage)](https://learn.microsoft.com/en-us/security-copilot/agents-manage)

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [09 · 책임 있는 AI](./09-responsible-ai.md) | [99 · 부록](./99-troubleshooting.md) |

[🏠 전체 목차로 돌아가기](./README.md)
