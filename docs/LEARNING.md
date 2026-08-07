# B4-1 Learning Guide

이 문서는 현재 구현(`index.html`, `css/style.css`, `js/app.js`)을 기준으로 B4-1 평가 때 스스로 설명할 내용을 정리한다.

## 1. Semantic HTML — 왜 `div`만 쓰지 않는가

`header`, `nav`, `main`, `section`, `article`, `footer`는 화면 모양이 아니라 **내용의 역할**을 브라우저와 보조기술에 알려준다.

현재 구현 기준:

- `header`: 상단 전역 영역
- `nav`: About/Skills/Projects/Contact 이동 링크
- `main`: 페이지의 핵심 콘텐츠
- `section`: Hero/About/Skills/Projects/Contact처럼 주제가 분리되는 영역
- `article`: 각각 독립된 Skill/Project 카드
- `footer`: 저작권과 외부 링크

이미지에는 `alt`, 폼에는 `label for`와 입력 요소 `id`를 연결했다. 이는 화면을 보지 않고도 콘텐츠와 입력 목적을 이해할 수 있게 한다.

## 2. Flexbox와 Grid의 역할 차이

### Flexbox

한 방향의 정렬에 적합하다. 현재 `.nav`는 로고, 메뉴, 테마 버튼을 한 줄에 배치하므로 `display: flex`를 사용한다.

### Grid

행과 열을 함께 구성하는 반복 카드에 적합하다. `.project-grid`는 저장소 카드 수와 화면 폭이 바뀌므로 `repeat(auto-fit, minmax(...))`로 자동 재배치한다.

즉, **한 축 정렬 → Flexbox**, **반복되는 2차원 카드 → Grid**라는 선택 기준을 사용했다.

## 3. Mobile First — 왜 작은 화면부터 쓰는가

기본 CSS는 모바일을 기준으로 한다. 작은 화면에서는 메뉴 목록을 숨기고 햄버거 버튼을 보여준다.

- 기본: mobile
- `@media (min-width: 768px)`: tablet 이상, 메뉴를 가로 Flex로 전환
- `@media (min-width: 1024px)`: desktop, 섹션 간격과 2열 레이아웃 확대

작은 화면의 핵심 콘텐츠를 먼저 보장하고, 화면이 넓어질수록 배치를 확장하므로 규칙이 예측 가능하다.

## 4. 이벤트 → 상태 → DOM 업데이트

이 미션의 핵심 흐름은 다음이다.

```text
사용자 이벤트
    ↓
STATE 변경
    ↓
render 함수
    ↓
DOM 업데이트
```

### 예 1 — 다크 모드

1. 사용자가 `.theme-toggle`을 클릭한다.
2. `toggleTheme()`가 `STATE.theme`을 `light ↔ dark`로 바꾼다.
3. `localStorage`에 값을 저장한다.
4. `renderTheme()`이 `<html data-theme>`과 버튼 텍스트/ARIA 상태를 갱신한다.
5. CSS의 `[data-theme="dark"]` 변수가 적용되어 전체 화면이 바뀐다.

새로고침 후 `getSavedTheme()`가 저장값을 다시 읽으므로 상태가 유지된다.

### 예 2 — GitHub API

1. 페이지 시작 또는 Retry 클릭으로 `loadProjects()`가 실행된다.
2. 먼저 `STATE.projects.status = "loading"`으로 변경한다.
3. `renderProjects()`가 로딩 UI를 그린다.
4. `fetch`를 `await`하여 GitHub 응답을 기다린다.
5. 성공하면 `success + items`, 실패하면 `error + message` 상태로 바꾼다.
6. 다시 `renderProjects()`를 호출해 해당 상태 UI를 그린다.

빈 배열이면 success 안에서도 Empty UI로 분기한다. HTTP 403은 GitHub API rate limit 가능성을 사용자에게 별도 안내한다.

### 예 3 — Contact 폼

1. `input` 이벤트가 발생한다.
2. `STATE.form.values`와 `STATE.form.errors`가 갱신된다.
3. `renderFieldError()`가 입력값 근처의 에러 메시지와 `aria-invalid`를 갱신한다.
4. submit 때 전체 필드를 다시 검증한다.
5. 오류가 없으면 성공 메시지를 표시하고 데모 폼 상태를 초기화한다.

## 5. `querySelector`와 `addEventListener`

`querySelector`/`querySelectorAll`은 DOM에서 조작할 요소를 찾는다. `addEventListener`는 HTML에 JavaScript 동작을 섞지 않고 이벤트를 연결한다.

```text
DOM 선택 → 이벤트 등록 → 이벤트 발생 → handler 실행 → 상태 변경/DOM 변경
```

inline `onclick`보다 이벤트 로직을 JS 파일에 모을 수 있고, 동일 요소에 여러 listener를 조합할 수 있어 역할 분리가 명확하다.

## 6. ES6+ 문법을 어디에 썼는가

- Arrow function: handler/render 함수
- Template literal: API URL, Project 카드 HTML
- Destructuring: `repo`와 `event.target`의 필요한 필드 추출
- `filter`: fork 저장소 제외
- `map`: 저장소 배열 → 카드 HTML 배열
- `forEach`: nav 링크 이벤트 등록, form 필드 검증

`map`은 원본 배열의 각 원소를 다른 형태로 **변환**하는 데 사용하고, `filter`는 조건에 맞는 원소만 **선택**한다.

## 7. `async/await` + `try/catch`

`loadProjects()`는 비동기 함수다.

```text
try
 ├─ await fetch(...)
 ├─ response.ok 확인
 ├─ await response.json()
 └─ success state
catch
 └─ error state
finally 대신 마지막 renderProjects()
```

네트워크 실패, HTTP 오류, JSON 처리 오류가 발생해도 전체 페이지가 중단되지 않고 Projects 섹션만 Error 상태로 전환된다.

## 8. 왜 `STATE` 객체를 따로 두었는가

상태가 여러 개의 독립 전역 변수로 흩어지면 어떤 값이 UI에 영향을 주는지 추적하기 어렵다. `STATE`는 현재 UI에 영향을 주는 값을 한곳에 모은다.

- `theme`
- `menuOpen`
- `projects.status/items/error`
- `form.values/errors/submitted`

React의 state처럼 자동 렌더링되지는 않지만, **상태를 바꾼 뒤 명시적으로 render 함수를 호출**하는 구조를 통해 상태 기반 UI 사고를 직접 연습한다.

## 9. Interaction 기준값

Mission에서 변경 가능하되 README에 적도록 한 값은 다음으로 고정했다.

- Header style change: scroll `60px`
- Scroll-to-top button: scroll `300px`
- IntersectionObserver threshold: `0.25`

## 10. Local 실행과 검증

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속 후 다음을 직접 확인한다.

1. 375px 모바일: hamburger open/close
2. 768px 전후: navigation layout 전환
3. 1024px 이상: desktop 2-column layout
4. Theme toggle 후 reload: dark/light 유지
5. 60px/300px 이상 scroll: header/top button 변화
6. Contact 빈 값/잘못된 email/정상 입력
7. Projects loading → success
8. 네트워크/API 실패 시 error + Retry, 데이터가 없을 때 empty UI

자동 정적 검사는 다음으로 실행한다.

```bash
python3 tests/static_check.py
```
