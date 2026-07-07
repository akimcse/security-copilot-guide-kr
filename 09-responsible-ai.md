# Step 9 — 책임 있는 AI · 개인정보 · 데이터 보안

[← 목차](./README.md) | [← Step 8: 사용량 모니터링](./08-usage-monitoring.md) | [다음: Step 10 핸즈온 랩 →](./10-handson-lab.md)

Security Copilot을 조직에 도입할 때 보안팀이 가장 자주 받는 질문은 "우리 데이터가 어떻게 처리되고, 모델 학습에 쓰이는가?"입니다. 이 페이지는 데이터 처리, 데이터 레지던시, 보존, 보안 안전장치, 그리고 Microsoft의 책임 있는 AI 원칙을 정리합니다.

---

## 1. 고객 데이터 vs 시스템 생성 로그

Security Copilot이 다루는 데이터는 두 종류로 구분됩니다.

| 고객 데이터(Customer Data) | 시스템 생성 로그(System-Generated Logs) |
| --- | --- |
| 사용자가 제출한 프롬프트 | 계정 정보(테넌트 ID, 라이선스) |
| 응답 생성을 위해 검색된 정보 | 사용량 데이터 |
| 응답(Responses) | 성능 정보 |
| 고정(pinned) 항목의 콘텐츠 | 내부 시스템 동작 |
| 업로드된 파일 | |

## 2. 데이터 학습 미사용 — 핵심 보장

> **"Data isn't shared with OpenAI or used to train the Azure OpenAI foundational model."**
> (데이터는 OpenAI와 공유되지 않으며, Azure OpenAI 파운데이션 모델 학습에 사용되지 않습니다.)

구체적으로:

- Azure OpenAI LLM은 **Security Copilot 고객 데이터로 학습되지 않습니다.**
- 보안 특화 컨텍스트는 모델 학습이 아니라 **추론 시점(inference time)의 플러그인과 그라운딩(grounding)**을 통해 추가됩니다.
- **세션(Session) 데이터는 고객 데이터로 취급되며 파운데이션 모델 학습에 사용되지 않습니다**(공식 용어집의 "Session" 정의 기준).

> [!IMPORTANT]
> **보안팀 관점:** 고객 데이터는 파운데이션 모델 학습에 사용되지 않습니다. 조직 고유의 컨텍스트는 모델에 학습되는 것이 아니라, **추론 시점의 그라운딩으로만** 응답에 반영됩니다. 즉, 조직의 프롬프트·데이터가 다른 테넌트에 노출되거나 공용 모델에 흡수되지 않습니다.

## 3. 데이터 공유 옵션

소유자가 구성할 수 있는 데이터 공유 옵션은 3종입니다. 모두 **기본적으로 켜져(on) 있으며, 소유자가 언제든 변경**할 수 있습니다.

| 옵션 | 허용 내용 |
| --- | --- |
| **인적 검토를 통한 제품 성능 검증을 위한 데이터 수집 허용** | 품질·사용성·기능 격차 측정 및 플러그인/에이전트 개선을 위한 프롬프트·응답의 인적 검토. 공유된 데이터는 Microsoft가 **90일 보존**. |
| **Microsoft 보안 AI 모델 구축·검증을 위한 데이터 수집 허용** | Azure OpenAI 또는 Microsoft 자체 모델 위에 구축되는 보안 특화 모델 개발에 활용. **OpenAI와의 공유나 파운데이션 모델 학습은 포함하지 않음.** |
| **Security Copilot의 Microsoft 365 서비스 데이터 액세스 허용** | Microsoft Purview가 처리하는 DLP, IRM, 커뮤니케이션 컴플라이언스, eDiscovery, 정보 보호(Information Protection), DSPM 데이터에 대한 쿼리 활성화. |

## 4. 데이터 저장 및 레지던시

- 데이터는 **워크스페이스 생성 시 선택한 geo**에 저장되며 **생성 후 변경 불가**합니다.
- 저장 가능 geo: **ANZ, EU, UK, US.**
- 상용 SKU를 사용하는 **GCC 고객**의 데이터는 Azure Public Cloud의 **US geo**에 저장됩니다.
- **업로드된 파일**은 항상 테넌트의 **홈 geo(home geo)**에 저장됩니다.
- 데이터 공유에 옵트인한 경우, 고객 데이터(업로드 파일 제외)는 Microsoft 검토 목적으로 선택한 워크스페이스 geo 외부에 저장될 수 있습니다.
- **프롬프트 평가(prompt evaluation)**는 저장과 별개이며 AU/EU/UK/US 또는 "anywhere"(권장)로 설정할 수 있습니다.

## 5. 데이터 보존

| 시나리오 | 보존 |
| --- | --- |
| 활성 구독(Active subscription) | 구독이 활성인 동안 세션 데이터 보존 |
| 전체 용량 삭제 | 180일 이내 데이터 삭제 |
| 세션 365일 초과 비활성 | 365일 후 세션 데이터 삭제 |
| 고객 삭제 요청 | 요청 후 30일 이내 삭제 |
| Microsoft에 옵트인 공유된 데이터 | 삭제 전 90일 보존 |
| 공유 옵트아웃(Opt-out) | 이전에 공유된 모든 데이터 30일 이내 삭제 |

## 6. 보안 안전장치

- 고객 데이터는 **전송 중(in transit)·저장 시(at rest) 모두 암호화**됩니다.
- 기본적으로 어떤 인적 사용자도 데이터베이스에 접근할 수 없으며, 상승된 접근은 승인받은 Microsoft 직원의 승인이 필요합니다.
- **콘텐츠 필터**(신경망 분류): 증오(hate), 성적(sexual), 폭력(violence), 자해(self-harm), 탈옥(jailbreak), 지적 재산권 침해(IP violation), 간접 프롬프트 인젝션(indirect prompt injection).
- 위험 식별·완화를 위한 **레드팀(Red team) 테스트** 수행.
- **ISO 42001** 인증.

## 7. Microsoft의 6대 책임 있는 AI 원칙

Security Copilot은 다음 원칙에 부합하도록 구축되었습니다.

1. **공정성(Fairness)**
2. **신뢰성 및 안전(Reliability and safety)**
3. **개인정보 및 보안(Privacy and security)**
4. **포용성(Inclusiveness)**
5. **투명성(Transparency)**
6. **책임성(Accountability)**

참고: [Microsoft AI 원칙](https://www.microsoft.com/ai/principles-and-approach/)

---

## 참고 링크

- [개인정보 및 데이터 보안](https://learn.microsoft.com/en-us/security-copilot/privacy-data-security)
- [Security Copilot 책임 있는 AI 개요](https://learn.microsoft.com/en-us/security-copilot/responsible-ai-overview-security-copilot)
- [Security Copilot 책임 있는 AI FAQ](https://learn.microsoft.com/en-us/security-copilot/rai-faqs-security-copilot)

[← 목차](./README.md) | [← Step 8: 사용량 모니터링](./08-usage-monitoring.md) | [다음: Step 10 핸즈온 랩 →](./10-handson-lab.md)
