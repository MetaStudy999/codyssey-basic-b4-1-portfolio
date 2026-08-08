# B4-1 평가 모범 답변

B4-1 **「나를 소개하는 웹페이지 처음부터 만들기」** 평가에서 설명해야 할 15개 문항을 현재 구현(`index.html`, `css/style.css`, `js/app.js`)과 `docs/LEARNING.md`, 실제 런타임 증빙을 기준으로 정리한 답변 문서입니다.

> 답변 원칙: **무엇을 구현했는지 → 왜 그렇게 설계했는지 → 코드 흐름이 어떻게 이어지는지 → 실제로 무엇을 확인했는지** 순서로 설명합니다. 실제 런타임에서 재현하지 않은 항목은 재현했다고 말하지 않습니다.

## 빠른 답변 전략

평가에서는 각 질문에 먼저 **핵심 결론 1~2문장**으로 답하고, 평가자가 추가로 물으면 함수명·CSS 선택자·증빙을 근거로 확장 설명합니다.

---

# 1. 기능 및 동작 확인

## Q1. 브라우저 창 크기를 줄였을 때 레이아웃이 모바일에 맞게 변경되는가?

### 모범 답변

네. 이 프로젝트는 **Mobile First(모바일 우선)** 방식으로 작성했습니다. 기본 CSS를 작은 화면 기준으로 두고, `768px`과 `1024px` 이상에서 `@media (min-width: ...)` 규칙으로 레이아웃을 확장합니다.

모바일에서는 네비게이션 메뉴를 기본적으로 숨기고 햄버거 버튼을 표시하며, 화면이 넓어지면 일반 네비게이션으로 전환합니다. Projects와 Skills 카드도 Grid를 사용해 화면 폭에 따라 자동으로 재배치됩니다.

실제 증빙으로 `mobile.png`, `responsive-768.png`, `responsive-1024.png`, `desktop.png`을 준비했습니다.

### 핵심 근거

- 기본 CSS: mobile 기준
- `768px`: tablet 이상 레이아웃 확장
- `1024px`: desktop 레이아웃 확장
- `.project-grid`, `.skill-grid`: 반응형 Grid

### 한 문장 요약

> 작은 화면을 기본값으로 설계하고 `min-width` 브레이크포인트에서 점진적으로 확장했기 때문에 모바일·태블릿·데스크톱에서 자연스럽게 대응합니다.

---

## Q2. 테마 토글 버튼 클릭 시 다크/라이트 모드가 전환되고, 새로고침 후에도 유지되는가?

### 모범 답변

네. 테마는 `STATE.theme`에 현재 상태를 저장하고, 사용자가 버튼을 클릭하면 `toggleTheme()`이 `light`와 `dark`를 전환합니다. 그 값을 `saveTheme()`에서 `localStorage`에 저장하고, `renderTheme()`이 `<html data-theme>` 속성과 버튼의 텍스트·ARIA 상태를 갱신합니다.

페이지를 새로 열거나 새로고침하면 `getSavedTheme()`가 `localStorage` 값을 읽어 `STATE.theme`을 복원하기 때문에 선택한 테마가 유지됩니다. CSS에서는 `[data-theme="dark"]`에 별도의 색상 변수를 정의해 전체 UI를 전환합니다.

### 흐름

```text
Theme 버튼 클릭
→ toggleTheme()
→ STATE.theme 변경
→ localStorage 저장
→ renderTheme()
→ <html data-theme> 변경
→ CSS 변수 변경
→ 화면 테마 변경
```

### 한 문장 요약

> 테마 값을 상태와 `localStorage`에 함께 관리하여 즉시 화면을 바꾸고 새로고침 후에도 동일한 선택을 복원합니다.

---

## Q3. 햄버거 메뉴, 스크롤 애니메이션, 맨 위로 가기 버튼 등이 정상 동작하는가?

### 모범 답변

햄버거 메뉴와 맨 위로 가기 버튼은 실제 브라우저에서 동작을 확인했습니다. 햄버거 버튼은 `toggleMenu()`에서 `STATE.menuOpen`을 변경하고 `renderMenu()`가 `.active` 클래스와 `aria-expanded`를 갱신합니다.

네비게이션 링크는 `smoothScrollTo()`에서 `scrollIntoView({ behavior: "smooth" })`를 사용해 대상 섹션으로 이동합니다. Scroll Top 버튼은 `handleScroll()`이 현재 `window.scrollY`를 확인해 기준값 이상에서 표시하고, 클릭 시 `window.scrollTo({ top: 0, behavior: "smooth" })`를 실행합니다.

스크롤 reveal은 `IntersectionObserver`를 사용하고 threshold를 `0.25`로 설정했습니다. 다만 현재 증빙에서는 Smooth Scroll의 보간 과정과 IntersectionObserver의 정확한 진입 시점을 별도 계측하지 않았으므로 그 부분은 코드 구현과 관찰 결과를 구분해서 설명합니다.

### 핵심 근거

- 햄버거: `toggleMenu()` → `renderMenu()`
- 네비게이션: `smoothScrollTo()`
- Scroll Top 표시: `handleScroll()`
- Scroll Top 이동: `window.scrollTo(...)`
- Reveal: `setupScrollObserver()`

### 한 문장 요약

> 모든 인터랙션은 이벤트 리스너로 연결되어 있고, 햄버거와 Scroll Top은 실제 동작을 확인했으며 스크롤 애니메이션은 구현 코드와 관찰 결과를 근거로 설명합니다.

---

## Q4. GitHub API에서 데이터를 불러와 화면에 표시되고, 로딩/에러/빈 상태가 구분되는가?

### 모범 답변

네, 코드에서는 **Loading / Success / Error / Empty** 상태를 각각 분리했습니다. `loadProjects()`가 시작되면 먼저 `STATE.projects.status = "loading"`으로 설정하고 `renderProjects()`가 로딩 UI를 표시합니다.

`fetch()`가 성공하면 JSON 데이터를 받은 뒤 fork 저장소를 `filter()`로 제외하고 최대 6개를 선택해 `STATE.projects.items`에 저장합니다. 이후 `status = "success"`로 바꾸면 `map(projectCardTemplate)`을 사용해 카드 UI를 생성합니다.

응답이 실패하면 `catch`에서 `status = "error"`와 오류 메시지를 저장하고 Retry 버튼을 표시합니다. 성공했지만 배열이 비어 있으면 Empty 메시지를 표시합니다. HTTP `403`은 GitHub API 요청 한도에 대한 별도 메시지로 처리합니다.

현재 실제 런타임 증빙은 **Success 카드 렌더링까지 확인**했고, Error + Retry와 Empty 상태는 코드 구현은 확인했지만 실제 실패/빈 응답 상황을 아직 독립적으로 재현하지 않았습니다.

### 상태 흐름

```text
loadProjects()
→ loading
→ fetch()
   ├─ 성공 + 데이터 있음 → success → 카드 렌더링
   ├─ 성공 + 데이터 없음 → success + [] → Empty UI
   └─ 실패 → catch → error → Error UI + Retry
```

### 한 문장 요약

> API 상태를 하나의 `projects` 상태 객체로 관리해 Loading·Success·Error·Empty를 명시적으로 분기하고, 상태가 바뀔 때 `renderProjects()`가 화면을 다시 그리도록 구성했습니다.

---

## Q5. 필수 입력값 누락, 이메일 형식 오류 시 즉각적인 피드백이 표시되는가?

### 모범 답변

네. 이름, 이메일, 메시지는 모두 필수 입력값이며 `input` 이벤트가 발생할 때 `updateFormField()`가 현재 값을 `STATE.form.values`에 반영하고 `validateField()`로 즉시 검증합니다.

빈 값이면 `필수 입력값입니다.`를 반환하고, 이메일은 정규식을 이용해 형식을 추가 검증합니다. 검증 결과는 `STATE.form.errors`에 저장되고 `renderFieldError()`가 입력 필드 바로 아래의 에러 메시지와 `aria-invalid`를 갱신합니다.

Submit 시에는 `validateForm()`으로 전체 필드를 다시 검사하고, 오류가 있으면 첫 오류 필드에 포커스를 이동합니다. 정상 입력이면 성공 메시지를 표시하고 폼을 초기화합니다.

### 한 문장 요약

> 입력 이벤트마다 상태를 갱신하고 즉시 유효성을 검사한 뒤, 에러 상태를 해당 필드 주변 UI에 바로 반영하도록 구성했습니다.

---

# 2. 파일 분리 및 웹 표준 설계

## Q6. HTML, CSS, JavaScript를 왜 각각의 파일로 분리했는가?

### 모범 답변

세 파일의 **책임을 분리하기 위해서**입니다.

- `index.html`: 콘텐츠의 의미와 구조
- `css/style.css`: 레이아웃, 색상, 반응형, 시각적 상태
- `js/app.js`: 이벤트 처리, 상태 변경, API 호출, DOM 업데이트

한 파일에 모두 작성하면 구조·스타일·동작이 서로 얽혀 수정 범위가 커지고 디버깅도 어려워집니다. 역할을 나누면 변경 이유와 영향 범위가 명확해지고 유지보수성이 높아집니다.

### 한 문장 요약

> HTML은 구조, CSS는 표현, JavaScript는 동작이라는 책임 분리를 통해 코드의 가독성·재사용성·유지보수성을 높였습니다.

---

## Q7. 시맨틱 태그를 사용한 이유와 선택 기준은 무엇인가?

### 모범 답변

시맨틱 태그는 단순히 화면을 나누는 것이 아니라 **콘텐츠의 역할과 의미를 브라우저와 보조기술에 전달**하기 위해 사용했습니다.

현재 구현에서는 `header`는 전역 상단 영역, `nav`는 주요 이동 링크, `main`은 핵심 콘텐츠, `section`은 주제별 영역, `article`은 독립적인 카드 콘텐츠, `footer`는 페이지 하단 정보로 사용했습니다.

이 구조는 코드만 읽어도 문서의 의미를 파악하기 쉽고 접근성에도 도움이 됩니다. 이미지에는 `alt`, 폼에는 `label for`와 입력 요소 `id`를 연결해 콘텐츠와 입력 목적을 명확하게 했습니다.

### 한 문장 요약

> 태그의 모양이 아니라 콘텐츠의 역할을 기준으로 선택해 문서 구조, 접근성, 유지보수성을 함께 개선했습니다.

---

## Q8. CSS 변수를 사용한 이유와 이점은 무엇인가?

### 모범 답변

색상, 간격, 폰트, radius 같은 반복 값을 `:root`의 CSS 변수로 관리했습니다. 이렇게 하면 동일한 값을 여러 선택자에 직접 반복하지 않고 하나의 디자인 토큰처럼 재사용할 수 있습니다.

특히 다크 모드는 `[data-theme="dark"]`에서 같은 변수 이름의 값만 변경합니다. 컴포넌트별 스타일을 다시 작성하지 않아도 전체 테마가 일관되게 바뀌기 때문에 중복을 줄이고 유지보수성을 높일 수 있습니다.

### 장점

1. 반복 값의 중앙 관리
2. 디자인 일관성 유지
3. 테마 전환 구현 단순화
4. 변경 시 수정 범위 최소화

### 한 문장 요약

> CSS 변수는 반복되는 디자인 값을 중앙에서 관리해 일관성을 높이고, 다크 모드처럼 전체 테마를 적은 코드로 전환할 수 있게 합니다.

---

## Q9. `onclick` 대신 `addEventListener`를 사용한 이유는 무엇인가?

### 모범 답변

`onclick`을 HTML에 직접 작성하면 마크업과 JavaScript 동작이 섞입니다. 반면 `addEventListener`를 사용하면 이벤트 로직을 JavaScript 파일에 모아 **구조와 동작의 책임을 분리**할 수 있습니다.

또한 `addEventListener`는 한 요소에 여러 이벤트 리스너를 등록할 수 있고, 이벤트 등록·해제와 유지보수가 더 명확합니다. 현재 프로젝트에서는 click, input, submit, scroll 이벤트를 모두 `addEventListener`로 연결했습니다.

### 한 문장 요약

> `addEventListener`를 사용하면 HTML과 동작을 분리하고 여러 이벤트를 유연하게 관리할 수 있어 확장성과 유지보수성이 더 좋습니다.

---

# 3. JavaScript 흐름 및 레이아웃 설명

## Q10. 이벤트 → 상태 변경 → 화면 업데이트 흐름을 하나의 기능으로 설명해 보라.

### 모범 답변 — 다크 모드 예시

다크 모드를 예로 들면 사용자가 테마 버튼을 클릭하는 것이 **이벤트**입니다. 이벤트 리스너가 `toggleTheme()`을 실행하고, 이 함수가 `STATE.theme`을 변경하는 것이 **상태 변경**입니다.

그 다음 `saveTheme()`이 상태를 `localStorage`에 저장하고, `renderTheme()`이 `<html data-theme>`와 버튼 상태를 갱신합니다. 이 단계가 **DOM 업데이트**입니다. 마지막으로 CSS의 `[data-theme="dark"]` 변수가 적용되면서 실제 화면이 변경됩니다.

```text
click
→ toggleTheme()
→ STATE.theme 변경
→ saveTheme()
→ renderTheme()
→ DOM/CSS 변경
```

이 구조를 GitHub API와 Contact 폼에도 동일하게 적용했습니다.

### 한 문장 요약

> 이벤트 핸들러가 상태를 먼저 바꾸고, 렌더 함수가 그 상태를 DOM에 반영하도록 분리한 것이 이 프로젝트의 핵심 흐름입니다.

---

## Q11. `async/await`와 `try/catch`로 API 성공과 실패를 어떻게 처리했는가?

### 모범 답변

`loadProjects()`를 `async` 함수로 만들고 GitHub API 요청에 `await fetch()`를 사용했습니다. 응답을 받은 뒤 `response.ok`를 검사해 HTTP 오류를 성공 흐름과 분리합니다.

정상 응답이면 `await response.json()`으로 데이터를 읽고 프로젝트 목록을 가공한 뒤 `STATE.projects.status = "success"`로 변경합니다. 네트워크 오류, HTTP 오류, JSON 처리 오류 등이 발생하면 모두 `catch`로 이동해 `status = "error"`와 사용자용 오류 메시지를 저장합니다.

마지막에는 `renderProjects()`가 현재 상태에 맞는 UI를 그리기 때문에 전체 페이지가 중단되지 않고 Projects 영역만 안전하게 실패 상태로 전환됩니다.

### 한 문장 요약

> `try`에서는 정상 비동기 흐름을 순서대로 처리하고, 실패는 `catch`에서 Error 상태로 전환해 화면에 안전하게 표현합니다.

---

## Q12. `map`, `filter`를 사용해 GitHub 데이터를 카드 UI로 변환하는 과정을 설명해 보라.

### 모범 답변

GitHub API가 반환한 저장소 배열을 그대로 출력하지 않고 먼저 `filter()`로 fork 저장소를 제외합니다. 이후 필요한 개수만 선택해 `STATE.projects.items`에 저장합니다.

렌더링할 때는 `items.map(projectCardTemplate)`을 사용해 각 저장소 객체를 하나의 HTML 카드 문자열로 **변환**합니다. 그 결과 배열을 `join("")`으로 하나의 문자열로 합친 뒤 `innerHTML`에 넣습니다.

즉 `filter`는 **조건에 맞는 데이터만 선택**, `map`은 **선택된 데이터를 다른 형태의 값으로 변환**하는 역할입니다.

### 흐름

```text
GitHub repository array
→ filter(): fork 제외
→ slice(): 표시 개수 제한
→ map(): repo 객체 → project card HTML
→ join("")
→ DOM 렌더링
```

### 한 문장 요약

> `filter`로 표시 대상을 선택하고 `map`으로 각 저장소 객체를 카드 HTML로 변환해 데이터 처리와 UI 생성을 명확하게 분리했습니다.

---

## Q13. Flexbox와 Grid를 어디에 적용했고, 왜 그렇게 선택했는가?

### 모범 답변

Flexbox는 **한 방향의 정렬**이 중심인 영역에 사용했습니다. 예를 들어 `.nav`는 로고, 메뉴, 테마 버튼을 한 줄에서 정렬해야 하므로 Flexbox가 적합합니다. 버튼 그룹이나 메타 정보처럼 한 축을 중심으로 배치하는 곳도 Flexbox를 사용했습니다.

Grid는 **여러 카드가 행과 열로 반복되는 영역**에 사용했습니다. `.project-grid`와 `.skill-grid`는 카드 수와 화면 폭에 따라 여러 열이 자동으로 재배치되어야 하므로 `repeat(auto-fit, minmax(...))` 형태의 Grid가 더 적합합니다.

### 선택 기준

- 한 축 중심 정렬 → Flexbox
- 행·열 기반 반복 레이아웃 → Grid

### 한 문장 요약

> 네비게이션처럼 한 방향 정렬은 Flexbox, 반복 카드처럼 2차원 배치는 Grid를 사용해 레이아웃 목적에 맞는 도구를 선택했습니다.

---

# 4. 상태 관리 및 반응형 설계

## Q14. `STATE` 객체를 따로 만든 이유는 무엇이며 단순 변수로 처리하면 안 되는가?

### 모범 답변

단순 변수로도 기능 자체는 만들 수 있지만, 상태가 늘어나면 `theme`, 메뉴 열림 여부, API 상태, 폼 값과 오류가 서로 다른 전역 변수로 흩어져 **현재 UI 상태를 추적하기 어려워집니다.**

그래서 화면에 영향을 주는 값을 `STATE` 객체 하나에 모았습니다.

- `STATE.theme`
- `STATE.menuOpen`
- `STATE.projects.status/items/error`
- `STATE.form.values/errors/submitted`

이렇게 하면 상태의 위치와 책임이 명확하고, 상태 변경 후 어떤 render 함수를 호출해야 하는지도 추적하기 쉽습니다. React처럼 자동 렌더링되는 state는 아니지만, 상태 기반 UI 설계의 기본 원리를 직접 구현해 보는 구조입니다.

### 한 문장 요약

> 관련 상태를 하나의 객체로 구조화하면 값이 흩어지는 것을 막고 상태 변경과 UI 렌더링의 관계를 추적하기 쉬워집니다.

---

## Q15. 반응형 디자인에서 Mobile First 방식을 사용한 이유는 무엇인가?

### 모범 답변

작은 화면에서는 공간이 제한되기 때문에 먼저 **핵심 콘텐츠와 필수 인터랙션을 우선순위대로 배치**해야 합니다. 이를 기본 CSS로 확정한 뒤 화면이 넓어질 때 `min-width` 미디어 쿼리로 기능과 레이아웃을 확장하면 규칙이 단순하고 예측 가능합니다.

이 프로젝트는 모바일에서 메뉴를 접어 햄버거로 제공하고, `768px`, `1024px` 이상에서 네비게이션과 2열 레이아웃을 확장합니다. 즉 작은 화면에서 정상 동작하는 최소 구조를 먼저 보장하고 더 큰 화면에 공간을 추가하는 방식입니다.

### 한 문장 요약

> 작은 화면의 핵심 경험을 먼저 보장한 뒤 큰 화면에서 점진적으로 확장하면 CSS 규칙과 콘텐츠 우선순위가 더 명확해집니다.

---

# 평가 직전 1분 암기표

| 주제 | 핵심어 |
|---|---|
| 반응형 | Mobile First → 768px → 1024px |
| Theme | click → `STATE.theme` → `localStorage` → `renderTheme()` |
| Menu | `STATE.menuOpen` → `renderMenu()` |
| Scroll | `handleScroll()`, `scrollIntoView()`, `IntersectionObserver` |
| Form | input → values/errors → `renderFieldError()` |
| API | loading → fetch → success/error/empty → `renderProjects()` |
| Semantic HTML | 역할과 의미, 접근성 |
| CSS variables | 중앙 관리, 일관성, theme |
| Events | `addEventListener`, 역할 분리 |
| API async | `async/await`, `try/catch`, `response.ok` |
| Arrays | `filter` = 선택, `map` = 변환, `forEach` = 순회 |
| Layout | 한 축 = Flexbox, 2차원 카드 = Grid |
| STATE | 상태 중앙화, 추적성 |

## 평가 시 주의할 표현

현재 구현과 증빙 기준으로 다음은 정확하게 구분해서 답합니다.

- GitHub API **Success 렌더링**: 실제 런타임 증빙 있음
- GitHub API **Error + Retry**: 코드 구현 확인, 실제 실패 시나리오 미재현
- GitHub API **Empty**: 코드 구현 확인, 실제 빈 응답 시나리오 미재현
- Smooth Scroll: 대상 이동과 구현 확인, 보간 과정 정밀 계측은 하지 않음
- IntersectionObserver: 구현 확인, 정확한 `0.25` 진입 시점 정밀 계측은 하지 않음

과장해서 모두 실제 재현했다고 답하기보다 **구현 확인과 런타임 확인의 경계를 정확히 설명하는 것이 평가 신뢰도를 높입니다.**

## 관련 문서

- 평가 추적표: [`EVALUATION-MAPPING.md`](EVALUATION-MAPPING.md)
- 학습 설명: [`LEARNING.md`](LEARNING.md)
- 런타임 검증: [`RUNTIME-EVIDENCE.md`](RUNTIME-EVIDENCE.md)
- 실제 증빙: [`evidence/README.md`](evidence/README.md)
