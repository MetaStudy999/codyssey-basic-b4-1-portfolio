# B4-1 R01 — Evaluation Q&A Reference

## 1. HTML, CSS, JavaScript를 왜 분리했는가?

HTML은 문서 구조와 의미, CSS는 표현과 반응형 레이아웃, JavaScript는 이벤트·상태·DOM 갱신을 담당합니다. 책임을 분리하면 수정 범위가 명확하고 재사용·디버깅이 쉬워집니다.

## 2. 왜 semantic tag를 사용하는가?

`header`, `nav`, `main`, `section`, `article`, `footer`는 요소의 역할을 브라우저·검색엔진·보조기술에 전달합니다. 단순 `div`보다 문서 구조를 읽고 유지하기 쉽습니다.

## 3. CSS 변수를 왜 사용하는가?

색상·간격·shadow 같은 design token을 한 곳에서 관리할 수 있습니다. 다크 모드도 동일한 component CSS를 다시 쓰고 변수 값만 바꿀 수 있어 중복을 줄입니다.

## 4. `onclick` 대신 `addEventListener`를 쓴 이유는?

인라인 `onclick`은 HTML 구조와 JavaScript 동작을 섞습니다. `addEventListener`는 JS에 동작을 모으고 동일 element에 여러 listener를 붙일 수 있어 관심사 분리와 유지보수에 유리합니다.

## 5. 이벤트 → 상태 변경 → 화면 업데이트를 theme으로 설명하면?

Theme button click → `STATE.theme`을 light/dark로 변경 → `renderTheme()`이 `data-theme`과 aria/icon을 갱신 → 선택값을 localStorage에 저장합니다. 새로고침 시 저장값을 읽어 다시 STATE와 화면을 맞춥니다.

## 6. API 흐름은 어떻게 되는가?

`loadProjects()`가 먼저 projects state를 `loading`으로 바꾸고 렌더합니다. `fetch`를 `await`한 뒤 성공하면 JSON을 받고 fork를 `filter()`합니다. 결과가 있으면 `success`, 없으면 `empty` state입니다. HTTP/네트워크 실패는 `catch`에서 `error` state로 바뀌며 UI는 오류 메시지와 `다시 시도` 버튼을 보여 줍니다.

## 7. `async/await`와 `try/catch`를 왜 함께 쓰는가?

비동기 코드를 순차 코드처럼 읽을 수 있고, fetch/JSON 처리 중 발생한 오류를 한 `catch`에서 UI error state로 전환할 수 있습니다. HTTP 4xx/5xx는 fetch 자체가 reject하지 않으므로 `response.ok`도 직접 확인합니다.

## 8. `filter`, `map`, `forEach`는 각각 어디에 쓰는가?

- `filter`: fork repository 제외
- `map`: repository 데이터를 project card DOM node로 변환
- `forEach`: 만든 card를 DOM에 붙이거나 NodeList에 listener/observer 적용

즉 데이터 선택 → 변환 → 반영 단계로 구분됩니다.

## 9. Flexbox와 Grid를 각각 왜 선택했는가?

Navigation은 로고·메뉴·버튼을 한 축에 정렬하는 1차원 문제라 Flexbox가 적합합니다. Projects는 화면 폭에 따라 여러 열과 행을 자동 구성해야 하므로 `repeat(auto-fit, minmax(...))` Grid가 적합합니다.

## 10. 왜 `STATE` 객체를 따로 만들었는가?

여러 UI 상태를 흩어진 변수로 관리하면 어떤 이벤트가 무엇을 바꾸는지 추적하기 어렵습니다. `STATE.theme`, `STATE.projects`, `STATE.form`, `STATE.menuOpen`처럼 도메인별 상태를 한 위치에서 보면 Event → State → Render 흐름과 현재 값의 관계가 명확합니다.

## 11. 단순 변수로 처리하면 안 되는가?

작은 기능 하나는 단순 변수로도 가능합니다. 다만 이 미션은 React의 상태-렌더링 개념 전 단계이므로 관련 상태를 명시적으로 묶어 흐름을 학습하는 것이 목적에 더 맞습니다.

## 12. 왜 Mobile First인가?

작은 화면에서 필수 정보와 단순한 레이아웃부터 정의하고, 넓어질수록 기능과 배치를 확장합니다. 기본 CSS가 모바일 기준이므로 작은 화면에서 desktop 규칙을 대량으로 덮어쓰는 일을 줄일 수 있습니다.

## 13. 768px과 1024px에서는 무엇이 달라지는가?

768px부터 hamburger가 숨고 desktop형 nav menu와 2-column layout이 활성화됩니다. 1024px에서는 container 여백과 hero typography를 더 넓은 화면에 맞게 조정합니다.

## 14. form validation 흐름은?

`input` event → 해당 field의 native validity 확인 → `STATE.form.errors` 갱신 → field class/aria/error text 갱신입니다. submit에서는 모든 field를 재검사하고 `STATE.form.valid`을 갱신한 뒤 성공/오류 result를 렌더합니다.

## 15. `event.preventDefault()`는 왜 쓰는가?

Anchor에서는 기본 즉시 이동 대신 smooth scroll을 제어하고, form에서는 기본 제출/페이지 이동을 막고 client-side validation 결과를 화면에 표시하기 위해 사용합니다.

## 16. localStorage에 무엇을 저장하고 왜 저장하는가?

Theme 문자열만 저장합니다. 사용자가 선택한 light/dark 상태를 새로고침 후에도 복원하기 위한 최소한의 persistent UI state입니다.

## 17. IntersectionObserver를 왜 쓰는가?

모든 scroll event마다 각 element 위치를 직접 계산하는 대신 브라우저가 viewport 진입을 관찰하도록 맡깁니다. Reference threshold는 공식 권장에 맞춰 `0.2`입니다.

## 18. GitHub API의 로딩/에러/빈 상태를 왜 구분하는가?

세 상태는 원인이 다릅니다. 로딩은 아직 결과가 없고, 오류는 요청 실패, 빈 상태는 요청 성공했지만 표시할 데이터가 없는 경우입니다. 하나의 메시지로 처리하면 사용자가 현재 상황과 다음 행동을 알기 어렵습니다.

## 19. API 오류 시 재시도 UI는 어떻게 동작하는가?

`STATE.projects.status === 'error'`이면 reload button text가 `다시 시도`로 바뀝니다. 클릭 시 동일 `loadProjects()`를 다시 실행해 loading부터 상태 흐름을 재시작합니다.

## 20. 왜 API Token을 코드에 넣지 않는가?

공식 B4-1은 공개 GitHub repository 조회이므로 Token이 필수 아닙니다. 브라우저 코드에 Secret을 넣으면 누구나 볼 수 있으므로 Reference는 인증정보 없이 public endpoint를 사용합니다.

## 21. 배포 후 API만 실패한다면 무엇을 확인하는가?

브라우저 Network/Console에서 요청 URL, username, HTTP status, GitHub rate limit을 확인합니다. HTML/CSS 배포 문제와 API 문제를 분리해서 봅니다.

## 22. GitHub Pages에서 CSS/JS가 깨지면 무엇을 확인하는가?

Pages source directory와 상대경로를 확인합니다. Project Pages는 repository 하위 경로에서 서비스될 수 있으므로 root 절대경로보다 현재 Reference의 `css/style.css`, `js/script.js`, `images/...` 같은 상대경로가 안전합니다.

## 23. `innerHTML`과 DOM API 사용 시 보안상 차이는?

외부 API 문자열을 그대로 `innerHTML`에 삽입하면 HTML injection 위험이 생길 수 있습니다. Reference project card는 외부 문자열을 `textContent`에 넣고 element를 `createElement()`로 만들어 위험을 줄입니다. `innerHTML=''`은 기존 card container를 비우는 고정 동작에만 사용합니다.

## 24. 이 Reference에서 최소 3개의 상태→렌더 흐름은?

1. Theme: click → `STATE.theme` → `renderTheme`
2. GitHub API: fetch 결과 → `STATE.projects` → `renderProjects`
3. Form: input/submit → `STATE.form` → field/result render

추가로 menu click → `STATE.menuOpen` → `renderMenu`도 있습니다.
