[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 7 / 12

# 06 · 임베디드 경험 (제품 내장 Security Copilot)

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 어떤 제품에 Security Copilot이 내장돼 있는지
> - Defender XDR 인시던트 요약·유도된 대응·KQL 생성
> - 임베디드에서 독립형 포털로 이어가는 조사 흐름
>
> ⏱️ 예상 소요 **9분**　·　🎯 대상: SOC 분석가, 위협 헌터

Security Copilot은 독립형 포털뿐 아니라 다른 Microsoft 보안 제품 안에 **사이드카 패널**로 내장되어 제공됩니다. 이 임베디드(embedded) 경험은 분석가가 제품을 벗어나지 않고 각 제품의 컨텍스트에서 Security Copilot 기을 사용할 수 있게 합니다. 패널이 숨겨져 있든 보이든 동작(및 SCU 소비)은 동일합니다.

참고: [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)


## 1. 임베디드 기능 사용하기
테넌트에 Security Copilot capacity(SCU)가 프로비저닝되어 있고 사용자가 적절한 역할(Security Copilot 역할 + 해당 제품 RBAC)을 보유한 경우, 임베디드 경험을 지원하는 보안 솔루션 포털에서 Copilot 버튼이 자동으로 생겨 사이드카 패널로 기능을 활용할 수 있습니다.

<img width="2295" height="470" alt="image" src="https://github.com/user-attachments/assets/d96f5758-e486-4bba-9ba1-dfc07578a071" />

*SCU가 프로비저닝 되어 있지 않은 경우*

<img width="2297" height="378" alt="image" src="https://github.com/user-attachments/assets/0e2d5174-6362-4460-8984-1b5c3dbcafb9" />

*SCU가 프로비저닝 되어 있는 경우*

---

## 2. 제품별 임베디드 기능 (공식 목록)

| 제품 | 임베디드 기능 |
| --- | --- |
| **Azure Firewall** | IDPS 시그니처 위협 프로파일 보강, IDPS 보안 권장 사항 생성, 테넌트 전반의 IDPS 시그니처 조회, Azrue 방화벽에 대한 상위 IDPS 시그니처 일치 항목 조회 |
| **Microsoft Defender for Cloud** | 권장 사항 분석, 권장 사항 위임, 코드 개선(remediate), 권장 사항 개선, 권장 사항 요약 |
| **Microsoft Defender Threat Intelligence (MDTI)** | 위협 인텔리전스를 위한 Security Copilot 활용 |
| **Microsoft Defender XDR** | 파일 분석, 스크립트·코드 분석, 인시던트 보고서 작성, 헌팅용 KQL 쿼리 생성, 디바이스 정보 요약, **인시던트 요약**, ID 요약, **단계별 대응(guided response) 사용** |
| **Microsoft Entra** | 앱 위험 조사, 인시던트 조사, 위험 사용자 조사, 라이프사이클 워크플로 관리 |
| **Microsoft Intune** | 디바이스 쿼리, 정책·설정 관리, 디바이스 문제 해결 |
| **Microsoft Purview** | DLP 경고 조사, 내부자 위험 관리 활동 조사, 커뮤니케이션 컴플라이언스 메시지 요약, eDiscovery 메시지 요약(preview) |
| **Microsoft Sentinel** | Microsoft Sentinel 인시던트 요약 |

참고: [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)

---

## 3. 임베디드 기능 예시: Defender XDR 핵심 기능

각 포털에에 내장된 Security Copilot 중에서도 Defender XDR의 **인시던트 요약**, **단계별 대응**, **Advanced Hunting KQL 생성**은 SOC 분석가가 가장 자주 사용하는 세 가지 핵심 기능입니다.

### 1) 인시던트 요약 (Incident Summary)

<img width="2303" height="1147" alt="image" src="https://github.com/user-attachments/assets/c5fb8c20-b7ac-4319-9d5c-7b973ecb5c58" />

인시던트 페이지를 열면 우측 패널에 **자동으로 요약이 생성**됩니다. (요약당 평균 비용: 0.12 SCU) 요약은 다음 내용을 다룹니다.

- 공격 시작 시각/엔티티
- 타임라인
- 관련 자산
- 침해 지표(IoC)
- 위협 행위자(threat actor) 이름
- 후속 조치를 위한 제안 프롬프트

동작 특성은 다음과 같습니다.

- **최대 100개 alert**까지 포함된 인시던트를 요약할 수 있습니다.
- 설정에서 요약 생성 방식을 선택할 수 있습니다: 항상 자동 생성 / 심각도(severity)에 따라 생성 / 필요 시 온디맨드 생성.
- 인시던트가 변경되지 않았다면 캐시된 요약을 **1주 동안 재사용**하며, 재사용 시에는 **SCU 비용이 발생하지 않습니다**.

참고: [Defender XDR 인시던트 요약](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-incident-summary)

### 2) Advanced Hunting용 KQL 생성

<img width="2296" height="1163" alt="image" src="https://github.com/user-attachments/assets/032bad4e-eafa-4975-95d8-404a85872d12" />


Advanced Hunting에서 Security Copilot은 자연어를 KQL 쿼리로 변환해 줍니다. (NL→KQL)

Defender와 Sentinel의 광범위한 테이블을 지원합니다.

- **Defender 테이블 40개 이상**
- **Sentinel 테이블 70개 이상**

> [!TIP]
> 모호하지 않게 표현하기, 한 번에 하나의 질문하기, 구체적으로 작성하기.

참고: [Advanced Hunting용 Security Copilot](https://learn.microsoft.com/microsoft-365/security/defender/advanced-hunting-security-copilot)

---

## 참고 링크

- [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)
- [Defender XDR 인시던트 요약](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-incident-summary)
- [Defender XDR 유도된 대응](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-guided-response)
- [Advanced Hunting용 Security Copilot](https://learn.microsoft.com/microsoft-365/security/defender/advanced-hunting-security-copilot)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [05 · 플러그인](./05-plugins.md) | [07 · 에이전트](./07-agents.md) |

[🏠 전체 목차로 돌아가기](./README.md)
