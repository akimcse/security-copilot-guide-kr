[🏠 전체 목차](./README.md)　·　**Part 4 · 실습·활용·참조**　·　페이지 11 / 13

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

**무엇을 하나요:** <br>
- https://securitycopilot.microsoft.com 에 로그인합니다.
- 채팅 세션을 시작하여 첫 프롬프트를 입력합니다.

**예시 시작 프롬프트:**
> *"Can you give me information about Pearl Sleet activity, including a list of known indicators of compromise and tools, tactics, and procedures (TTPs)?"* <br>
> (Pearl Sleet 활동에 대한 정보를, 알려진 침해 지표(IoC)와 도구·전술·기법·절차(TTP) 목록을 포함해 알려주세요.)

<img width="2292" height="1162" alt="image" src="https://github.com/user-attachments/assets/a04ed106-c9e1-48c6-a8cf-40f8eaa88247" />

**화면에서 관찰할 점:**
- 프로세스 로그(process log) — 응답이 어떤 단계를 거쳐 생성되었는지
- 응답 서식(response format)
- 각 응답 하단의 피드백 아이콘(feedback icons)

참고: [프롬프트 작성](https://learn.microsoft.com/en-us/security-copilot/prompting-security-copilot) · [프롬프트 팁](https://learn.microsoft.com/en-us/security-copilot/prompting-tips)

---

## Step 2 — 기본 제공 프롬프트북 실행

**무엇을 하나요:** <br>
- 새 세션을 열어 **✨ Prompts** 아이콘 선택 → **Promptbooks** 중 **"Vulnerability impact assessment"**(또는 다른 기본 제공 프롬프트북) 선택 → CVE 번호를 입력합니다(예: 최근 공개된 CVE).

<img width="2288" height="1235" alt="image" src="https://github.com/user-attachments/assets/5584a1e1-c154-4af4-a36b-72408cf546d0" />
<img width="1845" height="571" alt="image" src="https://github.com/user-attachments/assets/2111baa8-f74f-48be-9549-382e43f4cce0" />

**화면에서 관찰할 점:**
- 프롬프트가 순차적으로 실행(sequential execution)되는 과정
- 각 응답이 이전 응답 위에 어떻게 쌓이는지
- 마지막 프롬프트가 생성하는 최종 요약 보고서(executive summary)
- 실행 후 대시보드의 SCU 사용량

참고: [프롬프트북 사용](https://learn.microsoft.com/en-us/security-copilot/using-promptbooks)

---

## Step 3 — 플러그인 활성화 및 사용

**무엇을 하나요:** <br>
- 프롬프트 바에서 **Sources** 아이콘 선택 → **Manage plugins**로 이동합니다.
- 이미 활성화된 Microsoft 플러그인을 검토하고, **Microsoft Threat Intelligence**가 활성화되어 있는지 확인한 뒤 프롬프트를 실행합니다.

**예시 프롬프트:**
> *"Provide a threat actor profile for Midnight Blizzard."* <br>
> (Midnight Blizzard에 대한 위협 행위자 프로파일을 제공해 주세요.)

<img width="2289" height="1151" alt="image" src="https://github.com/user-attachments/assets/c5859dd1-7ce3-4753-9fc9-3ac6fe1e0eca" />

**화면에서 관찰할 점:**
- 프로세스 로그에서 Microsoft Threat Intelligence 플러그인이 사용되었는지 확인

참고: [플러그인 관리](https://learn.microsoft.com/en-us/security-copilot/manage-plugins) · [플러그인 개요](https://learn.microsoft.com/en-us/security-copilot/plugin-overview)

---

## Step 4 — Defender XDR 임베디드 경험: 인시던트 요약

**무엇을 하나요:** <br>
- Microsoft Defender 포털(https://security.microsoft.com)에서 아무 인시던트(incident)나 엽니다.
- **Copilot** 사이드카(sidecar) 패널이 자동으로 나타나며 인시던트 요약(Incident Summary)이 생성됩니다.

<img width="2303" height="1147" alt="image" src="https://github.com/user-attachments/assets/c5fb8c20-b7ac-4319-9d5c-7b973ecb5c58" />

**화면에서 관찰할 점:**
- 공격 시점 및 대상 엔터티(time/entity of attack)
- 공격 타임라인(attack timeline)
- 관련 자산(assets involved)
- IoC(침해 지표)
- 위협 행위자 이름(threat actor names)
- See prompts — 제안된 후속 프롬프트 확인

참고: [인시던트 요약](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-incident-summary) · [유도된 대응](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-guided-response)

---

## Step 5 — 커스텀 프롬프트북 생성

**무엇을 하나요:** <br>
- 여러 단계로 진행한 조사 세션이 끝난 뒤, 재사용하고 싶은 프롬프트 옆의 체크박스를 선택합니다.
- 상단의 **Create promptbook**를 클릭하고 내용을 입력하여 프롬프트북을 생성합니다.

**예시 프롬프트:**
> - 일주일 동안 Data Security Demo Users 그룹 관련 DLP 경보를 요약하고 유출 채널·데이터 유형을 정리해주세요. <br>
> - 같은 그룹의 로그인/디바이스 이상 징후를 Defender·Entra에서 교차 확인해주세요. <br>
> - 우발적 유출 vs 의도적 유출 가능성 평가와 다음 조사 단계를 제시해주세요.

<img width="2278" height="1075" alt="image" src="https://github.com/user-attachments/assets/ca89470d-072d-44ab-8c05-195699ea0bc8" />

- **이름(Name):** 예) "데이터 유출 조사 프롬프트북"
- **태그(Tags):** 예) "Data", "DLP", "Sign-in", "Device"
- **설명(Description):** 프롬프트북의 목적
- **매개변수**: 특정 조사 그룹을 `<group_name>` 구문으로 치환하는 등 매번 달라지는 입 값을 매개변수로 지정
- **가시성(Visibility):** Just me(테스트용) 또는 Anyone in my organization(공유 및 배포용)

그런 다음 **프롬프트북 라이브러리**로 이동 → 새로 만든 프롬프트북을 실행(Run) → 매개변수 값을 입력하여 재사용할 수 있습니다.

참고: [프롬프트북 빌드](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)

---

## Step 6 (선택/고급) — 에이전트 검색 및 설정

**무엇을 하나요:** <br>
- 홈 메뉴 → **Agents** → 에이전트 라이브러리를 탐색합니다.
- **Conditional Access Optimization Agent**를 선택 → Start agent로 첫 실행 → 몇 분간 테넌트 스캔 → Overview 탭의 Recent suggestions에 권장 정책이 표시되면 확인합니다.

<img width="2127" height="1111" alt="image" src="https://github.com/user-attachments/assets/a702011e-48c6-43bd-83be-9133c3fa9268" />

**화면에서 관찰할 점:**
- 에이전트가 조직의 **조건부 액세스(CA) 정책을 Microsoft 모범 사례·제로 트러스트 원칙과 비교**해 보호되지 않은 사용자·앱, 정책 격차를 식별하고 제안한 항목들
- 각 권장 사항에 대해 **원클릭으로 새 정책을 생성하거나 기존 정책을 업데이트**하는 흐름(적용 전 관리자 검토 필요)

> [!NOTE]
> 이 에이전트의 설정에는 **Security Administrator**, 실행 결과 적용에는 **Conditional Access Administrator** 역할이 필요합니다.

참고: [Conditional Access Optimization Agent](https://learn.microsoft.com/entra/identity/conditional-access/agent-optimization) · [에이전트 설정·관리](https://learn.microsoft.com/security-copilot/agents-manage)

---

## 랩 마무리 체크리스트

- [ ] Step 1 — Standalone 포털에서 첫 프롬프트를 실행하고 프로세스 로그·플러그인·피드백 아이콘을 관찰함
- [ ] Step 2 — 기본 제공 프롬프트북("Vulnerability impact assessment")을 CVE로 실행하고 순차 실행·최종 요약·SCU 사용량을 확인함
- [ ] Step 3 — Microsoft Threat Intelligence 플러그인을 확인하고 위협 행위자 프로파일 프롬프트를 실행함
- [ ] Step 4 — Defender XDR에서 인시던트 요약(사이드카)을 확인하고 See prompts를 사용함
- [ ] Step 5 — 세션 프롬프트를 매개변수화한 커스텀 프롬프트북을 생성하고 라이브러리에서 실행함
- [ ] Step 6 (선택) — Conditional Access Optimization Agent를 설정하고 CA 정책 최적화 권장 사항을 확인함

---

## 참고 링크

- [프롬프트 작성(Prompting in Security Copilot)](https://learn.microsoft.com/en-us/security-copilot/prompting-security-copilot)
- [프롬프트 팁(Prompting best practices)](https://learn.microsoft.com/en-us/security-copilot/prompting-tips)
- [기본 제공 프롬프트북 사용(Using promptbooks)](https://learn.microsoft.com/en-us/security-copilot/using-promptbooks)
- [플러그인 관리(Manage plugins)](https://learn.microsoft.com/en-us/security-copilot/manage-plugins)
- [플러그인 개요(Plugin overview)](https://learn.microsoft.com/en-us/security-copilot/plugin-overview)
- [Defender XDR 인시던트 요약](https://learn.microsoft.com/en-us/microsoft-365/security/defender/security-copilot-m365d-incident-summary)
- [커스텀 프롬프트북 빌드(Build promptbooks)](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)
- [에이전트 검색(Discover agents)](https://learn.microsoft.com/en-us/security-copilot/discover-agents)
- [에이전트 설정·관리(Agents manage)](https://learn.microsoft.com/en-us/security-copilot/agents-manage)
- [Conditional Access Optimization Agent](https://learn.microsoft.com/entra/identity/conditional-access/agent-optimization)

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [09 · 책임 있는 AI](./09-responsible-ai.md) | [11 · 실무 활용](./11-use-cases.md) |

[🏠 전체 목차로 돌아가기](./README.md)
