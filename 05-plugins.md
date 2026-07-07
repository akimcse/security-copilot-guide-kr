[🏠 전체 목차](./README.md)　·　**Part 2 · 핵심 기능**　·　페이지 6 / 12

# 05 · 플러그인 (Microsoft · 비-Microsoft · 커스텀)

> [!NOTE]
> **이 페이지에서 얻는 것**
> - Microsoft·비-Microsoft·커스텀 플러그인의 차이
> - 플러그인이 응답 품질에 미치는 영향(그라운딩)
> - 조직 단위 접근 제어와 관리 방법
>
> ⏱️ 예상 소요 **7분**　·　🎯 대상: 보안/IT 관리자

플러그인(plugin)은 API를 통해 Microsoft·비-Microsoft 서비스 및 공개 웹의 리소스에 접근하게 하여 Security Copilot의 기능을 확장하는 **관련 도구(tool)의 모음**입니다. 플러그인은 응답에 컨텍스트를 추가하며, 에이전트의 경우 LLM 범위를 넘어 에이전트가 수행할 수 있는 작업을 확장합니다.

---

## 1. 플러그인 유형 (4종)

| 유형 | 설명 |
| --- | --- |
| **Microsoft 플러그인** | 사전 설치됨. 온-비할프(on-behalf-of) 인증 사용. 조직 라이선스에 따라 자동으로 제공. 데이터 접근에는 적절한 서비스 역할 필요. |
| **비-Microsoft(3rd-party) 플러그인** | 사전 설치됨. 일부는 사용자별 인증 설정 필요. 예시는 아래 참조. |
| **공개 웹(Public web)** | 공개 웹 검색에 대한 접근을 제공. |
| **커스텀(Custom) 플러그인** | 소유자/기여자가 생성. `.yaml` 또는 `.json` 파일로 업로드(Security Copilot 플러그인 또는 OpenAI 플러그인 형식). 개인 사용자 또는 조직 전체 범위로 설정 가능. |

## 2. 주요 Microsoft 플러그인

- Microsoft Defender XDR
- Microsoft Sentinel
- Microsoft Entra
- Microsoft Intune
- Microsoft Purview
- Microsoft Threat Intelligence (MDTI)
- Natural Language to KQL (고급 헌팅용, NL2KQL)
- Microsoft Defender for Cloud
- Azure Firewall
- Microsoft Defender External Attack Surface Management (EASM)

> [!IMPORTANT]
> 플러그인으로 Security Copilot과 통합되는 제품은 **별도로 구매해야** 합니다.

## 3. 비-Microsoft 플러그인

비-Microsoft(3rd-party) 플러그인은 **다수가 사전 설치**되어 제공되며, 위협 인텔리전스·네트워크·엔드포인트·IT 서비스 관리 등 다양한 영역을 아우릅니다. 전체 목록은 공식 문서를 참고하세요. 대표 예시는 다음과 같습니다.

- AbuseIPDB
- GreyNoise
- Shodan
- ServiceNow (SIR)
- Splunk
- Tanium

> [!NOTE]
> 위 목록은 대표 예시일 뿐이며, 이 외에도 Censys, Darktrace, Netskope, ReversingLabs, UrlScan 등 다수의 비-Microsoft 플러그인이 존재합니다. 일부 플러그인은 사용자별 인증 설정이 필요합니다.

## 4. 커스텀 플러그인

- **파일 형식:** `.yaml` 또는 `.json`
- **지원 형식:** Security Copilot 플러그인 형식 또는 OpenAI 플러그인 형식
- **생성 주체:** 소유자(owner) 또는 기여자(contributor)
- **범위:** 개인 사용자 또는 조직 전체

## 5. 플러그인 관리

![플러그인 관리](./images/05-manage-plugins.png)
*플러그인 관리 — 사전 설치 플러그인 접근 제어, 커스텀 플러그인 추가 권한, 에이전트용 자동 활성화를 구성합니다.*

- **사전 설치 플러그인 접근 제어:** 소유자는 사전 설치된 플러그인을 **"Owners only"(소유자 전용)** 로 제한할 수 있으며, 이 설정은 **standalone과 embedded 경험 모두**의 전체 사용자에게 **즉시 적용**됩니다.
- **커스텀 플러그인 관리:** 소유자가 커스텀 플러그인을 추가할 수 있는 대상을 설정합니다(소유자만, 또는 기여자도 포함).
- **에이전트용 자동 활성화:** Security Copilot 에이전트를 설정하면 필요한 플러그인이 **해당 에이전트에만** 자동 활성화되며, 조직 전체의 플러그인 상태는 변경하지 않습니다.

---

## 참고 링크

- [플러그인 개요](https://learn.microsoft.com/en-us/security-copilot/plugin-overview)
- [플러그인 관리](https://learn.microsoft.com/en-us/security-copilot/manage-plugins)
- [비-Microsoft 플러그인](https://learn.microsoft.com/en-us/security-copilot/plugin-other)

---

### 다음 읽을거리

| ◀ 이전 | ▶ 다음 |
| :-- | --: |
| [04 · 프롬프트북](./04-promptbooks.md) | [06 · 임베디드 경험](./06-embedded-experiences.md) |

[🏠 전체 목차로 돌아가기](./README.md)
