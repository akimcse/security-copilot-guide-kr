[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 8 / 12

# 07 · Security Copilot 에이전트

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 에이전트의 개념과 감독 모델, 요건
> - Defender/Entra/Intune/Purview 제품군별 에이전트
> - 각 에이전트의 GA/프리뷰 상태와 용도
>
> ⏱️ 예상 소요 **8분**　·　🎯 대상: 보안/IT 관리자, CISO

Security Copilot **에이전트(agent)**는 사람의 감독 하에 반자동으로 보안 업무를 수행하는 AI 워커입니다. 다른 모든 기능과 마찬가지로 에이전트도 **SCU(Security Compute Unit)를 소비**합니다.

## 1. 에이전트 개요

<img width="2270" height="1162" alt="image" src="https://github.com/user-attachments/assets/86242946-a692-4545-8dc2-22c6896ffd36" />

*독립형 포털의 에이전트 라이브러리에서 사용 가능한 에이전트를 검색·설정*

<img width="2246" height="1224" alt="image" src="https://github.com/user-attachments/assets/a1ef9e53-db99-4e72-b6aa-42c7babcd970" />

*Security Store — Microsoft·파트너 보안 에이전트·솔루션을 탐색·도입하는 마켓플레이스*

- **검색·발견:** 에이전트는 **에이전트 라이브러리**(독립형 포털 → Agents 메뉴) 또는 **Security Store** (https://securitystore.microsoft.com) 를 통해 찾을 수 있습니다.
- **에이전트 ID:** 에이전트를 설정하려면 **에이전트 ID(agent identity)**를 할당해야 합니다. 전용 **Microsoft Entra Agent ID**를 사용하거나(MS built 에이전트 기준) 기존 사용자 계정에서 상속받을 수 있습니다.
- **감독 모델:** 에이전트는 사람의 감독 하에 동작하는 반자동 방식으로 운영됩니다.

참고: [에이전트 개요](https://learn.microsoft.com/security-copilot/agents-overview) · [에이전트 검색](https://learn.microsoft.com/security-copilot/discover-agents) · [에이전트 설정 및 관리](https://learn.microsoft.com/security-copilot/agents-manage)

---

## 2. 제품군별 에이전트

### Microsoft Entra 에이전트

| 에이전트 | 상태 | 요약 |
| --- | --- | --- |
| **Conditional Access Optimization Agent** | GA | 테넌트의 조건부 액세스 정책을 Microsoft 모범 사례 및 제로 트러스트 원칙과 비교 분석해 개선안을 권장. **24시간 주기 실행** 또는 수동 트리거. |
| **Identity Risk Management Agent** | Preview | 관리자가 Entra ID Protection의 위험 사용자를 조사하고 영향을 평가하며 보호 조치를 취하도록 지원. **24시간 주기 실행** 또는 수동 트리거나 연속 모니터링. |

참고: [Entra 에이전트](https://learn.microsoft.com/entra/security-copilot/entra-agents)

### Microsoft Intune 에이전트

| 에이전트 | 상태 | 요약 |
| --- | --- | --- |
| **Change Review Agent** | Preview | Intune 승인 요청의 영향을 평가하고 조치를 권장. |
| **Policy Configuration Agent** | GA | 문서 또는 자연어 지침을 기반으로 일치하는 Intune 설정 카탈로그 설정을 찾아 값을 권장하고 정책을 생성. |
| **Vulnerability Remediation Agent** | GA | Defender 데이터를 사용해 취약점을 모니터링하고, AI 기반 위험 평가로 개선 우선순위를 지정. |

참고: [Intune 에이전트](https://learn.microsoft.com/intune/agents/)

### Microsoft Purview 에이전트

Purview는 경보를 자동으로 분류·우선순위화하는 **분류(Triage) 에이전트**와, 민감 데이터를 탐지·평가하는 **포스처(Posture) 에이전트**를 제공합니다. 모두 SCU를 소비하며 Purview 임베디드 경험에서 제공됩니다.

| 에이전트 | 상태 | 요약 |
| --- | --- | --- |
| **Triage Agent in Data Loss Prevention (DLP)** | GA | 민감도·유출·정책 위험을 기준으로 DLP 경보를 평가해 네 가지 범주(All, Needs attention, Less Urgent, Not categorized)로 자동 분. 스케줄링 혹은 알림 단위 수동 실행. 자연어 **사용자 지정 지침**으로 우선순위 로직 정의 지원(DLP 전용, 문서 콘텐츠만 분석). |
| **Triage Agent in Insider Risk Management (IRM)** | GA | 사용자·파일·활동 위험을 기준으로 IRM 경고를 평가해 네 가지 범주(All, Needs attention, Less Urgent, Not categorized)로 자동 분류. 스케줄링 혹은 알림 단위 수동 실행. |
| **Posture Agent in Data Security Posture Management (DSPM)** | Preview | 키워드·필터 대신 **자연어 검색(LLM)**으로 M365 데이터 자산 전반의 민감 데이터를 발견하고 요약·위험 분석 제공. |
| **Posture Agent in Data Security Investigations (DSI)** | Preview | 테넌트 전반에서 노출된 자격 증명을 대규모로 탐지 — 자격 증명 스캔 자동화, AI 위험 평가 생성, **칸반(Kanban) 보드**로 검토·개선 작업 추적. |

참고: [Purview 에이전트 개요](https://learn.microsoft.com/purview/copilot-in-purview-agents-overview)

### Microsoft Defender 에이전트

| 에이전트 | 상태 | 요약 |
| --- | --- | --- |
| **Security Analyst Agent** | GA | Defender XDR, Sentinel Log Analytics, Sentinel Data Lake 데이터에 대해 즉시 사용 가능한 맞춤형 분석 수행. 이상 탐지·클러스터링·위험 점수화·예측 지원 — 코드/KQL 불필요. |
| **Threat Intelligence Briefing Agent** | GA | 위협 인텔리전스를 자율적으로 수집·종합해 일정에 따라 맞춤형 브리핑 제공. 설정한 주기 또는 수동 실행. |
| **Security Alert Triage Agent** | Preview | 이메일/협업 경고(GA), 클라우드 경고(preview), ID 경고(preview)를 포괄하는 대량의 경고에 대해, AI 기반의 동적 추론을 적용해 경고마다 오탐인지 실제 위협인지에 대해 판정.​ |
| **Threat Hunting Agent** | Preview | Advanced Hunting에서 대화형 AI 위협 헌팅 수행 — KQL 생성, 결과 해석, 인사이트 도출, 자연어로 전체 헌팅 세션을 지원. |
| **Dynamic Threat Detection Agent** | Preview | 경고·이벤트·이상 징후·위협 인텔리전스를 상시 상관 분석해 숨겨진 위협과 오탐을 발견하는 백엔드 서비스 에이전트. MITRE ATT&CK 매핑과 개선 단계를 포함하여 동적으로 경고 및 권장사항 전달. |

참고: [Defender XDR 에이전트](https://learn.microsoft.com/defender-xdr/security-copilot-agents-defender)

---

## 참고 링크

- [에이전트 개요](https://learn.microsoft.com/security-copilot/agents-overview)
- [에이전트 검색](https://learn.microsoft.com/security-copilot/discover-agents)
- [에이전트 설정 및 관리](https://learn.microsoft.com/security-copilot/agents-manage)
- [Defender XDR 에이전트](https://learn.microsoft.com/defender-xdr/security-copilot-agents-defender)
- [Entra 에이전트](https://learn.microsoft.com/entra/security-copilot/entra-agents)
- [Intune 에이전트](https://learn.microsoft.com/intune/agents/)
- [Purview 에이전트 개요](https://learn.microsoft.com/purview/copilot-in-purview-agents-overview)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [06 · 임베디드 경험](./06-embedded-experiences.md) | [08 · 사용량 모니터링](./08-usage-monitoring.md) |

[🏠 전체 목차로 돌아가기](./README.md)
