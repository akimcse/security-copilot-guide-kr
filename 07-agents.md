[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 8 / 12

# 07 · Security Copilot 에이전트

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 에이전트의 개념과 감독 모델, ID 요건
> - Defender/Entra/Intune/Purview 제품군별 에이전트
> - 각 에이전트의 GA/프리뷰 상태와 용도
>
> ⏱️ 예상 소요 **8분**　·　🎯 대상: 보안/IT 관리자, CISO

Security Copilot **에이전트(agent)**는 사람의 감독 하에 반자동으로 보안 업무를 수행하는 AI 워커입니다. 다른 모든 기능과 마찬가지로 에이전트도 **SCU(Security Compute Unit)를 소비**합니다.

## 에이전트 개요

- **검색·발견:** 에이전트는 **에이전트 라이브러리**(독립형 포털 → Agents 메뉴) 또는 **Security Store**(https://securitystore.microsoft.com)를 통해 찾을 수 있습니다.
- **에이전트 ID:** 에이전트를 설정하려면 **에이전트 ID(agent identity)**를 할당해야 합니다. 전용 **Microsoft Entra Agent ID**를 사용하거나 기존 사용자 계정에서 상속받을 수 있습니다.
- **감독 모델:** 에이전트는 사람의 감독 하에 동작하는 반자동 방식으로 운영됩니다.

![에이전트 라이브러리](./images/07-agent-library.png)
*독립형 포털의 에이전트 라이브러리에서 사용 가능한 에이전트를 검색·설정*

참고: [에이전트 개요](https://learn.microsoft.com/security-copilot/agents-overview) · [에이전트 검색](https://learn.microsoft.com/security-copilot/discover-agents) · [에이전트 설정 및 관리](https://learn.microsoft.com/security-copilot/agents-manage)

---

## 제품군별 에이전트

### Microsoft Defender 에이전트

| 에이전트 | 상태 | 요약 |
| --- | --- | --- |
| **Phishing Triage Agent** | GA(이메일/협업); 더 넓은 범위를 위해 Security Alert Triage Agent로 대체되는 중 | LLM 기반 분석으로 사용자가 신고한 피싱 이메일을 자율 분류(triage)·분류(classification). 투명한 근거를 제시하고 분석가 피드백에서 학습. Defender for Office 365 Plan 2 필요. |
| **Security Alert Triage Agent** | Preview(더 넓은 경보 범위) | Phishing Triage Agent를 확장 — 이메일/협업 경보(GA), 클라우드 경보(preview), ID 경보(preview)를 포괄. Defender XDR, Microsoft Threat Intelligence 플러그인 사용. |
| **Threat Intelligence Briefing Agent** | GA | 위협 인텔리전스를 자율적으로 수집·종합해 일정에 따라 맞춤형 브리핑 제공. Microsoft Threat Intelligence 플러그인 사용, EASM 플러그인은 선택. 설정한 주기 또는 수동 실행. |
| **Threat Hunting Agent** | Preview | Advanced Hunting에서 대화형 AI 위협 헌팅 수행 — KQL 생성, 결과 해석, 인사이트 도출, 자연어로 전체 헌팅 세션 안내. |
| **Security Analyst Agent** | GA | Defender XDR, Sentinel Log Analytics, Sentinel Data Lake 데이터에 대해 즉시 사용 가능하거나 맞춤형 분석 수행. 이상 탐지·클러스터링·위험 점수화·예측 지원 — 코드/KQL 불필요. |
| **Dynamic Threat Detection Agent** | (Defender에서 사용 가능으로 표기) | 경보·이벤트·이상 징후·위협 인텔리전스를 상시 상관 분석해 숨겨진 위협과 미탐(false negative)을 발견하는 백엔드 서비스. MITRE ATT&CK 매핑과 개선 단계를 포함한 동적 경보 생성. |

참고: [Defender XDR 에이전트](https://learn.microsoft.com/defender-xdr/security-copilot-agents-defender)

### Microsoft Entra 에이전트

| 에이전트 | 상태 | 요약 |
| --- | --- | --- |
| **Conditional Access Optimization Agent** | GA | 조건부 액세스 정책을 Microsoft 모범 사례 및 제로 트러스트 원칙과 비교 분석해 개선안을 권장. **24시간 주기** 또는 수동 실행. **Entra ID P1** 필요. 구성에는 Security Administrator, 사용에는 Conditional Access Administrator 필요. |
| **Identity Risk Management Agent** | Preview | 관리자가 Entra ID Protection의 위험 사용자를 조사하고 영향을 평가하며 보호 조치를 취하도록 지원. 24시간 주기, 수동, 또는 연속 실행. |

참고: [Entra 에이전트](https://learn.microsoft.com/entra/security-copilot/entra-agents)

### Microsoft Intune 에이전트

| 에이전트 | 요약 |
| --- | --- |
| **Change Review Agent** | Intune 승인 요청의 영향을 평가하고 조치를 권장. |
| **Device Offboarding Agent** | Intune과 Entra ID 전반에서 오래되었거나 정렬되지 않은 디바이스를 식별하고 실행 가능한 인사이트 제공; 오프보딩 전 관리자 승인 필요. |
| **Policy Configuration Agent** | 문서 또는 자연어 지시를 가져오면 일치하는 Intune 설정 카탈로그 설정을 찾아 값을 권장하고 정책을 생성. |
| **Vulnerability Remediation Agent** | Defender 데이터를 사용해 취약점을 모니터링하고, AI 기반 위험 평가로 개선 우선순위를 지정. |

참고: [Intune 에이전트](https://learn.microsoft.com/intune/agents/)

### Microsoft Purview 에이전트 *(preview)*

| 에이전트 | 요약 |
| --- | --- |
| **Triage Agent in Insider Risk Management (IRM)** | 사용자 위험·파일 위험·활동 위험을 기준으로 IRM 경보를 평가해 네 가지 분류 범주로 정렬. 일정 또는 경보별 실행. 에이전트 인증은 **90일마다 만료되어 갱신**해야 함. |
| **Alert Triage Agent in Data Loss Prevention (DLP)** | 민감도 위험·유출 위험·정책 위험을 기준으로 DLP 경보를 평가해 네 가지 분류 범주로 정렬. Preview. |

> [!NOTE]
> Purview 에이전트는 **preview** 상태입니다.

참고: [Purview 에이전트](https://learn.microsoft.com/purview/copilot-in-purview-agents)

---

## 참고 링크

- [에이전트 개요](https://learn.microsoft.com/security-copilot/agents-overview)
- [에이전트 검색](https://learn.microsoft.com/security-copilot/discover-agents)
- [에이전트 설정 및 관리](https://learn.microsoft.com/security-copilot/agents-manage)
- [Defender XDR 에이전트](https://learn.microsoft.com/defender-xdr/security-copilot-agents-defender)
- [Entra 에이전트](https://learn.microsoft.com/entra/security-copilot/entra-agents)
- [Intune 에이전트](https://learn.microsoft.com/intune/agents/)
- [Purview 에이전트](https://learn.microsoft.com/purview/copilot-in-purview-agents)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [06 · 임베디드 경험](./06-embedded-experiences.md) | [08 · 사용량 모니터링](./08-usage-monitoring.md) |

[🏠 전체 목차로 돌아가기](./README.md)
