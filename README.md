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
- GitHub Pages (배포 Gate에서 활성화)

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
│   ├── LEARNING.md
│   └── RUNTIME-EVIDENCE.md
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

예정 URL:

```text
https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/
```

현재 Workcell에서 GitHub Pages Repository Settings 변경 API가 제공되지 않으므로, 최종 배포 Gate에서 `Settings → Pages → Deploy from a branch → main / (root)` 활성화 후 실제 외부 URL을 검증해야 합니다. 검증 전에는 배포를 PASS로 표시하지 않습니다.

## 브라우저 Runtime 체크

1. 375px: hamburger open/close
2. 768px 전후: mobile navigation → desktop navigation 전환
3. 1024px 이상: desktop spacing / 2-column layout
4. Dark toggle → reload 후 theme 유지
5. 60px scroll → header style 변경
6. 300px scroll → top button 표시 및 동작
7. Contact 빈 값 / 잘못된 email / 정상값 validation
8. Projects loading → success
9. API 실패 → error + Retry, empty data → empty UI
10. Console error 없음

실제 결과는 [`docs/RUNTIME-EVIDENCE.md`](docs/RUNTIME-EVIDENCE.md)에 기록합니다.

## 제출 Evidence

Mission 필수 screenshot은 실제 브라우저 검증 후 아래 경로로 추가합니다.

| Evidence | 경로 | 현재 상태 |
|---|---|---|
| Desktop | `docs/evidence/desktop.png` | `NEEDS-RUNTIME` |
| Mobile | `docs/evidence/mobile.png` | `NEEDS-RUNTIME` |
| Dark mode | `docs/evidence/dark.png` | `NEEDS-RUNTIME` |
| Projects/API | `docs/evidence/projects.png` | `NEEDS-RUNTIME` |

스크린샷이 실제로 생성되기 전에는 임의 이미지를 증빙으로 대체하지 않습니다.

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
