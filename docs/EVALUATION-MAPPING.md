# B4-1 Evaluation Mapping

B4-1 **「나를 소개하는 웹페이지 처음부터 만들기」**의 평가문항을 현재 구현 코드, 학습 설명 문서, 실제 런타임 증빙과 연결한 최종 추적표입니다.

> 기준 우선순위: `b4-1-mission.pdf` / `b4-1-mission.md`를 미션 요구사항의 우선 기준으로 사용합니다. `b4-1-evaluation.md`는 현재 저장소의 평가 후보 문항으로 활용하되, 기존 Workcell 기록과 동일하게 공식 provenance가 확인되지 않은 문서라는 경계를 유지합니다.

## 판정 기준

| 상태 | 의미 |
|---|---|
| `PASS` | 코드 구현과 필요한 설명 또는 실제 런타임 증빙이 확인됨 |
| `PARTIAL` | 구현은 확인되지만 평가문항이 요구하는 런타임 상태 일부가 독립적으로 재현·증빙되지 않음 |
| `FAIL` | 요구사항 미구현 또는 명확한 결함 확인 |

## 전체 요약

| 평가 영역 | 문항 수 | PASS | PARTIAL | FAIL |
|---|---:|---:|---:|---:|
| 1. 기능 및 동작 확인 | 5 | 3 | 2 | 0 |
| 2. 파일 분리 및 웹 표준 설계 | 4 | 4 | 0 | 0 |
| 3. JavaScript 흐름 및 레이아웃 설명 | 4 | 4 | 0 | 0 |
| 4. 상태 관리 및 반응형 설계 | 2 | 2 | 0 | 0 |
| **합계** | **15** | **13** | **2** | **0** |

---

## 1. 기능 및 동작 확인

| No. | 평가문항 | 구현 근거 | 실제 증빙 | 설명/보조 문서 | 판정 |
|---:|---|---|---|---|---|
| 1 | 브라우저 크기에 따라 모바일 레이아웃으로 변경되는가? | `css/style.css`의 mobile-first 규칙, `768px` / `1024px` breakpoint | [`mobile.png`](evidence/mobile.png), [`responsive-768.png`](evidence/responsive-768.png), [`responsive-1024.png`](evidence/responsive-1024.png), [`desktop.png`](evidence/desktop.png) | [`LEARNING.md`](LEARNING.md) § Mobile First | `PASS` |
| 2 | 다크/라이트 전환 및 새로고침 후 설정 유지가 되는가? | `toggleTheme()`, `saveTheme()`, `getSavedTheme()`, `renderTheme()`, `localStorage` | [`dark.png`](evidence/dark.png) + 실제 reload 유지 관찰 | [`LEARNING.md`](LEARNING.md) § 이벤트 → 상태 → DOM 업데이트 | `PASS` |
| 3 | 햄버거 메뉴, 스크롤 애니메이션, 맨 위로 가기 등이 정상 동작하는가? | `toggleMenu()`, `smoothScrollTo()`, `handleScroll()`, `setupScrollObserver()`, Scroll Top listener | [`mobile-menu.png`](evidence/mobile-menu.png), [`mobile-scroll-top.png`](evidence/mobile-scroll-top.png) | [`RUNTIME-EVIDENCE.md`](RUNTIME-EVIDENCE.md) RT-06~RT-09 | `PARTIAL` |
| 4 | GitHub API 데이터를 표시하고 로딩/에러/빈 상태를 구분하는가? | `loadProjects()`, `renderProjects()`, loading/error/empty/success 분기, Retry listener | 성공: [`projects.png`](evidence/projects.png), [`mobile-projects.png`](evidence/mobile-projects.png) | [`RUNTIME-EVIDENCE.md`](RUNTIME-EVIDENCE.md) RT-13~RT-15 | `PARTIAL` |
| 5 | 필수값 누락 및 이메일 오류에 즉각적인 피드백이 표시되는가? | `validateField()`, `updateFormField()`, `validateForm()`, `renderFieldError()` | [`contact-empty.png`](evidence/contact-empty.png), [`contact-invalid-email.png`](evidence/contact-invalid-email.png), [`contact-success.png`](evidence/contact-success.png) | [`LEARNING.md`](LEARNING.md) § Contact 폼 | `PASS` |

### 기능 영역의 PARTIAL 경계

- **문항 3:** 햄버거 메뉴와 Scroll Top은 실제 동작 증빙이 있습니다. Smooth Scroll은 목적지 도달을 확인했고 코드도 `behavior: "smooth"`를 사용하지만, 보간 애니메이션 자체를 별도 계측하지 않았습니다. IntersectionObserver도 구현은 확인되지만 정확한 `threshold = 0.25` 진입 시점을 독립 계측하지 않았습니다.
- **문항 4:** GitHub API 성공 렌더링은 실제 증빙이 있습니다. Error + Retry와 Empty UI는 코드 구현이 확인되지만 실제 실패/빈 응답 시나리오를 아직 독립적으로 재현하지 않았습니다.

---

## 2. 파일 분리 및 웹 표준 설계

| No. | 평가문항 | 구현 근거 | 설명 근거 | 판정 |
|---:|---|---|---|---|
| 6 | HTML/CSS/JavaScript가 분리되어 있고 역할을 설명할 수 있는가? | `index.html`, `css/style.css`, `js/app.js`로 역할 분리 | [`README.md`](../README.md) 프로젝트 구조 및 [`LEARNING.md`](LEARNING.md) | `PASS` |
| 7 | `header`, `nav`, `main`, `section`, `footer` 등 시맨틱 태그의 선택 기준을 설명할 수 있는가? | `index.html`에 `header`, `nav`, `main`, `section`, `article`, `footer` 사용 | [`LEARNING.md`](LEARNING.md) § Semantic HTML | `PASS` |
| 8 | CSS 변수로 색상·폰트 등을 정의하고 이점을 설명할 수 있는가? | `css/style.css`의 `:root`와 `[data-theme="dark"]` 변수 | 테마/디자인 토큰이 한곳에서 변경되고 재사용되어 일관성·유지보수성이 향상됨 | `PASS` |
| 9 | inline `onclick` 대신 `addEventListener`를 사용한 이유를 비교 설명할 수 있는가? | `js/app.js`의 모든 이벤트 등록이 `addEventListener` 기반 | [`LEARNING.md`](LEARNING.md) § `querySelector`와 `addEventListener` | `PASS` |

---

## 3. JavaScript 흐름 및 레이아웃 설명

| No. | 평가문항 | 구현 근거 | 설명 근거 | 판정 |
|---:|---|---|---|---|
| 10 | 이벤트 → 상태 변경 → 화면 업데이트 흐름을 코드로 설명할 수 있는가? | `STATE` + `toggleTheme()/renderTheme()`, `loadProjects()/renderProjects()`, 폼 상태/렌더 함수 | [`LEARNING.md`](LEARNING.md) § 이벤트 → 상태 → DOM 업데이트 | `PASS` |
| 11 | `async/await`와 `try/catch`의 API 성공/실패 분기를 설명할 수 있는가? | `loadProjects()`의 `await fetch()`, `response.ok`, `catch`, 상태 변경 | [`LEARNING.md`](LEARNING.md) § `async/await` + `try/catch` | `PASS` |
| 12 | `map`, `filter` 등으로 GitHub 데이터를 카드 UI로 변환하는 과정을 설명할 수 있는가? | `.filter((repo) => !repo.fork)`, `items.map(projectCardTemplate).join("")` | [`LEARNING.md`](LEARNING.md) § ES6+ 문법 | `PASS` |
| 13 | Flexbox와 Grid 적용 위치 및 선택 이유를 비교 설명할 수 있는가? | `.nav`, `.hero-actions` 등 Flex / `.project-grid`, `.skill-grid` 등 Grid | [`LEARNING.md`](LEARNING.md) § Flexbox와 Grid | `PASS` |

---

## 4. 상태 관리 및 반응형 설계

| No. | 평가문항 | 구현 근거 | 설명 근거 | 판정 |
|---:|---|---|---|---|
| 14 | `STATE` 객체를 별도로 관리하는 이유와 단순 변수 대비 장점을 설명할 수 있는가? | `STATE.theme`, `STATE.menuOpen`, `STATE.projects`, `STATE.form` | [`LEARNING.md`](LEARNING.md) § 왜 `STATE` 객체를 따로 두었는가 | `PASS` |
| 15 | Mobile First 방식을 선택한 이유를 설명할 수 있는가? | 기본 CSS를 모바일 기준으로 작성하고 `min-width: 768px`, `1024px`에서 확장 | [`LEARNING.md`](LEARNING.md) § Mobile First | `PASS` |

---

## 평가 답변 준비

15개 평가문항에 대한 **질문별 모범 답변, 코드 흐름, 한 문장 요약, 평가 직전 암기표**는 [`EVALUATION-ANSWERS.md`](EVALUATION-ANSWERS.md)에 정리했습니다.

답변은 다음 순서로 말하는 것을 기본 구조로 합니다.

```text
무엇을 구현했는가
→ 왜 이 설계를 선택했는가
→ 어떤 함수/상태/DOM 흐름으로 동작하는가
→ 실제로 어디까지 검증했는가
```

## 증빙 진입점

평가 시 다음 순서로 확인하면 가장 빠릅니다.

1. **전체 평가 매핑:** 이 문서 `docs/EVALUATION-MAPPING.md`
2. **15문항 모범 답변:** [`docs/EVALUATION-ANSWERS.md`](EVALUATION-ANSWERS.md)
3. **실제 PNG 증빙 인덱스:** [`docs/evidence/README.md`](evidence/README.md)
4. **Runtime 상세 판정:** [`docs/RUNTIME-EVIDENCE.md`](RUNTIME-EVIDENCE.md)
5. **개념·코드 학습:** [`docs/LEARNING.md`](LEARNING.md)
6. **실제 배포 사이트:** https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/

## 최소 추가 검증

현재 B4-1에서 실제 런타임 공백을 줄이는 데 가장 가치가 높은 추가 확인은 다음 두 가지입니다.

| 우선순위 | 추가 검증 | 현재 상태 | 완료 시 효과 |
|---:|---|---|---|
| 1 | GitHub API Error + Retry 실제 재현 | `NOT-RUNTIME-VERIFIED` | 기능 평가문항 4의 Error/Retry 런타임 근거 확보 |
| 2 | GitHub API Empty 실제 재현 | `NOT-RUNTIME-VERIFIED` | 기능 평가문항 4의 Empty 런타임 근거 확보 |

다음 항목은 코드·README 기준값과 현재 관찰로 구현을 설명할 수 있으므로, **통과를 위해 별도의 정밀 계측을 우선하지 않습니다.**

- Header `60px` 전환 순간의 픽셀 단위 계측
- IntersectionObserver `threshold = 0.25` 진입 순간의 정밀 계측
- Smooth Scroll 애니메이션의 프레임/보간값 계측

## 제출 전 최종 체크

- [x] 반응형 Desktop / Mobile / 768px / 1024px 증빙
- [x] Dark Mode 증빙 및 reload 유지 관찰
- [x] Hamburger Menu 증빙
- [x] Scroll Top 증빙
- [x] Contact 필수값 / 이메일 오류 / 정상 제출 증빙
- [x] GitHub API Success 카드 렌더링 증빙
- [x] Console 무오류 증빙
- [x] GitHub Pages 배포 및 설정 증빙
- [x] 평가 설명 문서 `LEARNING.md`
- [x] 평가 ↔ 코드 ↔ 증빙 매핑 문서
- [x] 평가 15문항 모범 답변 문서
- [ ] GitHub API Error + Retry 실제 런타임 증빙
- [ ] GitHub API Empty 실제 런타임 증빙

## 현재 결론

- 평가 후보 문항 기준: **13 PASS / 2 PARTIAL / 0 FAIL**
- 구현 결함으로 확인된 blocker: **없음**
- 남은 핵심 runtime-only gap: **GitHub API Error + Retry / Empty 실제 재현**
- 최종 FULL PASS 표기는 위 런타임 공백을 보완한 뒤 확정하는 것을 원칙으로 합니다.
