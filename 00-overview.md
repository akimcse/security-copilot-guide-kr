# 00 개요 — Microsoft Security Copilot이란?

[← 목차](./README.md) | [Step 1: 사전 준비 →](./01-prerequisites.md)

처음 읽는 분을 위해, 이 페이지는 **Security Copilot이 무엇이고, 어떻게 동작하며, 무엇을 할 수 있는지**를 개관합니다.
(각 용어의 실체는 [Step 2: 핵심 개념](./02-concepts.md)부터 깊이 있게 다룹니다.)

---

## 한 문장으로

Microsoft Security Copilot은 **생성형 AI 기반 보안 솔루션**으로, 방어자(defender)가 **기계 속도와 규모(machine speed and scale)로 보안 성과를 개선**하도록 효율과 역량을 높여 줍니다. 자연어로 대화하는 보조(assistive) 코파일럿 경험을 제공합니다.

> "Microsoft Security Copilot is a generative AI-powered security solution that helps increase the efficiency and capabilities of defenders to improve security outcomes at machine speed and scale."
> — [Microsoft Learn](https://learn.microsoft.com/security-copilot/microsoft-security-copilot)

SOC 분석가, 위협 인텔리전스 분석가, IT 관리자, 컴플라이언스 분석가, CISO 등 다양한 역할을 대상으로 하며 인시던트 대응, 위협 헌팅, 인텔리전스 수집, 태세 관리, 정책 관리, 이해관계자 보고 등 엔드투엔드 시나리오를 지원합니다.

## 왜 필요한가? (해결하는 문제)

보안 운영은 **경보 과부하, 인력 부족, 도구 분산, 전문 지식의 격차**에 시달립니다. Security Copilot은 다음을 자연어로 처리해 이 부담을 줄입니다.

- 복잡한 경보를 **실행 가능한 요약**으로 분류(triage)
- 자연어를 **KQL 쿼리로 변환**하거나 악성 스크립트를 역분석
- 환경 전반의 **위험을 우선순위화**(보안 태세 관리)
- 대상 청중에 맞춘 **이해관계자 보고서** 작성

## 두 가지 경험: Standalone과 Embedded

Security Copilot은 두 가지 방식으로 제공됩니다.

| 경험 | 설명 | 접근 |
| --- | --- | --- |
| **Standalone(독립형/포털)** | 몰입형 기본 경험. 전체 프롬프트 바, 세션 기록, 프롬프트북 라이브러리, 에이전트 라이브러리, 플러그인 관리를 제공. | https://securitycopilot.microsoft.com |
| **Embedded(임베디드/내장)** | 다른 Microsoft 보안 제품(Defender XDR, Sentinel, Entra, Intune, Purview, Azure Firewall, Defender for Cloud) 안에 **사이드카 패널**로 노출. 패널이 숨겨져 있든 보이든 동작(및 SCU 소비)은 동일. | 각 제품 포털 내부 |

> [!NOTE]
> **랜딩 화면 변화:** 신규 Microsoft 365 E5/E7 고객 및 최근 롤아웃에서는 **에이전트 우선(agents-first) 홈페이지**가 기본 진입점으로 표시되고, 채팅 세션은 **All history → New session**으로 접근합니다. 기존 고객은 전통적인 채팅 우선(chat-first) 홈페이지를 계속 볼 수 있습니다. 두 경험은 단계적 롤아웃 기간 동안 공존합니다.

참고: [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)

## 어떻게 동작하는가 (아키텍처)

Security Copilot의 내부 처리 파이프라인은 다음과 같습니다.

```
① 사용자 프롬프트 (standalone / embedded)
        ▼
② 그라운딩(전처리) — 플러그인으로 조직 컨텍스트를 수집해 프롬프트를 더 구체적으로
        ▼
③ LLM 추론 — 그라운딩된 프롬프트를 Azure OpenAI LLM(Azure Foundry Models)으로 전달
        ▼
④ 후처리 — 플러그인 보강 컨텍스트 회수 + 책임 있는 AI 검사(안전·컴플라이언스·개인정보) + 서식화
        ▼
⑤ 응답 반환 — 어떤 단계·플러그인이 사용됐는지 보여주는 "프로세스 로그"와 함께 반환
```

보안 특화 보강은 **플러그인(Microsoft 및 비-Microsoft)**, **위협 인텔리전스(MDTI 아티클, intel 프로파일, 위협 분석 리포트, CVE 데이터)**, **조직 고유 지식(업로드 파일, 연결된 Microsoft 365 서비스)**에서 옵니다. 즉 조직 데이터는 **모델 학습이 아니라 추론 시점의 그라운딩**으로 반영됩니다(→ [Step 9](./09-responsible-ai.md)).

참고: [Security Copilot 개요](https://learn.microsoft.com/security-copilot/microsoft-security-copilot)

## 주요 활용 사례 (공식 목록)

| 활용 사례 | 설명 |
| --- | --- |
| 위협 조사 및 대응 | 복잡한 경보를 실행 가능한 요약으로 분류하고 단계별 대응을 안내 |
| KQL 작성 / 스크립트 분석 | 자연어 → KQL, 수작업 코딩 없이 악성 스크립트 역분석 |
| 보안 태세 관리 | 환경 전반의 위험을 우선순위화하고 개선 기회 제시 |
| IT 이슈 문제 해결 | 정보를 빠르게 종합해 실행 가능한 통찰 제공 |
| 보안 정책 정의·관리 | 새 정책 정의, 충돌 교차 검토, 기존 정책 요약 |
| 보안 수명 주기 워크플로 구성 | 그룹 구성, 액세스 매개변수 설정을 단계별로 안내 |
| 이해관계자 보고서 작성 | 청중의 톤·언어에 맞춘 명확한 보고서(예: 임원 브리핑) |
| 에이전트 구축·추가 | 개발자가 커스텀 에이전트를 구축·추가 |

참고: [Security Copilot 개요](https://learn.microsoft.com/security-copilot/microsoft-security-copilot)

## 신뢰성 (ISO 42001 인증)

Security Copilot은 독립적 제3자가 확인한 **ISO 42001 인증**을 획득했으며, 이는 AI 시스템 개발·배포·운영에 수반되는 위험을 관리하는 프레임워크와 역량을 다룹니다.

참고: [책임 있는 AI 개요](https://learn.microsoft.com/security-copilot/responsible-ai-overview-security-copilot)

---

## 이 워크숍에서 경험하는 것

```
사전 준비(라이선스·역할) ─▶ 첫 프롬프트 ─▶ 프롬프트북 ─▶ 플러그인 ─▶ 임베디드 경험 ─▶ 에이전트 ─▶ 사용량/데이터 거버넌스
```

[Step 10: 핸즈온 랩](./10-handson-lab.md)에서 이 흐름을 실제 포털에서 단계별로 실습합니다.

---

## 참고 링크

- [Microsoft Security Copilot 개요](https://learn.microsoft.com/security-copilot/microsoft-security-copilot)
- [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)
- [책임 있는 AI 개요(및 용어집)](https://learn.microsoft.com/security-copilot/responsible-ai-overview-security-copilot)

[← 목차](./README.md) | [Step 1: 사전 준비 →](./01-prerequisites.md)
