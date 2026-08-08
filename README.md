# B4-1 Portfolio — 나를 소개하는 웹페이지 처음부터 만들기

순수 **HTML / CSS / JavaScript**만으로 구현한 반응형 포트폴리오입니다. 프레임워크 없이 브라우저의 기본 동작을 직접 다루며 **사용자 이벤트 → 상태 변경 → DOM 업데이트** 흐름을 확인하는 것이 핵심입니다.

## 주요 기능

- Semantic HTML: Hero, About, Skills, Projects, Contact, Footer
- Mobile-first responsive layout: `768px`, `1024px` breakpoints
- Mobile hamburger navigation
- Smooth scroll, scroll-top button, header scroll state
- Light/Dark theme + `localStorage` persistence
- `IntersectionObserver` scroll reveal
- Contact form required/email validation + inline error/success state
- GitHub REST API repository cards
- GitHub API Loading / Success / Error + Retry / Empty 상태 UI
- HTTP `403` rate-limit 전용 안내

## 기술 스택

- HTML5
- CSS3: custom properties, Flexbox, Grid, media query
- JavaScript ES6+: DOM API, event listener, destructuring, template literal, `filter` / `map` / `forEach`, `fetch`, `async/await`, `try/catch`, `localStorage`
- GitHub REST API
- GitHub Pages (`main / (root)` 배포)

> React, Vue, jQuery, Bootstrap, Tailwind CSS 등 외부 프레임워크/라이브러리를 사용하지 않습니다.

## 프로젝트 구조

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── profile.svg
├── tests/
│   └── static_check.py
├── docs/
│   ├── EVALUATION-MAPPING.md
│   ├── LEARNING.md
│   ├── RUNTIME-EVIDENCE.md
│   └── evidence/
│       ├── README.md
│       └── *.png
├── MISSION-WORK-PACKET.md
├── b4-1-mission.pdf
├── b4-1-mission.md
└── b4-1-evaluation.md
```

## 로컬 실행

별도 패키지 설치가 필요하지 않습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:8000
```

VS Code를 사용하는 경우 Mission 원문대로 Live Server 확장으로 열어도 됩니다.

## 자동 정적 검증

```bash
python3 tests/static_check.py
```

이 검사는 파일 구조, semantic markup, CSS 변수/Flex/Grid/breakpoint, JS event/state/API 패턴, 금지된 framework/inline handler 등을 확인합니다. 실제 브라우저 렌더링과 GitHub Pages 접속을 대신하지 않습니다.

## Interaction 기준값

Mission에서 변경 가능하되 README에 명시하도록 한 값을 다음으로 고정했습니다.

| 항목 | 값 |
|---|---:|
| Header scroll style | `60px` |
| Scroll-to-top 표시 | `300px` |
| IntersectionObserver threshold | `0.25` |

## GitHub API

다음 endpoint를 인증 없이 호출합니다.

```text
https://api.github.com/users/MetaStudy999/repos
```

인증 없는 GitHub API는 rate limit이 있으므로 반복 새로고침을 피합니다. `403` 응답은 전체 페이지 오류로 번지지 않고 Projects 섹션의 Error UI + Retry로 처리합니다.

## GitHub Pages

**배포 URL:**

https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/

현재 GitHub Pages 상태를 확인한 결과 다음과 같이 배포되어 있습니다.

| 항목 | 상태 |
|---|---|
| Pages build | `built` |
| Source | `main / (root)` |
| Public | `true` |
| HTTPS enforced | `true` |

배포 설정 화면 증빙은 [`docs/evidence/README.md`](docs/evidence/README.md)의 **Developer Verification & Deployment** 항목에서 확인할 수 있습니다.

## 브라우저 Runtime 검증

현재 실제 브라우저/증빙 기준으로 다음 항목을 확인했습니다.

| 항목 | 상태 |
|---|---|
| 375px 모바일 레이아웃 및 hamburger | `PASS` |
| 768px / 1024px 반응형 레이아웃 | `PASS` |
| Dark mode + reload 후 설정 유지 | `PASS` |
| Scroll-top 표시 및 상단 이동 | `PASS` |
| Contact 빈 값 / 잘못된 email / 정상 제출 | `PASS` |
| GitHub API 실제 repository card 렌더링 | `PASS` |
| Console 오류/경고/Issues 없음 | `PASS` |
| GitHub Pages 배포 | `PASS` |
| Smooth Scroll 보간 동작 독립 계측 | `PARTIAL` |
| Header 60px 전환 시점 독립 계측 | `PARTIAL` |
| IntersectionObserver 0.25 진입 시점 독립 계측 | `PARTIAL` |
| API Error + Retry 실제 실패 재현 | `NOT-RUNTIME-VERIFIED` |
| API Empty 실제 빈 응답 재현 | `NOT-RUNTIME-VERIFIED` |

상세 판정은 [`docs/RUNTIME-EVIDENCE.md`](docs/RUNTIME-EVIDENCE.md)에 기록합니다.

**실제 PNG 증빙 인덱스:** [`docs/evidence/README.md`](docs/evidence/README.md)

## 평가 ↔ 코드 ↔ 증빙 매핑

평가문항을 구현 파일, 실제 PNG 증빙, 학습 설명 문서와 한 번에 대조할 수 있도록 [`docs/EVALUATION-MAPPING.md`](docs/EVALUATION-MAPPING.md)에 통합했습니다.

현재 평가 후보 문항 기준 판정은 다음과 같습니다.

| 상태 | 문항 수 |
|---|---:|
| `PASS` | 13 |
| `PARTIAL` | 2 |
| `FAIL` | 0 |

두 `PARTIAL`은 구현 결함이 아니라 **GitHub API Error + Retry / Empty의 실제 런타임 재현 공백**과 일부 스크롤 동작의 정밀 계측 경계를 반영합니다. 최종 제출 확인은 Evaluation Mapping 문서를 우선 진입점으로 사용합니다.

## 제출 Evidence

미션의 핵심 실행 화면을 실제 PNG 증빙으로 저장했습니다.

| Evidence | 경로 | 현재 상태 |
|---|---|---|
| Desktop | [`docs/evidence/desktop.png`](docs/evidence/desktop.png) | `PASS` |
| Mobile | [`docs/evidence/mobile.png`](docs/evidence/mobile.png) | `PASS` |
| Dark mode | [`docs/evidence/dark.png`](docs/evidence/dark.png) | `PASS` |
| Projects/API success | [`docs/evidence/projects.png`](docs/evidence/projects.png) | `PASS` |
| Contact validation | [`docs/evidence/README.md`](docs/evidence/README.md#4-contact-form-validation) | `PASS` |
| Responsive | [`docs/evidence/README.md`](docs/evidence/README.md#2-responsive-layout) | `PASS` |
| Console | [`docs/evidence/console-no-errors.png`](docs/evidence/console-no-errors.png) | `PASS` |
| GitHub Pages | [`docs/evidence/github-pages-settings.png`](docs/evidence/github-pages-settings.png) | `PASS` |

전체 15개 PNG 증빙은 [`docs/evidence/README.md`](docs/evidence/README.md)에서 목적별로 분류해 확인할 수 있습니다.

> API Error/Retry와 Empty 상태는 **코드 구현은 확인되었지만 실제 실패/빈 응답 런타임 재현 증빙은 아직 없습니다.** 구현 상태와 런타임 증빙 상태를 구분해 기록합니다.

## 학습 문서

구현 코드 기준 설명은 [`docs/LEARNING.md`](docs/LEARNING.md)에 정리되어 있습니다.

- Semantic HTML / accessibility
- Flexbox vs Grid
- Mobile-first
- event → state → DOM update
- `localStorage`
- `async/await` + API state
- `STATE` 객체를 둔 이유

## 미션 원문 / 평가 후보

- [B4-1 Mission Markdown](./b4-1-mission.md)
- [B4-1 Mission PDF](./b4-1-mission.pdf)
- [B4-1 Evaluation 후보](./b4-1-evaluation.md)

> `b4-1-evaluation.md`는 실질 내용은 있으나 frozen Control Tower Source Registry에서 공식 provenance를 확인하지 못해 Workcell에서는 `UNVERIFIED`로 기록합니다. Mission PDF를 최우선 기준으로 사용합니다.
