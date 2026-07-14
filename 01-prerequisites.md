[🏠 전체 목차](./README.md)　·　**Part 1 · 시작하기**　·　페이지 2 / 12

# 01 · 사전 준비 — 라이선스 · SCU · 역할/RBAC

> [!NOTE]
> **이 페이지에서 얻는 것**
> - E5/E7와 SCU 중 우리 조직에 맞는 온보딩 경로
> - SCU 프로비저닝 단계와 과금 방식
> - Copilot 소유자/기여자와 RBAC 3계층
>
> ⏱️ 예상 소요 **9분**　·　🎯 대상: 보안/IT 관리자, 도입 담당자

Security Copilot을 사용하려면**① 용량(SCU) 확보 → ② Azure/역할 요건 충족 → ③ 워크스페이스 및 데이터 지역 설정**이 필요합니다. 이 페이지는 온보딩 사전 준비를 정리합니다.

> [!IMPORTANT]
> **온보딩을 시작하기 전에 조직이 Microsoft 365 E5 또는 E7 라이선스를 보유했는지 반드시 먼저 확인하세요.** 따라야 할 단계와 용량 구매 필요 여부가 이 판단에 따라 완전히 달라집니다.
> 참고: [시작하기](https://learn.microsoft.com/security-copilot/get-started-security-copilot)

---

## 1. 고객 유형 (라이선스)

| 유형 | 온보딩 경로 |
| --- | --- |
| **Microsoft 365 E5 또는 E7 고객** | Microsoft가 테넌트를 온보딩하면 Security Copilot이 **자동 프로비저닝**됨. **기본 용량에 대해 별도 SCU 구매 불필요.** |
| **E5/E7 미보유 고객** | Security Compute Unit(SCU)을 **수동 프로비저닝**해야 사용 가능. |

참고: [SCU와 용량](https://learn.microsoft.com/security-copilot/security-compute-units-capacity)

## 2. SCU 프로비저닝 — 최소 요건과 과금
<img width="1228" height="584" alt="image" src="https://github.com/user-attachments/assets/77daa071-d7b6-4dd7-94e8-93ab1b07ae8a" />

- **최소:** 1 SCU / **최대:** 100 SCU 
- **탐색/도입 권장:** n SCU(조직 사용량에 따라 설정) + 오버리지(overage) 무제한 설정
- **과금 모델:** 프로비저닝된 SCU는 **1 SCU당 $4씩 시간당** 과금, 오버리지 SCU는 **1 SCU당 $6씩 사용량 만큼**(소수점 첫째 자리) 과금
- 프로비저닝된 SCU는 **매 정시(clock-hour)마다 갱신**되며(예: 9:00–10:00), 사용하지 않은 SCU는 시간 종료 시 **만료되어 이월되지 않음**
- 용량 조정은 약 **30분 이내** 반영

**기능 단계별 SCU 과금 여부**

| 단계 | 과금 |
| --- | --- |
| 정식 출시(GA) | 예 |
| 공개 프리뷰(Public Preview) | 예 |
| 비공개 프리뷰(Private Preview) | 아니오 |

> [!WARNING]
> **용량이 생성되는 즉시 과금이 시작됩니다.** SCU가 환경에 연결되었는지 여부와 무관합니다.

참고: [수동 온보딩](https://learn.microsoft.com/security-copilot/manual-onboarding)

## 3. 프로비저닝 단계 (E5/E7 미보유 고객)

### 옵션 1 (권장): Security Copilot 포털에서 프로비저닝

1. https://securitycopilot.microsoft.com 로그인 → **Get started** 선택
2. **워크스페이스(Workspace)** 설정 (이름, 명명 규칙)
3. **보안 용량(Security capacity)** 설정: Azure 구독, 리소스 그룹, 용량 이름, 프롬프트 평가 위치(AU/EU/UK/US 또는 "anywhere"), SCU 수, 오버리지 단위
<!--
5. **데이터 공유(data sharing)** 옵션 선택
6. 약관 동의
7. Microsoft 365 서비스 데이터 액세스 구성 (선택)
8. **역할(roles)** 검토·구성 (소유자 역할, 기여자 그룹)
-->
4. 완료 → Azure 리소스 배포에 수 분 소요

### 옵션 2: Azure 포털에서 프로비저닝

1. Azure 포털 로그인 → "Microsoft Security compute capacities" 검색
2. 리소스 그룹 선택 → 플랜: **Microsoft Security Copilot** → **Create**
3. 구독, 리소스 그룹, 용량 이름, 위치, SCU 수, 오버리지 입력
4. 약관 동의 → **Review + Create** → **Create**
5. **Finish setup in the Security Copilot portal** → 워크스페이스 선택하여 리소스 연결

> [!NOTE]
> **지역(region) 설정 3가지 구분**
> Security Copilot에서 다뤄지는 지역 관련 값은 세 가지이며, 성격이 서로 다릅니다.
> - **데이터 저장 위치(Data storage location)**: Customer Data가 저장되는 곳으로, 워크스페이스 생성 시 선택할 수 있습니다.
> - **프롬프트 평가 위치(Prompt evaluation location)**: 프롬프트가 추론·처리되는 위치로, Security capacity 생성 시 선택할 수 있습니다.
> - **용량 리전(Capacity region)**: SCU 컴퓨트 리소스의 실제 Azure 리전으로, **프롬프트 평가 위치에 따라 자동으로 결정**됩니다.

참고: [수동 온보딩](https://learn.microsoft.com/security-copilot/manual-onboarding)

## 4. 프로비저닝 요건

- SCU 구매(비-E5/E7)에는 **Azure 구독**이 필요합니다.
- 구독/리소스 그룹의 **Azure Contributor 또는 Owner** 역할이 필요합니다.
- 온보딩 대상 테넌트에서 **Security Administrator 이상** 역할이 필요합니다.

참고: [수동 온보딩](https://learn.microsoft.com/security-copilot/manual-onboarding)

## 5. 역할 및 권한 (RBAC 3계층)

Security Copilot의 권한은 **세 계층이 겹쳐(stack)** 작동합니다.

### 계층 1: Security Copilot 플랫폼 역할

플랫폼 고유의 두 역할입니다.
| 기능 | Owner | Contributor |
| --- | --- | --- |
| 세션 만들기 | 예 | 예 |
| 개인 사용자 지정 플러그인 관리 | 예 | 기본값 아니요 |
| Contributor가 개인 사용자 지정 플러그인을 관리할 수 있도록 허용 | 예 | 아니요 |
| Contributor가 테넌트용 사용자 지정 플러그인을 게시하도록 허용 | 예 | 아니요 |
| 테넌트용 사전 설치된 플러그인의 가용성 변경 | 예 | 아니요 |
| 파일 업로드 | 예 | 기본값 예 |
| 업로드 파일 사용 관리 | 예 | 아니요 |
| 프롬프트북 실행 | 예 | 예 |
| 개인 프롬프트북 관리 | 예 | 예 |
| 테넌트에서 프롬프트북 공유 | 예 | 예 |
| 데이터 공유 및 피드백 옵션 업데이트 | 예 | 아니요 |
| 용량 관리 | 예 | 아니요 |
| 사용량 보기 dashboard | 예 | 아니요 |
| 언어 선택 | 예 | 예 |

> [!IMPORTANT]
> 실수로 인한 잠금(lockout)을 방지하기 위해 Security Copilot은 **항상 최소 2명의 owner**를 강제하며, 이 두 owner는 제거할 수 없습니다.

<img width="2252" height="1026" alt="image" src="https://github.com/user-attachments/assets/dcf7d062-12a1-4e2d-9af8-6361eb8ec768" />

- 할당 방법: Security Copilot 포털 메뉴 → **Role assignment → Add members** → Add members → owner 또는 contributor 선택하여 부여

### 계층 2: Entra / Purview 역할 (Owner 자동 상속)

다음 역할은 **Owner 액세스를 자동 상속**합니다.

- **Microsoft Entra 역할:** 청구 관리자, Entra 컴플라이언스 관리자, 전역 관리자, Intune 관리자, 보안 관리자(Security Administrator)
- **Microsoft Purview 역할:** Purview 컴플라이언스 관리자, Purview 데이터 거버넌스 관리자, Purview 조직 관리(Organization Management)

### 계층 3: Azure RBAC (SCU/용량 관리 제어)

- 구독/리소스 그룹의 **Azure Contributor 또는 Owner** → SCU 프로비저닝·변경에 필요.

> [!NOTE]
> **Security Copilot 자체는 기반 보안 데이터에 대한 액세스를 부여하지 않습니다.** Contributor라도 플러그인을 통해 데이터에 접근하려면 해당 서비스 역할이 별도로 필요합니다(예: Sentinel 데이터는 Microsoft Sentinel Reader, Intune 데이터는 Endpoint Security Manager, Defender XDR 데이터는 적절한 Defender XDR 역할).

### Contributor 역할 할당 옵션

| 옵션 | 장점 | 유의점 |
| --- | --- | --- |
| **권장 Microsoft 보안 역할** (신규 인스턴스 기본값) | 빠르고 안전 — 이미 보안 데이터 액세스가 있는 사용자에게 부여 | 전부 아니면 전무(all-or-nothing) 그룹 |
| **모두(Everyone)** | 프로비저닝 단순(레거시 기본값) | 보안 데이터 액세스가 없는 사용자에게 혼란을 주어 기존에 쓰던 곳은 유지되지만 제거하면 영구적으로 되돌릴 수 없음 |
| **커스텀(Custom)** | 완전한 제어 | 관리 복잡도 증가 |

> [!TIP]
> Security Copilot 기여자 권한은 **이미 보안 역할을 보유한 사용자에게만 자동으로 부여**하는 '권장 보안 역할' 방식을 기본값으로 사용하시고, 조직 전체에 부여하는 'Everyone'은 한 번 해제하면 다시 설정할 수 없으므로 신중히 검토하시되, 특정 사용자·그룹을 세밀하게 지정해야 하는 경우에는 'Custom' 방식을 권장드립니다.

참고: [역할 및 인증](https://learn.microsoft.com/security-copilot/authentication)

---

## 사전 준비 체크리스트

- [ ] 조직의 Microsoft 365 E5/E7 라이선스 보유 여부 확인
- [ ] (비-E5/E7) Azure 구독 및 Contributor/Owner 역할 확보
- [ ] 온보딩 대상 테넌트에서 Security Administrator 이상 역할 확보
- [ ] SCU 수 결정
- [ ] 워크스페이스 이름 및 프롬프트 평가 위치 결정("anywhere" 권장)
- [ ] Owner 2명 이상 지정, Contributor 할당 방식 결정

---

## 참고 링크

- [시작하기 / 온보딩](https://learn.microsoft.com/security-copilot/get-started-security-copilot)
- [수동 온보딩(비-E5/E7)](https://learn.microsoft.com/security-copilot/manual-onboarding)
- [SCU와 용량](https://learn.microsoft.com/security-copilot/security-compute-units-capacity)
- [역할 및 인증](https://learn.microsoft.com/security-copilot/authentication)
- [개인정보 및 데이터 보안](https://learn.microsoft.com/security-copilot/privacy-data-security)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [00 · 개요](./00-overview.md) | [02 · 핵심 개념](./02-concepts.md) |

[🏠 전체 목차로 돌아가기](./README.md)
