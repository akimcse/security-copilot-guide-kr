# 부록 — 문제 해결 · FAQ · 알려진 제한

[← 목차](./README.md) | [← Step 10: 핸즈온 랩](./10-handson-lab.md)

이 부록은 Security Copilot의 **지원 액세스 방법, 공식 알려진 제한, SCU 용량 동작, 기능별 제한**을 정리합니다. 온보딩 전후로 참고하세요.

---

## 1. 지원 액세스

**출처:** [지원 / 문제 해결](https://learn.microsoft.com/en-us/security-copilot/support)

| 방법 | 절차 | 요건 |
| --- | --- | --- |
| **Self-help 위젯** | Security Copilot → **Help(도움말)** 아이콘 → **Self help** 탭 → 질문 입력 → 관련 문서가 표시됨 | 모든 Security Copilot 사용자 |
| **지원 티켓(Contact support)** | Help 아이콘 → **Contact support** 탭 → 사례 정보 입력(Product 필드는 비워 둠) → 최대 **5개 파일 첨부** → **Contact me** | 최소 **Service Support Administrator** 또는 **Helpdesk Administrator** 역할 필요 |
| **지원 기록(Support history)** | Help → **Support history** 탭 | — |

---

## 2. 알려진 제한 (공식 — 책임 있는 AI 개요)

**출처:** [책임 있는 AI 개요](https://learn.microsoft.com/en-us/security-copilot/responsible-ai-overview-security-copilot)

| 제한 | 세부 내용 |
| --- | --- |
| **정확성·완전성** | 응답이 부정확·불완전하거나 오래되었을 수 있습니다. 출력 품질은 데이터 소스·통합·제공된 컨텍스트에 좌우됩니다. 중요한 출력에는 사람의 판단이 필요합니다. |
| **편향·비근거 콘텐츠** | LLM의 확률적 특성상 편향, 고정관념, 근거 없는 결론이 포함될 수 있습니다. 특히 민감·고영향 시나리오에서는 항상 비판적으로 검토하세요. |
| **도메인 범위** | 보안 작업에 최적화되어 있습니다. 이 도메인을 벗어난 프롬프트는 정확성·관련성이 낮은 응답을 낼 수 있습니다. |
| **용량 제약·지연** | SCU 사용 한도로 액세스가 제한(throttle)될 수 있습니다. 통합 처리와 안전성 검사로 지연(latency)이 발생할 수 있습니다. |
| **프리뷰 기능** | 일부 기능은 프리뷰 상태로, 사전 출시(prerelease) 기능으로 취급하고 조치 전 출력을 검토해야 합니다. **공개 프리뷰(Public Preview) 기능은 SCU로 과금됩니다.** |
| **토큰·컨텍스트 한도** | LLM 컨텍스트 창 한도 내에서 동작합니다. 긴 프롬프트나 장시간 세션은 응답이 잘리거나 최적화되지 않을 수 있습니다. |
| **데이터 소스 의존** | 응답 품질은 사용 가능한 데이터에 좌우됩니다. 관련 소스가 연결·활성화·최신 상태가 아니면 결과가 불완전할 수 있습니다. |
| **스크립트·코드 검증 필요** | 생성된 코드는 유효해 보여도 의미상 틀리거나 의도와 다를 수 있습니다. 검증·테스트 없이 프로덕션에 배포하지 마세요. **생성 코드의 시간 범위와 매개변수가 의도한 쿼리와 일치하는지 확인하세요.** |
| **권한 경계** | Security Copilot은 로그인한 사용자가 볼 권한이 있는 데이터만 액세스합니다. 기반 시스템의 권한 구성 오류는 결과 완전성에 영향을 줍니다. |
| **정부 클라우드 미지원** | GCC, GCC High, DoD, Microsoft Azure Government 환경용으로 설계되지 않았습니다. **상용 클라우드에서만** 사용합니다. |

---

## 3. SCU 용량 실무 동작

**출처:** [사용량 관리](https://learn.microsoft.com/en-us/security-copilot/manage-usage)

- SCU 한도에 **근접하면** 응답 영역에 경고가 표시됩니다(Standalone·임베디드 모두).
- **100% 용량을 초과하면** 오류 메시지가 표시되고, 다음 과금 정시(clock-hour)가 되거나 용량을 늘릴 때까지 추가 프롬프트가 수락되지 않습니다.
- SCU 변경은 반영에 약 **30분**이 걸립니다.
- 사용하지 않은 프로비저닝 SCU는 매 정시 종료 시 **만료되며 이월되지 않습니다.**

---

## 4. 기능별 알려진 제한

### 파일 업로드

**출처:** [파일 업로드](https://learn.microsoft.com/en-us/security-copilot/upload-file)

- 악성 파일의 평가 또는 **디토네이션(detonation)을 지원하지 않음**
- 파일당 최대 **3MB**, 총 업로드 **20MB**
- 지원 형식: **DOCX, MD, PDF, TXT**만
- 업로드한 파일은 **업로더 본인에게만** 표시되며 조직 내 다른 사용자와 공유되지 않음

### 프롬프트북

**출처:** [프롬프트북 빌드](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)

- 프롬프트 **순서를 바꾸면 출력에 영향** — 프롬프트북은 순차 실행됨
- AI 응답 변동성으로 인해 출력이 달라질 수 있음
- 실행 사용자의 **권한과 사용 가능한 데이터**에 따라 결과가 달라질 수 있음

### 고급 헌팅 (KQL 생성)

**출처:** [고급 헌팅 + KQL 생성](https://learn.microsoft.com/en-us/microsoft-365/security/defender/advanced-hunting-security-copilot)

- 복잡한 쿼리(다중 테이블 조인, 다단계 집계)는 지원되나 **정확성을 검증**해야 함
- Threat Hunting Agent와 Query assistant **모드를 전환하면 대화가 초기화**됨
- **Threat Hunting Agent는 프리뷰(preview)** 상태

### Purview 에이전트

**출처:** [Purview 에이전트](https://learn.microsoft.com/en-us/purview/copilot-in-purview-agents)

- Purview Triage Agent의 에이전트 인증은 **90일 후 만료**되며 수동 갱신이 필요함(전용 ID를 사용하는 Entra Agent ID 기반 에이전트와 달리)

### 세션 공유

**출처:** [역할 및 인증](https://learn.microsoft.com/en-us/security-copilot/authentication)

- **SouthAfricaNorth** 및 **UAENorth** 지역은 이메일을 통한 세션 공유를 **지원하지 않음**
- 공유된 세션은 선택한 일부가 아니라 **전체 세션 기록**을 포함함

---

## 빠른 체크리스트

온보딩 전 다음을 확인하세요.

- [ ] 조직이 **상용 클라우드**인지 확인(GCC/GCC High/DoD/Azure Government 미지원)
- [ ] 사용 가능한 **SCU 용량·오버리지** 확인 — 프리뷰 포함 모든 실행이 과금됨
- [ ] 지원 티켓이 필요할 경우 **Service Support Administrator 또는 Helpdesk Administrator** 역할 보유자 지정
- [ ] 파일 업로드 정책 확인(파일당 3MB·총 20MB·DOCX/MD/PDF/TXT, 악성 파일 디토네이션 미지원)
- [ ] 프리뷰 기능(Threat Hunting Agent 등) 사용 여부 및 검토 절차 결정
- [ ] 세션 공유 제한 지역(SouthAfricaNorth·UAENorth) 및 전체 기록 공유 정책 인지
- [ ] Purview 에이전트 사용 시 **90일 인증 갱신** 일정 관리

---

## 참고 링크

- [지원 / 문제 해결(Support)](https://learn.microsoft.com/en-us/security-copilot/support)
- [책임 있는 AI 개요(알려진 제한 포함)](https://learn.microsoft.com/en-us/security-copilot/responsible-ai-overview-security-copilot)
- [사용량 관리(Manage usage)](https://learn.microsoft.com/en-us/security-copilot/manage-usage)
- [파일 업로드(Upload file)](https://learn.microsoft.com/en-us/security-copilot/upload-file)
- [프롬프트북 빌드(Build promptbooks)](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)
- [고급 헌팅 + KQL 생성(Advanced hunting)](https://learn.microsoft.com/en-us/microsoft-365/security/defender/advanced-hunting-security-copilot)
- [역할 및 인증(Authentication)](https://learn.microsoft.com/en-us/security-copilot/authentication)

[← 목차](./README.md) | [← Step 10: 핸즈온 랩](./10-handson-lab.md)
