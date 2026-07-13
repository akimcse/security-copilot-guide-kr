[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 5 / 12

# 04 · 프롬프트북 (기본 제공 + 커스텀)

> [!NOTE]
> **이 페이지에서 얻는 것**
> - 프롬프트북이 무엇이고 언제 쓰는지
> - 기본 제공 프롬프트북 8종과 각각의 용도
> - 나만의 커스텀 프롬프트북 만드는 법
>
> ⏱️ 예상 소요 **8분**　·　🎯 대상: SOC 분석가, 위협 인텔 분석가

프롬프트북(Promptbook)은 여러 프롬프트를 **순차적으로 실행**하여 특정 보안 작업을 자동화하는 기능입니다. 이 페이지에서는 프롬프트북의 개념, 접근 방법, 기본 제공 프롬프트북 8종, 그리고 커스텀 프롬프트북 생성 절차를 정리합니다.

---

## 1. 프롬프트북이란

프롬프트북은 **순서대로 실행되는 일련의 프롬프트**로, 각 프롬프트가 이전 응답을 기반으로 이어지면서 특정 보안 관련 작업을 완수합니다. 보안 **플레이북(playbook)/템플릿**에 비유할 수 있습니다.

- 라이브러리에서 **기본 제공(prebuilt)** 프롬프트북을 실행할 수 있습니다.
- 사용자가 직접 **생성·공유(custom)** 할 수도 있습니다.

## 2. 접근 방법

| 경로 | 방법 |
| --- | --- |
| **활성 세션 내에서** | 프롬프트바 우측 ✨ **Prompts** 아이콘 클릭 → **Promptbooks** 검색하여 실행 |
| **홈 메뉴에서** | 좌측 메뉴의 **Promptbooks** → 프롬프트북 라이브러리(Promptbook library)에서 선택하여 실행 |

<img width="2291" height="1141" alt="image" src="https://github.com/user-attachments/assets/333ef102-ccc1-448c-9439-78a07e426ef8" />

*프롬프트북 라이브러리 — 기본 제공 및 커스텀 프롬프트북을 탐색하고 실행합니다.*

## 3. 기본 제공 프롬프트북 (GA)

기본 제공 프롬프트북은 각각 **특정 플러그인 또는 입력**을 필요로 합니다.

| 프롬프트북 이름 | 필요 입력 | 필요 플러그인 | 용도 |
| --- | --- | --- | --- |
| **Check impact of an external threat article**(외부 위협 기사 영향 확인) | 외부 위협 인텔리전스 기사 URL | Microsoft Threat Intelligence | 기사에서 IoC 추출, 관련 MDTI 기사 검색 |
| **Incident investigation**(Sentinel 버전) | Sentinel 인시던트 ID | Microsoft Sentinel | 인시던트 조사 결과로 경영진용 리포트 생성 |
| **Incident investigation**(Defender XDR 버전) | Defender 인시던트 ID | Microsoft Defender XDR | 인시던트 조사 결과로 경영진용 리포트 생성 |
| **Microsoft User analysis**(사용자 분석) | UPN + 기간 | Entra, Intune, Defender, Purview | Microsoft 365 제품 전반에서 사용자와 디바이스 분석 |
| **Suspicious script analysis**(의심스러운 스크립트 분석) | 스크립트 스니펫(PowerShell/cmd) | (기본) | 스크립트 설명, 악성 행위 식별, 대응 단계 권장 |
| **Threat actor profile**(위협 행위자 프로파일) | 위협 행위자 이름 | Microsoft Threat Intelligence | 위협 행위자의 TTP·IoC·완화책 경영진 요약 |
| **Threat Intelligence 360 report based on MDTI article** | MDTI 기사 이름 | Microsoft Threat Intelligence | 기사 내 위협에 조직이 영향받는지 상세 리포트 |
| **Vulnerability impact assessment**(취약점 영향 평가) | CVE 번호 또는 취약점 이름 | (기본) | 악용 이력, 위협 행위자 활용, 완화책 요약 |

## 4. 커스텀 프롬프트북 생성 (7단계)

자주 사용하는 프롬프트 묶을 재사용 가능한 프롬프트북으로 만들 수 있습니다.
<img width="2292" height="1233" alt="image" src="https://github.com/user-attachments/assets/5b7e2c8f-759b-4540-bedc-1b78e5a73c7d" />

1. 재사용하려는 프롬프트를 세션에서 실행합니다.
2. 프롬프트 옆의 체크박스를 선택 → **Create promptbook**을 클릭합니다.
3. 이름(name), 태그(tags), 설명(description)을 입력합니다.
4. 재사용 가능한 입력 매개변수를 `<ParameterName>` 구문(각괄호, 공백 없음)으로 정의합니다.
5. 필요 시 개별 프롬프트에 **Continue on failure**(실패 시 계속) 옵션을 설정합니다(프리뷰 토글).
6. 가시성(visibility)을 설정합니다: **Just me**(나만) 또는 **Anyone in my organization**(조직 내 모든 사용자).
7. **Create**를 선택한 뒤 테스트하고 공유합니다.

> [!TIP]
> `<ParameterName>` 매개변수는 각괄호로 감싸고 공백을 넣지 않습니다. 프롬프트북 실행 시 이 매개변수 값을 입력받아 여러 프롬프트에 걸쳐 재사용할 수 있습니다.

---

## 참고 링크

- [프롬프트북 사용](https://learn.microsoft.com/en-us/security-copilot/using-promptbooks)
- [프롬프트북 만들기](https://learn.microsoft.com/en-us/security-copilot/build-promptbooks)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [03 · Standalone 포털](./03-standalone-portal.md) | [05 · 플러그인](./05-plugins.md) |

[🏠 전체 목차로 돌아가기](./README.md)
