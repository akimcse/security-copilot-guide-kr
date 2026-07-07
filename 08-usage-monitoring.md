[🏠 전체 목차](./README.md)　·　**Part 3 · 운영과 거버넌스**　·　페이지 9 / 12

# 08 · 사용량 모니터링과 용량(SCU) 관리

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 사용량 대시보드에서 무엇을 볼 수 있는지
> - SCU가 소비·갱신·만료되는 방식
> - 한도 근접 시 동작과 용량 조정 방법
>
> ⏱️ 예상 소요 **6분**　·　🎯 대상: 보안/IT 관리자, 비용 담당

Security Copilot의 소비량은 **Security Compute Unit(SCU)** 단위로 측정됩니다. 이 페이지는 소유자가 사용량을 모니터링하고, 용량을 조정하며, 한도 근접 시 동작을 이해하는 방법을 정리합니다.

![사용량 모니터링 대시보드](./images/08-usage-dashboard.png)

*그림: 홈 메뉴 → Owner settings → Usage monitoring 대시보드. 세션별 SCU 소비량과 필터, Excel 내보내기, 용량 탭을 제공합니다.*

---

## 1. 접근 경로

**홈 메뉴 → Owner settings → Usage monitoring**

사용량 모니터링 대시보드는 소유자 설정(Owner settings) 아래에 있으며, Copilot 소유자만 조회할 수 있습니다.

## 2. 대시보드 표시 항목

대시보드는 **최근 90일 데이터**를 표시하며, 각 세션에 대해 다음 항목을 보여 줍니다.

| 항목 | 설명 |
| --- | --- |
| **Session ID** | 세션 식별자 |
| **Date** | 사용 일자 |
| **Units used** | 소비된 SCU 수 |
| **Initiated by** | 실행한 사용자 |
| **Category** | Prompt / Promptbook / Agent |
| **Type** | Manual(수동) / Automated(자동) |
| **Copilot experience** | standalone(독립형) / embedded(임베디드) / Azure Logic Apps |
| **Plugin** | 사용된 플러그인 |
| **Status** | 상태 |

**필터:** Copilot experience, Users, Plugins used, Type, Category, Date range로 필터링할 수 있습니다.

**Excel 내보내기:** 대시보드 데이터는 Excel로 내보낼 수 있습니다.

**용량 탭:** 상단의 용량(capacity) 탭을 통해 여러 용량 리소스 간을 전환하며 각각의 사용량을 확인할 수 있습니다.

참고: [사용량 관리](https://learn.microsoft.com/en-us/security-copilot/manage-usage)

## 3. 한도 근접 시 동작

- **경고 알림:** 사용량이 한도에 근접하면 독립형 및 임베디드 경험 모두에 경고 알림이 표시됩니다.
- **한도 초과:** 프로비저닝된 용량과 오버리지(overage) 용량의 **100%를 초과**하면 오류 메시지가 표시됩니다. 이 경우 **다음 정시(hour)까지 대기**하거나 **용량을 증설**해야 합니다.

> [!WARNING]
> 100% 초과 시 새 요청이 실패할 수 있습니다. 지속적으로 한도에 도달한다면 SCU를 늘리거나 오버리지 설정을 조정하세요.

## 4. SCU 갱신과 만료

- SCU는 **매 정시(clock-hour)마다 갱신**됩니다(예: 9:00–10:00).
- 사용하지 않은 SCU는 시간 종료 시 **만료되어 다음 시간으로 이월되지 않습니다.**
- 용량 변경은 약 **30분 이내**에 반영됩니다.

## 5. SCU 업데이트 방법

SCU 수는 두 경로로 변경할 수 있습니다.

- **Owner Settings → Security compute units → Change**
- **Usage 대시보드 → Change units**

> [!IMPORTANT]
> SCU를 변경하려면 **Azure 용량 소유자(owner) 또는 기여자(contributor)이면서 동시에 Security Copilot 소유자**여야 합니다. Azure RBAC와 Security Copilot 플랫폼 역할이 모두 필요합니다.

참고: [사용량 관리](https://learn.microsoft.com/en-us/security-copilot/manage-usage)

## 6. 과금 모델 (요약)

사전 준비(Step 1)에서 다룬 과금 모델을 요약하면 다음과 같습니다.

- **프로비저닝된 SCU:** **시간당(per hour)** 과금
- **오버리지(overage) SCU:** **정확한 사용량**(소수점 첫째 자리)으로 과금

**기능 단계별 과금 여부**

| 단계 | 과금 |
| --- | --- |
| 정식 출시(GA) | 예 |
| 공개 프리뷰(Public Preview) | 예 |
| 비공개 프리뷰(Private Preview) | 아니오 |

참고: [SCU와 용량](https://learn.microsoft.com/en-us/security-copilot/security-compute-units-capacity)

---

## 참고 링크

- [사용량 관리](https://learn.microsoft.com/en-us/security-copilot/manage-usage)
- [SCU와 용량](https://learn.microsoft.com/en-us/security-copilot/security-compute-units-capacity)

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [07 · 에이전트](./07-agents.md) | [09 · 책임 있는 AI](./09-responsible-ai.md) |

[🏠 전체 목차로 돌아가기](./README.md)
