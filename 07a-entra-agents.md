[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　07 · 에이전트 › Entra

# 07a · Microsoft Entra 에이전트

> [!NOTE]
> **이 페이지에서 얻는 것**
> - ID·액세스(IAM) 업무를 Security Copilot 에이전트로 어디까지 자동화할 수 있는지
> - Entra 에이전트의 역할·자동화 범위·GA/프리뷰 상태
> - 조건부 액세스(CA) 최적화 에이전트의 실제 UI 화면과 동작 방식
>
> ⏱️ 예상 소요 **7분**　·　🎯 대상: ID 보안 관리자, IAM 담당, 보안/IT 관리자

ID는 오늘날 공격의 최전선입니다. Entra의 Security Copilot 에이전트는 **조건부 액세스 정책 유지·위험 사용자 조사** 같은 고빈도 IAM 업무를 자율·적응형으로 자동화해, 관리자가 전략적 업무에 집중하게 합니다.

---

## 1. Conditional Access Optimization Agent — 조건부 액세스 자동 최적화 (GA)

조직이 성장하면 새 사용자·앱이 계속 추가되고, 조건부 액세스(CA) 정책은 금방 뒤처집니다. 이 에이전트는 테넌트를 **상시 스캔**해 정책 공백을 찾아내고, **원클릭 개선안**을 제시합니다.

<video controls preload="metadata" playsinline src="./media/ca-optimization-agent.mp4"></video>

*Conditional Access Optimization Agent 데모 — 정책 공백 탐지부터 원클릭 개선까지*

- **지속적으로 공백 발견:** **24시간 주기**로 새 사용자·앱을 모니터링해, 취약점이 되기 전에 CA 정책과의 불일치를 탐지합니다.
- **원클릭 개선:** 수동 조사 없이 명확·실행 가능한 권장을 제시하고, 클릭 한 번으로 정책 공백을 닫습니다.
- **환경 변화에 적응:** 사용자·앱·조건이 바뀌어도 CA 정책을 계속 정렬 상태로 유지 — 주기적 감사 의존을 줄이고 매일 보안을 강화합니다.

**GA로 강화된 점:**

- **자연어 설명 + 활동 맵:** 각 제안에 대해 평문 요약과 **시각적 활동 맵**을 제공해, 에이전트가 어떤 데이터를 보고 어떤 논리로 결론에 이르렀는지 보여줍니다 — 신뢰·투명성 확보.
- **위험 기반 정책 권장:** 사용자 위험·로그인 위험을 반영해, 기존에 누락됐거나 새로 추가된 사용자까지 **위험 기반 CA 정책**으로 보호합니다.
- **감사 로깅:** 설치·시작/중지·활성/비활성 등 에이전트 활동을 감사 로그에 기록 — 가시성과 컴플라이언스 보고가 쉬워집니다.

> [!TIP]
> **왜 좋아하나 (고객 사례)** — "24/7 대기하는 보안 분석가처럼, CA 정책의 공백을 선제적으로 찾아 첫날부터 모든 사용자를 보호한다. 리포트 전용(report-only) 모드와 AI 권장으로 중단 없이 정책을 테스트·개선할 수 있다." *(Microsoft MVP)* — 첫 실행부터 가치를 내며, 수 주가 걸리던 수동 검토를 대체합니다.

## 2. Identity Risk Management Agent — 위험 사용자 조사 자동화 (Preview)

Entra ID Protection의 **위험 사용자(risky users)** 조사를 자동화하는 에이전트입니다. 관리자·보안 분석가가 쏟아지는 경보 속에서 위험을 식별하고, 영향을 이해하고, 조직의 핵심 자산을 보호하도록 결정적 조치를 돕습니다.

**동작 방식** — 먼저 테넌트에서 위험 상태가 **"At risk"**인 신규 위험 사용자를 스캔하고, 정의된 **범위(scope) 설정** 안의 사용자를 식별합니다. *(이 초기 스캔 단계는 SCU를 소비하지 않습니다.)* 이어서 새로 발견된 사용자에 대해 다음을 수행합니다 *(이 단계부터 SCU 소비)*:

- **위험 사용자 조사:** 위험한 로그인·위험 탐지를 확인해 무엇이 위험한지 분석합니다.
- **결과·위험 요약 생성:** 조사 결과를 바탕으로, 제안을 설명하고 핵심 위험 요인을 정의하는 **위험 요약**을 생성합니다.
- **개선 조치 권장:** 조사에서 수집한 정보로 권장 개선 조치를 제시합니다.
- **채팅으로 질의응답:** 관리자가 해당 위험 사용자·위험 요약에 대해 에이전트에게 자연어로 질문할 수 있습니다.
- **사용자 지정 지침을 메모리에 저장:** 채팅으로 준 지침을 에이전트가 **메모리에 저장**해 이후 실행에 반영합니다. *(현재 메모리는 선호하는 개선 권장만 저장하며, 개선을 자동 실행하지는 않습니다.)*

**시작 방법:** Entra 관리 센터 › **ID Protection › Risky users**에서 상단 배너의 **Start agent**로 첫 실행을 시작합니다. *(최초 활성화·조치 실행에는 **Security Administrator** 역할이 필요하며, Security Reader·Global Reader는 조회만 가능합니다.)*

> [!WARNING]
> **프리뷰 · 알려진 제약** — ① 1회 실행은 최대 **100명**의 위험 사용자를 조사(범위 설정으로 조정), 100명 기준 **10~15분** 소요. ② 실행은 시작 후 중지·일시정지 불가. ③ 현재 **사용자 ID만** 분석하며 워크로드 ID는 미지원. ④ 제안은 **관리자 수동 승인** 필요 — 자동 개선 미지원. ⑤ 에이전트는 로그인 로그·위험 탐지·위험 사용자·감사 로그 등 **Entra 데이터**를 근거로 추론합니다. ⑥ AI 생성 요약·권장은 불완전·부정확할 수 있으니 **적용 전 검토**하세요.

> [!NOTE]
> 라이선스: **Entra ID P2** 필요. 실행 1회당 평균 **1 SCU 미만** 소비.

---

> [!TIP]
> **자동화 성숙도 관점** — Entra 에이전트는 **예방·태세 유지**에 강합니다. CA 최적화 에이전트가 정책 공백을 상시 닫아 제로 트러스트를 스케일러블하게 유지하고, Identity Risk Management 에이전트가 위험 사용자 대응을 가속합니다. 두 에이전트 모두 **사람 감독 하의 반자동**으로, 원클릭 실행·자연어 설명으로 통제권을 관리자에게 둡니다.

## 참고 링크

- [Entra 에이전트](https://learn.microsoft.com/entra/security-copilot/entra-agents)
- [Conditional Access Optimization Agent](https://learn.microsoft.com/entra/identity/conditional-access/agent-optimization)
- [Identity Risk Management Agent 시작](https://learn.microsoft.com/entra/id-protection/identity-risk-management-agent-get-started)
- [Entra의 Security Copilot 개요](https://learn.microsoft.com/entra/fundamentals/copilot-security-entra)
- [에이전트 개요](https://learn.microsoft.com/security-copilot/agents-overview)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [07 · 에이전트 개요](./07-agents.md) | [07b · Intune 에이전트](./07b-intune-agents.md) |

[🏠 전체 목차로 돌아가기](./README.md)
