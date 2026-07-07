[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 4 / 12

# 03 · Standalone 포털과 효과적인 프롬프트 작성

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 세션을 시작하고 프롬프트를 입력하는 법
> - 좋은 프롬프트의 4요소(목표·맥락·기대·출처)
> - 프로세스 로그로 응답 근거를 검증하는 법
>
> ⏱️ 예상 소요 **7분**　·　🎯 대상: SOC 분석가, 위협 인텔 분석가

이 페이지는**Standalone 포털(https://securitycopilot.microsoft.com)** 에서 세션을 시작하고, **효과적인 프롬프트를 작성**하는 방법을 다룹니다. 프롬프트 품질은 응답 품질을 직접 좌우하므로, 공식 가이드가 제시하는 프롬프트 4요소와 작성 팁을 중심으로 살펴봅니다.

**접근:** https://securitycopilot.microsoft.com

---

## 1. 세션 시작하기

랜딩 경험에 따라 세션을 시작하는 경로가 다릅니다.

| 경험 | 세션 시작 방법 |
| --- | --- |
| **에이전트 우선(agents-first)** | **All history → New session**으로 이동해 새 세션을 시작 |
| **채팅 우선(chat-first)** | 홈페이지의 프롬프트 바를 직접 사용 |

> [!NOTE]
> 신규 Microsoft 365 E5/E7 고객 및 최근 롤아웃은 에이전트 우선 홈페이지를 볼 수 있고, 기존 고객은 전통적인 채팅 우선 홈페이지를 계속 볼 수 있습니다. 두 경험은 단계적 롤아웃 기간 동안 공존합니다.

![Standalone 포털 프롬프트 바](./images/03-standalone-prompt-bar.png)

*Standalone 포털의 프롬프트 바 — 자연어 프롬프트를 입력하는 기본 진입점입니다.*

---

## 2. 효과적인 프롬프트의 4요소

공식 가이드는 좋은 프롬프트가 다음 네 가지 요소를 포함한다고 설명합니다.

| 요소 | 설명 |
| --- | --- |
| **목표(Goal)** | 필요한 **구체적인 보안 관련 정보** |
| **컨텍스트(Context)** | 그 정보가 **왜 필요한지 또는 어떻게 사용할지** |
| **기대(Expectations)** | 원하는 **형식·대상 청중**(표, 목록, 요약, 다이어그램 등) |
| **소스(Source)** | 사용할 **플러그인 또는 데이터 소스** |

이 네 요소를 갖추면 Security Copilot이 프롬프트를 더 정확히 그라운딩하고, 원하는 형식으로 응답을 구성할 수 있습니다.

참고: [Security Copilot 프롬프트 작성](https://learn.microsoft.com/security-copilot/prompting-security-copilot)

---

## 3. 공식 프롬프트 작성 팁

- **구체적·명확·간결하게** 작성합니다.
- **반복(iterate)합니다** — 첫 응답이 이상적이지 않으면 표현을 바꿔 다시 시도합니다.
- **필요한 컨텍스트를 제공합니다** — 예를 들어 제품을 명시합니다("in Microsoft Defender XDR").
- **긍정형 지시를 사용합니다** — "하지 마(don't do Y)"보다 "해라(do X)"로 지시합니다.
- Security Copilot을 **"You(당신)"로 지칭합니다** — 예: "You must…".

> [!TIP]
> 위 팁들은 4요소와 함께 작동합니다. 특히 **소스**를 명시(제품/플러그인 지정)하고 **긍정형**으로 지시하면 응답의 일관성이 크게 좋아집니다.

참고: [프롬프트 작성 팁](https://learn.microsoft.com/security-copilot/prompting-tips)

---

## 4. 나쁜 예 / 좋은 예

같은 의도라도 프롬프트를 어떻게 쓰느냐에 따라 응답 품질이 달라집니다.

| 구분 | 프롬프트 |
| --- | --- |
| **나쁜 예** | *"Pearl Sleet actor"* |
| **좋은 예** | *"Can you give me information about Pearl Sleet activity, including a list of known indicators of compromise and tools, tactics, and procedures (TTPs)?"* |

좋은 예는 **목표(위협 행위자 정보)**, **기대(IoC 목록 + TTP 포함)**를 명시하여, 단순 명사 나열보다 훨씬 실행 가능한 응답을 이끌어 냅니다.

---

## 5. 프로세스 로그(Process log)

프롬프트를 제출하면 **프로세스 로그**가 나타나, **어떤 플러그인이 선택되었는지**, **어떤 기능(capability)이 호출되었는지**, **얼마나 걸렸는지**를 보여 줍니다. 이는 응답의 투명성과 신뢰를 제공합니다.

![프로세스 로그](./images/03-process-log.png)

*프로세스 로그 — 선택된 플러그인, 호출된 기능, 소요 시간을 단계별로 보여 주어 응답을 검증할 수 있게 합니다.*

---

## 6. 핀 보드(Pin board)

주요 응답은 **핀(pin)으로 고정**할 수 있습니다. 항목을 핀으로 고정하면 Security Copilot이 **세션 요약을 자동 생성**합니다. 조사 과정에서 중요한 결과만 모아 요약 보고로 이어가기에 유용합니다.

---

## 7. 세션 공유(Session sharing)

세션은 **같은 테넌트 내에서 Copilot 기여자(contributor) 액세스를 가진 다른 사용자와 읽기 전용(read-only)으로 공유**할 수 있습니다.

> [!WARNING]
> **SouthAfricaNorth**와 **UAENorth** 지역은 **이메일 공유(share-by-email)를 지원하지 않습니다.** 이 지역에서는 대신 **링크 복사(Copy link)**를 사용하세요.

---

## 참고 링크

- [Security Copilot 프롬프트 작성](https://learn.microsoft.com/security-copilot/prompting-security-copilot)
- [프롬프트 작성 팁](https://learn.microsoft.com/security-copilot/prompting-tips)
- [Security Copilot 탐색(navigating)](https://learn.microsoft.com/security-copilot/navigating-security-copilot)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [02 · 핵심 개념](./02-concepts.md) | [04 · 프롬프트북](./04-promptbooks.md) |

[🏠 전체 목차로 돌아가기](./README.md)
