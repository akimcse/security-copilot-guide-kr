# Step 6 — 임베디드 경험 (제품 내장 Security Copilot)

[← 목차](./README.md) | [← Step 5: 플러그인](./05-plugins.md) | [다음: Step 7 에이전트 →](./07-agents.md)

---

Security Copilot은 독립형 포털뿐 아니라 다른 Microsoft 보안 제품 안에 **사이드카 패널**로 내장되어 제공됩니다. 이 임베디드(embedded) 경험은 분석가가 제품을 벗어나지 않고 각 제품의 컨텍스트에서 Security Copilot 역량을 사용할 수 있게 합니다. 패널이 숨겨져 있든 보이든 동작(및 SCU 소비)은 동일합니다.

참고: [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)

## 제품별 임베디드 기능 (공식 목록)

| 제품 | 임베디드 기능 |
| --- | --- |
| **Azure Firewall** | IDPS 시그니처 위협 프로파일 보강, IDPS 보안 권장 사항 생성, 테넌트 전반의 IDPS 시그니처 조회, 상위 IDPS 시그니처 히트 조회 |
| **Microsoft Defender for Cloud** | 권장 사항 분석, 권장 사항 위임, 코드 개선(remediate), 권장 사항 개선, 권장 사항 요약 |
| **Microsoft Defender Threat Intelligence (MDTI)** | 위협 인텔리전스를 위한 Security Copilot 활용 |
| **Microsoft Defender XDR** | 파일 분석, 스크립트·코드 분석, 인시던트 보고서 작성, 헌팅용 KQL 쿼리 생성, 디바이스 정보 요약, **인시던트 요약**, ID 요약, **유도된 대응(guided response) 사용** |
| **Microsoft Entra** | 앱 위험 조사, 인시던트 조사, 위험 사용자 조사, 수명 주기 워크플로 관리 |
| **Microsoft Intune** | 디바이스 쿼리, 정책·설정 관리, 디바이스 문제 해결 |
| **Microsoft Purview** | DLP 경보 조사, 내부자 위험 관리 활동 조사, 커뮤니케이션 컴플라이언스 메시지 요약, eDiscovery 메시지 요약(preview) |
| **Microsoft Sentinel** | Microsoft Sentinel 인시던트 요약 |

참고: [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)

---

## Defender XDR 3대 핵심 임베디드 기능 심화

Defender XDR에 내장된 Security Copilot 중에서도 **인시던트 요약**, **유도된 대응**, **Advanced Hunting KQL 생성**은 SOC 분석가가 가장 자주 사용하는 세 가지 핵심 기능입니다.

### 1) 인시던트 요약 (Incident Summary)

인시던트 페이지를 열면 **자동으로 요약이 생성**됩니다. 요약은 다음 내용을 다룹니다.

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

![Defender XDR 인시던트 요약](./images/06-defender-incident-summary.png)
*Defender XDR 인시던트 페이지에서 자동 생성된 Security Copilot 인시던트 요약*

참고: [Defender XDR 인시던트 요약](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-incident-summary)

### 2) 유도된 대응 (Guided Response)

인시던트 페이지가 열리면 유도된 대응도 **자동으로 표시**됩니다. 다음 네 가지 범주의 **액션 카드**를 생성합니다.

| 범주 | 설명 |
| --- | --- |
| **분류(Triage)** | 인시던트를 우선순위화하고 판단하기 위한 조치 |
| **격리(Containment)** | 위협 확산을 막기 위한 봉쇄 조치 |
| **조사(Investigation)** | 심층 조사를 위한 조치 |
| **개선(Remediation)** | 위협 제거 및 복구 조치 |

각 카드는 **어떤 조치를, 어떤 엔티티에, 왜** 수행해야 하는지 설명합니다. 또한 다음 기능을 포함합니다.

- **Teams로 사용자 연락(Contact user in Teams)** — 사용자에게 보낼 제안 텍스트를 생성합니다.
- **유사 인시던트 보기(View similar incidents)** — 머신러닝(ML)으로 매칭된 유사 인시던트를 보여줍니다.
- **유사 이메일 보기(View similar emails)** — 헌팅용 KQL을 자동 생성합니다.

![유도된 대응](./images/06-guided-response.png)
*분류·격리·조사·개선 액션 카드로 구성된 유도된 대응*

참고: [Defender XDR 유도된 대응](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-guided-response)

### 3) Advanced Hunting용 KQL 생성

Advanced Hunting에서 Security Copilot은 자연어를 KQL 쿼리로 변환해 줍니다. 두 가지 모드를 제공합니다.

| 모드 | 설명 |
| --- | --- |
| **Threat Hunting Agent** *(preview)* | 대화형으로 전체 조사를 수행하는 헌팅 에이전트 |
| **Query assistant** | 자연어를 KQL 쿼리로 생성(NL→KQL) |

- Defender와 Sentinel의 광범위한 테이블을 지원합니다: **Defender 테이블 40개 이상**, **Sentinel 테이블 70개 이상**.
- 모범 사례: 모호하지 않게 표현하기, 한 번에 하나의 질문하기, 구체적으로 작성하기.

> [!NOTE]
> Advanced Hunting의 Security Copilot 기능 문서 및 Threat Hunting Agent는 **preview** 상태입니다.

참고: [Advanced Hunting용 Security Copilot](https://learn.microsoft.com/microsoft-365/security/defender/advanced-hunting-security-copilot)

---

## 참고 링크

- [Standalone vs Embedded 경험](https://learn.microsoft.com/security-copilot/experiences-security-copilot)
- [Defender XDR 인시던트 요약](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-incident-summary)
- [Defender XDR 유도된 대응](https://learn.microsoft.com/microsoft-365/security/defender/security-copilot-m365d-guided-response)
- [Advanced Hunting용 Security Copilot](https://learn.microsoft.com/microsoft-365/security/defender/advanced-hunting-security-copilot)

---

[← 목차](./README.md) | [← Step 5: 플러그인](./05-plugins.md) | [다음: Step 7 에이전트 →](./07-agents.md)
