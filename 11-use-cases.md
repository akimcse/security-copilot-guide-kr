[🏠 전체 목차](./README.md)　·　**Part 4 · 실습·활용·참조**　·　페이지 12 / 13

# 11 · 실무 활용 — 페르소나 데모 시나리오

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 실제 보안팀 인력의 페르소나로 따라가는 3가지 심층 데모 시나리오
> - 각 단계의 한글화한 공식 프롬프트(원문 병기)와 관찰 포인트
> - "이렇게도 쓸 수 있구나" — 핀 보드·세션 공유·스크립트 분석·교차 제품 조사·에이전트 자동화 등 **덜 알려진 고급 활용법**
>
> ⏱️ 예상 소요 **30분+**　·　🎯 대상: SOC 분석가 · 위협 헌터 · ID/데이터 보호 담당 · IT/보안 관리자 · CISO

[Step 10 핸즈온 랩](./10-handson-lab.md)에서 기본기를 익혔다면, 이 페이지는 **가상의 보안팀 인력이 실제 업무를 처음부터 끝까지 수행**하는 과정을 따라갑니다. 등장인물과 상황은 학습용 가상이지만, **모든 기능·프롬프트·제약은 Microsoft 공식 문서에 근거**합니다. 각 시나리오 끝에는 일반적으로 잘 모르는 활용법을 정리한 **고급 활용 팁** 박스가 있습니다.

> [!IMPORTANT]
> - 프롬프트의 인시던트 ID·사용자·시간 범위 등은 예시입니다. 실제로는 각 조직의 환경 값으로 바꿔서 적용해주세요.
> - **프리뷰(Preview) 기능은 정식 출시 전이므로 결과를 반드시 검토**하고, 생성된 KQL·스크립트는 검증 없이 프로덕션에 적용하지 마세요.
> - 각 기능의 GA/프리뷰 상태를 본문에 표기했습니다.

---

## 들어가기 전에: 좋은 프롬프트의 4요소

모든 시나리오의 프롬프트는 다음 네 가지를 담습니다. 데모를 따라가며 이 패턴을 적용해보세요.

| 요소 | 설명 |
| --- | --- |
| **목표(Goal)** | 필요한 보안 정보 — 무엇을 원하는지 |
| **맥락(Context)** | 왜 필요한지, 어떻게 쓸지 (예: "관리자 제출용", "48시간 이내") |
| **기대(Expectations)** | 형식·대상 청중 (표, 실행 단계 목록, 임원용 요약) |
| **출처(Source)** | 어떤 플러그인·데이터 소스를 쓸지 |

> [!TIP]
> LLM 특성상 같은 프롬프트도 조금씩 다르게 답합니다. **후속 프롬프트로 다듬는 것이 정상**이며, Security Copilot을 **"You"로 직접 지칭**하면 더 효과적입니다. 응답 아래 **프로세스 로그**를 열면 어떤 플러그인이 쓰였는지 확인할 수 있어, 결과를 신뢰하고 검증하는 데 도움이 됩니다.

참고: [프롬프트 팁(Prompting best practices)](https://learn.microsoft.com/security-copilot/prompting-tips) · [포털 탐색](https://learn.microsoft.com/security-copilot/navigating-security-copilot)

---

## 시나리오 1 — Threat Protection: 다단계 랜섬웨어 인시던트 풀 사이클 대응

> **👤 페르소나 — SOC Tier-1 분석가**
>
> 야간 당직 중 Defender 포털에서 심각도 높은 **다단계 인시던트**를 받았습니다. 피싱으로 시작된 초기 침투가 위험한 M365 Copilot 사용·민감 데이터 반출을 거쳐 **사람이 조작하는 랜섬웨어(human-operated ransomware)**로 번진 정황입니다. KQL이 서툴러도, Security Copilot과 함께 **분류 → 페이로드 분석 → 헌팅 → 대응 → 사후 보고서**까지 한 사이클을 끝내야 합니다.

- **상황**: 인시던트 `34669` — "Multi-stage incident involving Initial access & Exfiltration including Ransomware". **9개 경보가 7개 범주(초기 액세스·실행·발견·횡적 이동·반출·랜섬웨어·의심 활동)에 걸쳐** 묶여 있다. Purview IRM의 위험한 M365 Copilot 사용, DLP의 민감 문서(`Project Obsidian FAQ.docx`) 공유 차단·레이블 기반 Copilot 제한 경보가 뒤섞여 있고, OneDrive for Business·**36명 사용자**가 얽혀 있다.
- **목표**: 다단계 공격 전모 파악 → 악성 페이로드 정체 규명 → 영향 자산 확인 → 유사 피해·반출 헌팅 → 봉쇄·대응 → 사후 보고서 산출.

### 1단계 — 인시던트 자동 요약으로 큰 그림 잡기 (GA)
초기 침투부터 랜섬웨어까지 이어지는 다단계 공격은 경보가 여러 범주에 흩어져 전체 흐름을 잡기 어렵습니다. 인시던트 페이지를 열면 Tasks 창에 **인시던트 요약**이 자동 생성됩니다(최대 100개 경보). 공격 시작 시각·시작 자산·타임라인·관련 자산(OneDrive·36명 사용자)·IoC·위협 프로필(Human-operated ransomware)이 한눈에 들어옵니다.

> 🇰🇷 "Defender 인시던트 34669의 요약을 제공해 줘."
>
> 🇺🇸 *`Provide a summary for Defender incident 34669.`*

> [!TIP]
> 프롬프트에 **Defender**라는 단어를 포함해야 요약·리포트 기능이 결과를 냅니다.

### 2단계 — 초기 침투 경로·악성 엔티티 분석 (GA)
이 인시던트의 시작점은 피싱을 통한 초기 접근입니다. 공격 스토리(attack story)에서 의심 이메일·URL·파일 등 엔티티를 선택하면, Copilot이 **해당 엔티티가 왜 위험한지 자연어로 설명**하고 위협 인텔리전스 평판·**MITRE ATT&CK 기법 매핑**을 함께 보여줍니다. 페이로드나 첨부에 스크립트가 포함된 경우 **스크립트가 하는 일도 자연어로 해설**합니다(코드 표시/숨김 토글 제공).

> 🇰🇷 "Defender 인시던트 34669의 초기 접근에 사용된 악성 이메일·URL·파일을 식별하고, 왜 악성으로 판정됐는지 설명해 줘."
>
> 🇺🇸 *`Identify the malicious emails, URLs, and files used for initial access in Defender incident 34669, and explain why they are considered malicious.`*

### 3단계 — 영향 받은 디바이스 요약 (GA)
랜섬웨어가 번진 엔드포인트(51개 영향 자산 중)의 상태를 빠르게 봅니다. **디바이스 요약**은 Defender 보호 상태(변조 방지 등)·주목할 사용자 활동·**설치된 취약 소프트웨어 목록**·마지막 활성 시각·Intune 기반 정보(주 사용자, 디바이스 그룹)를 포함합니다.

> 🇰🇷 "Defender 인시던트 34669의 디바이스 정보를 요약해 줘."
>
> 🇺🇸 *`Summarize device information in Defender incident 34669.`*

### 4단계 — 유사 피해·반출 헌팅 (자연어 → KQL) (GA / Preview)
같은 피싱에 당했거나 민감 데이터를 반출당한 다른 사용자가 있는지 찾습니다. Advanced Hunting의 **Query Assistant(NL-to-KQL, GA)**로 개별 쿼리를 만들거나, **Threat Hunting Agent(Preview)**로 대화형 헌팅을 합니다.

> 🇰🇷 "이번 주 관리자 계정의 모든 로그인 실패 시도를 보여줘."
>
> 🇺🇸 *`Show me all failed sign-in attempts for admin accounts this week.`*

> 🇰🇷 "오늘 의심스러운 도메인과 통신한 디바이스는 어떤 거야?"
>
> 🇺🇸 *`Which devices communicated with suspicious domains today?`*

**관찰 포인트**: Threat Hunting Agent는 답변과 함께 KQL을 자동 생성·실행하고, **"쿼리 논리 보기"**로 어떻게 짜였는지 설명하며, 관찰값·차트·**후속 질문 제안**·**조치 제안**(클릭 시 엔티티가 미리 채워진 대응 마법사)을 함께 냅니다. 생성된 쿼리는 자연어로 수정을 요청할 수 있습니다.

> [!WARNING]
> Threat Hunting Agent는 **프리뷰**입니다. 헌팅 프롬프트는 ① 모호하지 않게(로그인이 디바이스인지 클라우드인지 명시), ② 한 번에 하나씩, ③ 아는 정보(시간·사용자·디바이스)를 넣어 구체적으로. **조인이 포함된 복잡한 KQL은 반드시 검증**하세요.

### 5단계 — 유도된 대응으로 봉쇄·조치 (GA)
**유도된 대응(Guided Response)**은 **분류(Triage)·격리(Containment)·조사(Investigation)·개선(Remediation)** 네 범주의 조치 카드를 생성합니다. 랜섬웨어 확산을 막기 위해 영향 사용자·디바이스 봉쇄가 필요하고, 사용자에게 연락이 필요하면 **Teams 메시지 초안**을 제안합니다.

> 🇰🇷 "Defender 인시던트 34669에 대한 유도된 대응과 권장 조치를 생성해 줘."
>
> 🇺🇸 *`Generate guided responses and recommendations for Defender incident 34669.`*

### 6단계 — 사후 인시던트 리포트 생성 (GA)
요약(무슨 일)과 달리, **인시던트 리포트**는 **종합 사후 문서**입니다. 생성·종료 시각, 참여 분석가 전원, 분류와 그 근거, 수행된 모든 조사·개선 조치(디바이스 격리, 사용자 비활성화 등), 실행된 Sentinel 플레이북, 분석가 코멘트, 후속 항목을 담습니다.

> 🇰🇷 "Defender 인시던트 34669의 인시던트 리포트를 생성해 줘."
>
> 🇺🇸 *`Generate the incident report for Defender incident 34669.`*

**결과**: 몇 분 만에 다단계 공격의 전모 파악부터 페이로드 규명, 유사 피해·반출 헌팅, 봉쇄, 사후 보고서까지 마쳤습니다.

> [!TIP]
> **고급 활용 팁 — 잘 모르는 사용법**
> - **리포트를 인시던트에 저장**: 생성 후 **"Post to activity log"**를 누르면 리포트가 인시던트 자체에 남아 감사 추적이 됩니다. **"Export incident as PDF"**는 공격 스토리·영향 자산·경보에 더해 AI 생성 요약·리포트까지 한 PDF로 묶어 줍니다.
> - **더 좋은 리포트를 위한 사전 작업**: 리포트 생성 전에 인시던트를 **분류·해결**하고 활동 로그에 **명확한 코멘트**를 남기면 리포트 품질이 올라갑니다.
> - **임베디드 → 독립형 전환**: 각 임베디드 기능의 **"Open in Security Copilot"**로 독립형 포털에 이어가면, 다른 플러그인·프롬프트북과 결합해 조사를 확장할 수 있습니다.

참고: [인시던트 요약](https://learn.microsoft.com/defender-xdr/security-copilot-m365d-incident-summary) · [스크립트 분석](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-script-analysis) · [디바이스 요약](https://learn.microsoft.com/microsoft-365/security/defender/copilot-in-defender-device-summary) · [유도된 대응](https://learn.microsoft.com/defender-xdr/security-copilot-m365d-guided-response) · [인시던트 리포트 생성](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-create-incident-report) · [Advanced Hunting](https://learn.microsoft.com/defender-xdr/advanced-hunting-security-copilot)

---

## 시나리오 2 — Identity: 계정 탈취 심층 조사와 앱 위험 점검

> **👤 페르소나 — ID 보안 관리자**
>
> Entra ID Protection에서 임원 계정 `karita@woodgrovebank.com`이 위험으로 표시됐습니다. Entra 관리 센터 좌측의 **Copilot 채팅**을 사이드카로 열어 두고, 페이지를 옮겨 다니며 계정 탈취 여부를 판정합니다. 이어서 조직 전체의 **위험한 앱(서비스 주체)**까지 점검합니다.

- **상황**: 위험 사용자 1명 + 최근 OAuth 앱 급증 정황.
- **목표**: 계정 상태·인증 수단 확인 → 로그인/감사 이력 분석 → 그룹·권한 파악 → 위험 앱·과다 권한 점검.
*(위험 사용자 요약은 Entra ID **P2**, 앱 위험 조사는 **Workload Identities Premium**, CA 최적화 에이전트는 **P1**.)*

### 1단계 — 필요 권한만 잠깐 승격 (PIM/JIT)
최소 권한 원칙을 지키며 조사에 필요한 역할만 잠시 활성화합니다.

> 🇰🇷 "{필요한 역할}을 활성화해서 {수행할 작업}을 할 수 있게 해줘."
>
> 🇺🇸 *`Activate the {required role} so that I can perform {desired task}.`*

### 2단계 — 계정 기본 정보·인증 수단 점검

> 🇰🇷 "karita@woodgrovebank.com의 모든 사용자 정보를 알려주고 개체 ID(Object ID)를 추출해 줘."
>
> 🇺🇸 *`Give me all user details for karita@woodgrovebank.com and extract the user Object ID.`*

> 🇰🇷 "karita@woodgrovebank.com의 비밀번호가 마지막으로 변경·재설정된 시점은 언제야?"
>
> 🇺🇸 *`When was the password last changed or reset for karita@woodgrovebank.com?`*

> 🇰🇷 "karita@woodgrovebank.com에 등록된 인증 방법이 있으면 무엇인지 알려줘."
>
> 🇺🇸 *`What are the authentication methods that are registered for karita@woodgrovebank.com if any?`*

### 3단계 — 위험 이력과 로그인·감사 로그 (표로)

> 🇰🇷 "karita@woodgrovebank.com의 위험 수준·상태·위험 세부정보는 어때?"
>
> 🇺🇸 *`What is the risk level, state, and risk details for karita@woodgrovebank.com?`*

> 🇰🇷 "karita@woodgrovebank.com의 지난 7일 로그인 실패를 보여주고 IP 주소가 무엇인지 알려줘."
>
> 🇺🇸 *`Show me failed sign-ins for karita@woodgrovebank.com for the past 7 days and tell me what the IP addresses are.`*

> 🇰🇷 "karita@woodgrovebank.com의 지난 72시간 Microsoft Entra 감사 로그를 표 형식으로 정리해 줘."
>
> 🇺🇸 *`Get Microsoft Entra audit logs for karita@woodgrovebank.com for the past 72 hours. Put information in table format.`*

### 4단계 — 그룹 소속과 권한 맥락 파악

> 🇰🇷 "karita@woodgrovebank.com이 속한 Microsoft Entra 사용자 그룹을 표로 정리해 줘."
>
> 🇺🇸 *`Get the Microsoft Entra user groups that karita@woodgrovebank.com is a member of. Put information in table format.`*

> 🇰🇷 "Finance Department 그룹에 대해 더 알려줘."
>
> 🇺🇸 *`Tell me more about the Finance Department group.`*

### 5단계 — 조직 전체 위험 앱·과다 권한 점검
계정 조사에 이어, 최근 늘어난 OAuth 앱(서비스 주체)의 위험을 봅니다. **세션 컨텍스트**를 활용해 "위 응답의 앱들"처럼 이전 결과를 이어서 물을 수 있습니다.

> 🇰🇷 "위험한 앱을 보여줘."
>
> 🇺🇸 *`Show me risky apps.`*

> 🇰🇷 "High 위험 수준의 앱 5개를 나열해줘. 표 형식은 다음과 같이: Display Name | ID | Risk State"
>
> 🇺🇸 *`List 5 apps with High Risk Level. Format the table as follows: Display Name | ID | Risk State`*

> 🇰🇷 "위 위험한 앱들은 어떤 권한을 갖고 있어? (이전 응답 기준)"
>
> 🇺🇸 *`What permissions do the above risky apps have (from previous response)?`*

> 🇰🇷 "사용하지 않는 앱을 보여줘." (지난 90일간 토큰 미발급 앱 — 빠른 정리 대상)
>
> 🇺🇸 *`Show me unused apps.`*

### 6단계 — 위험 사용자 요약 → 조건부 액세스 조치 (GA)
Entra 관리 센터 › ID Protection › Risky Users에서 사용자를 선택하면 **위험 사용자 요약**이 ① 왜 위험한지, ② 취할 조치(로그인 위험/사용자 위험 CA 정책 생성), ③ 문서 링크를 제시합니다. 이 근거로 CA 정책을 만들어 계정을 봉쇄합니다.

**결과**: 계정 탈취를 확증하고, 위험 기반 CA로 봉쇄하고, 위험 앱까지 정리했습니다.

> [!TIP]
> **고급 활용 팁 — 잘 모르는 사용법**
> - **조건부 액세스 최적화 에이전트(GA)**는 CA 정책의 **MFA 격차·레거시 인증·위험 사용자/로그인·정책 중복(최대 40쌍)**을 점검합니다. **1단계 스캔은 SCU를 소비하지 않고**, 새 이슈가 있을 때만 2단계에서 **report-only 모드로** 정책을 제안합니다. **관리자가 승인하기 전에는 기존 정책을 변경하지 않으며**, 한 번 실행에 평균 **1 SCU 미만**을 씁니다.
> - **"딥 분석 MFA 격차"**는 어떤 MFA 정책으로도 보호되지 않는 사용자를 찾아, 최근 로그인 순으로 우선순위를 매겨 샘플을 제시합니다.

참고: [Entra Copilot으로 조사](https://learn.microsoft.com/entra/security-copilot/entra-investigate-incident) · [위험 앱 조사](https://learn.microsoft.com/entra/security-copilot/entra-investigate-risky-apps) · [위험 사용자 요약](https://learn.microsoft.com/entra/fundamentals/copilot-entra-risky-user-summarization) · [CA 최적화 에이전트](https://learn.microsoft.com/entra/security-copilot/conditional-access-agent-optimization)

---

## 시나리오 3 — Data Security: 민감 데이터 유출 심층 추적

> **👤 페르소나 — 컴플라이언스/데이터 보호 담당**
>
> 퇴사 예정 직원이 민감 데이터를 반출한다는 제보가 들어왔습니다. Microsoft Purview에서 DLP·내부자 위험(IRM)·DSPM을 넘나들며, **한 사용자를 중심으로** 데이터 위험을 입체적으로 추적하고 예방책까지 도출합니다.

- **상황**: 특정 사용자(`user@contoso.com`)의 반출 정황 + 특정 민감 레이블 데이터의 외부 이동 우려.
- **목표**: 경보 선별 → 사용자 활동 심층 추적 → 레이블 기준 데이터 흐름 점검 → 예방책 도출.

### 1단계 — 최근 고위험 DLP 경보 훑기
독립형 포털(Purview 플러그인) 또는 DLP 대시보드에서 시작합니다.

> 🇰🇷 "지난 24시간 동안의 상위 5개 DLP 경보를 보여줘."
>
> 🇺🇸 *`Show me the top five DLP alerts from the past 24 hours.`*

> 🇰🇷 "ID가 12345인 DLP 경보를 요약해 줘."
>
> 🇺🇸 *`Summarize the DLP alert with ID <12345>.`*

> 🇰🇷 "DLP 경보 12345와 연관된 사용자의 위험 프로필은 어때?"
>
> 🇺🇸 *`What's the risk profile of the user that's associated with the DLP alert <12345>.`*

### 2단계 — 사용자 중심 IRM 활동 심층 추적
한 사용자를 정해 반출·순차·난독화 활동을 파고듭니다(공식 IRM 프롬프트북 순서).

> 🇰🇷 "user@contoso.com 사용자와 연관된 위험을 보여줘."
>
> 🇺🇸 *`Show me the risk associated with user user@contoso.com`*

> 🇰🇷 "이 사용자의 반출(exfiltration) 활동을 보여줘."
>
> 🇺🇸 *`Show me the exfiltration activities for this user.`*

> 🇰🇷 "이 사용자의 순차적(sequential) 활동을 보여줘."
>
> 🇺🇸 *`Show me the sequential activities for this user.`*

> 🇰🇷 "이 사용자의 난독화(obfuscation) 활동을 보여줘."
>
> 🇺🇸 *`Show me obfuscation activities for this user.`*

### 3단계 — DSPM 프롬프트북으로 민감 데이터 흐름 점검
DSPM 개요 페이지의 **민감 데이터 보호 프롬프트북**으로 레이블 기준의 데이터 흐름을 봅니다.

> 🇰🇷 "'{레이블·분류자·SIT}'로 레이블된 데이터는 어디에 저장돼 있어?"
>
> 🇺🇸 *`Where is data labeled as <label_or_classifier_or_SIT> stored?`*

> 🇰🇷 "지난 {기간}일 동안 '{레이블}' 데이터가 조직 외부로 전송된 사례를 식별해 줘."
>
> 🇺🇸 *`Identify instances where <label_or_classifier_or_SIT> data was transferred outside of the organization in the last <duration> days.`*

> 🇰🇷 "지난 {기간}일 동안 '{레이블}' 데이터를 가장 많이 반출한 상위 5명은 누구야?"
>
> 🇺🇸 *`Who are the top five users with the most <label_or_classifier_or_SIT> data exfiltration in the last <duration> days?`*

### 4단계 — 예방책 도출
조사에서 끝내지 않고, Copilot에게 완화책을 직접 요청합니다.

> 🇰🇷 "'{레이블}' 데이터의 무단 전송을 어떻게 예방할 수 있어?"
>
> 🇺🇸 *`How can I prevent unauthorized transfers of <label_or_classifier_or_SIT> data?`*

**관찰 포인트**: DSPM 프롬프트에서 기간을 지정하지 않으면 기본 10일, 최대 30일까지 조회됩니다. 사용자 질문에는 UPN을, 레이블/분류자 이름에는 작은따옴표를 쓰세요.

**결과**: 경보 → 사용자 활동 → 레이블 기준 데이터 흐름 → 예방책까지 하나의 흐름으로 완결했습니다.

> [!TIP]
> **고급 활용 팁 — 잘 모르는 사용법**
> - **eDiscovery 요약(GA)**: 리뷰 세트의 항목(문서·회의 녹취·첨부)을 **Summarize**로 요약할 수 있습니다. 계약서라면 "핵심 참여자/핵심 주제/액션 아이템 식별" 같은 후속 프롬프트가 제안됩니다. *제약*: 평문 보기가 있어야 하고 **100~15,000단어** 범위여야 합니다.
> - **AI 거버넌스의 반전**: **커뮤니케이션 규정 준수**는 이제 **Security Copilot을 포함한 생성형 AI 상호작용 자체**를 모니터링 대상으로 잡을 수 있습니다("Detect Microsoft Copilot interactions" 템플릿). AI 사용 거버넌스의 기준선을 세울 때 유용합니다.
> - **DLP용 Alert Triage Agent(Preview)**는 경보를 민감도·반출·정책 위험 기준으로 4개 범주로 자동 분류해 우선순위 지정을 돕습니다.

참고: [Purview에서 Copilot 개요](https://learn.microsoft.com/purview/copilot-in-purview-overview) · [DSPM Copilot](https://learn.microsoft.com/purview/data-security-posture-management-copilot) · [내부자 위험 관리 활동](https://learn.microsoft.com/purview/insider-risk-management-activities) · [eDiscovery 리뷰 세트 요약](https://learn.microsoft.com/purview/edisc-review-set-view) · [커뮤니케이션 규정 준수 Copilot](https://learn.microsoft.com/purview/communication-compliance-copilot)

--

## 마무리: 시나리오를 넘나드는 공통 패턴과 다음 단계

| 시나리오 | 도메인 | 대표 고급 활용 |
| --- | --- | --- |
| 1. 피싱 풀 사이클 | Threat Protection | 스크립트 분석 · 디바이스 요약 · NL-to-KQL 헌팅 · 사후 리포트(PDF/활동로그) |
| 2. 계정 탈취 + 앱 위험 | Identity | 세션 컨텍스트 후속 질문 · 위험 앱/과다 권한 · CA 최적화 에이전트 |
| 3. 민감 데이터 유출 | Data Security | IRM/DSPM 프롬프트북 · eDiscovery 요약 · AI 상호작용 거버넌스 |
| 4. 자동화 + 교차 조사 | 운영 | TI 브리핑 에이전트 · 에이전트 메모리 · 4제품 교차 프롬프트북 · 디바이스 비교 |

**공통 리듬**: ① 요약으로 상황 파악 → ② 후속 프롬프트로 심층 조사(세션 컨텍스트 활용) → ③ 형식을 지정해 산출물화 → ④ 반복 업무는 프롬프트북·에이전트로 자동화.

> [!TIP]
> **커스텀 프롬프트북으로 나만의 절차 굳히기**: 위 조사 흐름 중 자주 쓰는 순서를 세션에서 체크해 **Create promptbook**, 각괄호 매개변수(`<IncidentID>`, `<ThreatActor>`, 공백 금지)로 재사용하세요. 단계별 **"Continue on failure"** 토글로 한 단계 실패에도 멈추지 않게 하고, 가시성을 "Anyone in my organization"으로 두면 팀 전체가 같은 절차를 씁니다. 프리뷰 기능인 **"프롬프트에서 시스템 기능 직접 호출"**로 특정 플러그인 스킬(예: 유도된 대응 생성)을 프롬프트북 단계에 끼워 넣을 수도 있습니다. 운영 원칙(플러그인 거버넌스·최소 권한·SCU 관리·사람 감독)은 [08 사용량 모니터링](./08-usage-monitoring.md)·[09 책임 있는 AI](./09-responsible-ai.md)를 참고하세요.

> [!IMPORTANT]
> **세션 공유의 보안 주의점**: 세션을 공유하면 링크는 **세션 전체**를 참조하며, 받는 사람은 **기반 데이터 접근 권한이 없어도** 정적 화면으로 내용을 볼 수 있습니다. 민감한 조사 세션을 공유할 때는 이 점을 반드시 유의하세요.

참고: [커스텀 프롬프트북 빌드](https://learn.microsoft.com/security-copilot/build-promptbooks) · [포털 탐색·세션·핀 보드](https://learn.microsoft.com/security-copilot/navigating-security-copilot) · [역할 및 인증](https://learn.microsoft.com/security-copilot/authentication)

---

## 참고 링크

- [프롬프트 팁(Prompting best practices)](https://learn.microsoft.com/security-copilot/prompting-tips)
- [포털 탐색·세션·핀 보드(Navigating)](https://learn.microsoft.com/security-copilot/navigating-security-copilot)
- [인시던트 요약(Incident summary)](https://learn.microsoft.com/defender-xdr/security-copilot-m365d-incident-summary)
- [스크립트 분석(Script analysis)](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-script-analysis)
- [디바이스 요약(Device summary)](https://learn.microsoft.com/microsoft-365/security/defender/copilot-in-defender-device-summary)
- [유도된 대응(Guided response)](https://learn.microsoft.com/defender-xdr/security-copilot-m365d-guided-response)
- [인시던트 리포트 생성(Create incident report)](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-create-incident-report)
- [Advanced Hunting에서 Security Copilot](https://learn.microsoft.com/defender-xdr/advanced-hunting-security-copilot)
- [Entra Copilot으로 인시던트 조사](https://learn.microsoft.com/entra/security-copilot/entra-investigate-incident)
- [Entra 위험 앱 조사](https://learn.microsoft.com/entra/security-copilot/entra-investigate-risky-apps)
- [위험 사용자 요약(Entra)](https://learn.microsoft.com/entra/fundamentals/copilot-entra-risky-user-summarization)
- [CA 최적화 에이전트](https://learn.microsoft.com/entra/security-copilot/conditional-access-agent-optimization)
- [Purview에서 Copilot 개요](https://learn.microsoft.com/purview/copilot-in-purview-overview)
- [DSPM Copilot](https://learn.microsoft.com/purview/data-security-posture-management-copilot)
- [내부자 위험 관리 활동(Purview)](https://learn.microsoft.com/purview/insider-risk-management-activities)
- [eDiscovery 리뷰 세트 요약](https://learn.microsoft.com/purview/edisc-review-set-view)
- [커뮤니케이션 규정 준수 Copilot](https://learn.microsoft.com/purview/communication-compliance-copilot)
- [위협 인텔 브리핑 에이전트](https://learn.microsoft.com/defender-xdr/threat-intel-briefing-agent-defender)
- [에이전트 개요(Agents overview)](https://learn.microsoft.com/security-copilot/agents-overview)
- [기본 제공 프롬프트북(Using promptbooks)](https://learn.microsoft.com/security-copilot/using-promptbooks)
- [커스텀 프롬프트북 빌드(Build promptbooks)](https://learn.microsoft.com/security-copilot/build-promptbooks)
- [Intune에서 Copilot](https://learn.microsoft.com/intune/intune-service/copilot/copilot-intune-overview)
- [역할 및 인증(Authentication)](https://learn.microsoft.com/security-copilot/authentication)

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [10 · 핸즈온 랩](./10-handson-lab.md) | [99 · 부록](./99-troubleshooting.md) |

[🏠 전체 목차로 돌아가기](./README.md)
