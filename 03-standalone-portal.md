[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 4 / 12

# 03 · Standalone 포털과 효과적인 프롬프트 작성

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 세션을 시작하고 프롬프트를 입력하는 법
> - 좋은 프롬프트의 4요소(목표·맥락·기대·출처)
> - 프로세스 로그로 응답 근거를 검증하는 법
>
> ⏱️ 예상 소요 **5분**　·　🎯 대상: SOC 분석가, 위협 인텔 분석가

이 페이지는 **Standalone 포털(https://securitycopilot.microsoft.com)** 에서 세션을 시작하고, **효과적인 프롬프트를 작성**하는 방법을 다룹니다. 프롬프트 품질은 응답 품질을 직접 좌우하므로, 공식 가이드가 제시하는 프롬프트 4요소와 작성 팁을 중심으로 살펴봅니다.

---

## 1. 세션 시작하기

포털에 진입하여 보이는 하단 프롬프트 바에 자연어로 무엇이든 물어볼 수 있고, 위쪽 Prompts to try / Promptbooks에서 검증된 예시를 골라 시작할 수도 있습니다.

<img width="2295" height="1161" alt="image" src="https://github.com/user-attachments/assets/ac4ac325-4dac-4de2-89e5-c8373ab930aa" />

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

> [!TIP]
> 특히 **소스**를 명시(제품/플러그인 지정)하고 **긍정형**으로 지시("하지 마(don't do Y)"보다 "해라(do X)"로 지시)하면 응답의 일관성이 크게 좋아집니다.

참고: [Security Copilot 프롬프트 작성 팁](https://learn.microsoft.com/en-us/copilot/security/prompting-tips)

---

## 3. 프로세스 로그(Process log)

프롬프트를 제출하면 **프로세스 로그**가 나타나, **어떤 플러그인이 선택되었는지**, **어떤 기능(capability)이 호출되었는지**, **얼마나 걸렸는지**를 보여 줍니다. 이는 응답의 투명성과 신뢰를 제공합니다.

<img width="2302" height="1169" alt="image" src="https://github.com/user-attachments/assets/9727427d-8615-4439-a727-3484d75fe75e" />

*프로세스 로그 — 선택된 플러그인, 호출된 기능, 소요 시간을 단계별로 보여 주어 응답을 검증할 수 있게 합니다.*

---

## 4. 핀 보드(Pin board)

분석 과정에서 중요한 프롬프트와 결과를 선택적으로 고정(Pin)하고, 이를 기반으로 조사 내용을 자동 요약해 공유할 수 있는 협업 기능입니다. 보안 분석가는 여러 차례의 질의와 자동화 워크플로우 중 핵심 증거와 인사이트만 Pin Board에 모아 조사 스토리를 구성할 수 있으며, Security Copilot은 이러한 Pin된 항목을 바탕으로 경영진 보고, 인시던트 핸드오버, 팀 협업에 활용할 수 있는 세션 요약본을 자동 생성합니다.

<img width="2287" height="1242" alt="image" src="https://github.com/user-attachments/assets/6a2dd02a-ff95-4c4b-838f-d6adf118a64c" />

*핀 보드 — 세션 내에서 집중해서 봐야 할 특정 응답을 한번에 모아볼 수 있습니다.*

---

## 5. 세션 공유(Session sharing)

세션은 **같은 테넌트 내에서 Copilot 기여자(contributor) 액세스를 가진 다른 사용자와 읽기 전용(read-only)으로 공유**할 수 있습니다.
<img width="2292" height="1231" alt="image" src="https://github.com/user-attachments/assets/67d07231-ed37-4a68-890d-66362c6ae1a4" />

> [!WARNING]
> **SouthAfricaNorth**와 **UAENorth** 지역은 **이메일 공유(share-by-email)를 지원하지 않습니다.** 이 지역에서는 대신 **링크 복사(Copy link)** 를 사용하세요.

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
