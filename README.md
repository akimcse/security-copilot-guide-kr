# Microsoft Security Copilot 핸즈온 워크숍

이 워크숍은 **Microsoft Security Copilot을 이해하고 직접 사용해 보는 것**을 목표로 합니다. 소개 → 사전 준비 → 핵심 개념 → 주요 기능 → 핸즈온 랩 순서로, 보안팀(SOC 분석가 · 위협 인텔리전스 · IT 관리자 · 컴플라이언스 · CISO) 관점에서 학습합니다.
페이지를 번호 순서대로 읽으면 그대로 진행됩니다.

> **처음이라면 [00 개요](./00-overview.md)부터 읽으세요.**

> [!IMPORTANT]
> - 이 자료는 Microsoft 공식 문서가 아니라 **이해와 실습을 돕기 위한 비공식 핸즈온 가이드**입니다. 다만 **모든 내용은 Microsoft Learn 공식 문서를 근거**로 작성했으며, 각 페이지 하단에 참고한 1차 출처(Learn URL)를 명시했습니다.
> - Security Copilot에는 **프리뷰(preview) 상태의 기능이 다수** 포함되며, UI·명령어·사양·제공 조건은 향후 변경될 수 있습니다. 여기의 내용은 작성 시점(2026년 기준)을 반영하며 실제 화면과 다를 수 있습니다.
> - **Security Copilot은 상용 클라우드 전용**이며 GCC / GCC High / DoD / Azure Government 환경용으로 설계되지 않았습니다.
> - 시작 전에 각 페이지의 "참고 링크"에서 최신 사양을 확인하세요.

---

## 목차

| # | 페이지 | 내용 |
| --- | --- | --- |
| 00 | [개요](./00-overview.md) | **Security Copilot이란?** · 2가지 경험(standalone / embedded) · 동작 원리 · 활용 사례 |
| 01 | [Step 1: 사전 준비](./01-prerequisites.md) | 라이선스(E5/E7 vs SCU) · SCU 프로비저닝 · Azure 요건 · **역할/RBAC 3계층** · 데이터 지역(geo) |
| 02 | [Step 2: 핵심 개념](./02-concepts.md) | 프롬프트 · 세션 · 프롬프트북 · 플러그인 · 스킬 · 에이전트 · SCU · 용량 · 그라운딩 · 지식 소스 · 워크스페이스 |
| 03 | [Step 3: Standalone 포털](./03-standalone-portal.md) | 독립형 포털 경험 · **효과적인 프롬프트 작성법** · 프로세스 로그 · 세션 공유 |
| 04 | [Step 4: 프롬프트북](./04-promptbooks.md) | 기본 제공 프롬프트북 8종 · **커스텀 프롬프트북 만들기** |
| 05 | [Step 5: 플러그인](./05-plugins.md) | Microsoft / 비-Microsoft / 커스텀 플러그인 · 관리 및 접근 제어 |
| 06 | [Step 6: 임베디드 경험](./06-embedded-experiences.md) | Defender XDR · Entra · Intune · Purview · Sentinel 내장 기능 |
| 07 | [Step 7: 에이전트](./07-agents.md) | Security Copilot 에이전트(Defender / Entra / Intune / Purview) |
| 08 | [Step 8: 사용량 모니터링](./08-usage-monitoring.md) | 용량/사용량 대시보드 · SCU 소비 · 근접 한도 동작 |
| 09 | [Step 9: 책임 있는 AI · 데이터 보안](./09-responsible-ai.md) | 데이터 처리 · 학습 미사용 보장 · 데이터 레지던시 · 보존 기간 |
| 10 | [Step 10: 핸즈온 랩](./10-handson-lab.md) | **6단계 실습**: 첫 프롬프트 → 프롬프트북 → 플러그인 → 임베디드 → 커스텀 프롬프트북 → 에이전트 |
| 99 | [부록](./99-troubleshooting.md) | 문제 해결 · FAQ · 알려진 제한 사항 |

---

## 이 워크숍의 지도

```
00 개요 ─▶ 01 사전 준비 ─▶ 02 핵심 개념 ─▶ 03 Standalone 포털 ─▶ 04 프롬프트북 ─▶ 05 플러그인 ─▶ 06 임베디드 경험 ─▶ 07 에이전트 ─▶ 08 사용량 모니터링 ─▶ 09 책임 있는 AI ─▶ 10 핸즈온 랩 ─▶ 99 부록
 (무엇인가?)   (라이선스/역할)   (용어)           (프롬프트 작성)       (프롬프트북)      (데이터 소스)    (제품 내장)          (자동화)       (SCU 관리)              (데이터 보안)        (직접 실습)
```

## 사전 요구사항 요약 (라이선스, 역할, 도구)

| 구분 | 내용 |
| --- | --- |
| **라이선스/용량** | **Microsoft 365 E5 또는 E7** 고객은 자동 프로비저닝 대상일 수 있음. 그 외 고객은 Azure에서 **Security Compute Unit(SCU)**를 수동 프로비저닝(최소 1 SCU). 자세한 내용은 [Step 1](./01-prerequisites.md) |
| **Azure** | SCU 구매 시 Azure 구독 필요 · 용량 프로비저닝에 **Contributor 또는 Owner** 역할 |
| **역할** | 온보딩 대상 테넌트에서 **Security Administrator 이상** · Security Copilot 플랫폼 역할(**Copilot 소유자 / 기여자**) |
| **접근 도구** | 웹 브라우저(standalone 포털 `securitycopilot.microsoft.com`), 각 보안 제품 포털(embedded) |

> [!IMPORTANT]
> **온보딩 전에 조직이 Microsoft 365 E5 또는 E7 라이선스를 보유했는지 반드시 먼저 확인하세요.** 따라야 할 단계와 용량 구매 필요 여부가 이 판단에 따라 달라집니다.

---

## 사용하는 사이트(포털)

| 공식 명칭 | URL | 용도 |
| --- | --- | --- |
| **Microsoft Security Copilot 포털** | https://securitycopilot.microsoft.com/ | 독립형(standalone) 경험 — 프롬프트 · 프롬프트북 · 에이전트 · 플러그인 관리 |
| **Security Store** | https://securitystore.microsoft.com/ | 에이전트 및 솔루션 검색·설치 |
| **Microsoft Defender 포털** | https://security.microsoft.com/ | Defender XDR 임베디드 경험(인시던트 요약, 유도된 대응, KQL 생성) |
| **Microsoft Entra 관리 센터** | https://entra.microsoft.com/ | Entra 임베디드 경험, 조건부 액세스 최적화 에이전트 |
| **Microsoft Intune 관리 센터** | https://intune.microsoft.com/ | Intune 임베디드 경험 및 에이전트 |
| **Microsoft Purview 포털** | https://purview.microsoft.com/ | Purview 임베디드 경험(DLP · IRM) |
| **Azure 포털** | https://portal.azure.com/ | SCU 용량 프로비저닝 및 관리 |

---

## 스크린샷 삽입 방법

각 페이지의 이미지 프레임(`![...](./images/*.png)`)에 대응하는 PNG를 `images/` 폴더에 **동일한 이름으로 덮어쓰기**하면 표시됩니다(마크다운 편집 불필요). 본 레포는 실습 환경에서 직접 캡처한 이미지를 채워 넣도록 자리 표시자를 제공합니다.

---

## 참고 링크 (Microsoft Learn 공식 문서)

- [Microsoft Security Copilot 개요](https://learn.microsoft.com/security-copilot/microsoft-security-copilot)
- [시작하기 / 온보딩](https://learn.microsoft.com/security-copilot/get-started-security-copilot)
- [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)
- [Security Compute Unit(SCU)와 용량](https://learn.microsoft.com/security-copilot/security-compute-units-capacity)
- [역할 및 인증](https://learn.microsoft.com/security-copilot/authentication)
- [프롬프트 작성 모범 사례](https://learn.microsoft.com/security-copilot/prompting-tips)
- [프롬프트북 사용](https://learn.microsoft.com/security-copilot/using-promptbooks)
- [플러그인 개요](https://learn.microsoft.com/security-copilot/plugin-overview)
- [에이전트 개요](https://learn.microsoft.com/security-copilot/agents-overview)
- [개인정보 및 데이터 보안](https://learn.microsoft.com/security-copilot/privacy-data-security)
- [책임 있는 AI 개요](https://learn.microsoft.com/security-copilot/responsible-ai-overview-security-copilot)

> [!NOTE]
> 이 레포는 학습용 비공식 자료입니다. Microsoft, Microsoft Security Copilot 및 관련 제품명은 Microsoft Corporation의 상표입니다.
