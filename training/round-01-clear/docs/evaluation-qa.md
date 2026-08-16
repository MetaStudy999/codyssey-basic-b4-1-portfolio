# B4-1 R01 — Evaluation Q&A Reference

## 1. 왜 semantic tag를 사용하는가?

`header`, `nav`, `main`, `section`, `article`, `footer`는 화면 모양뿐 아니라 각 영역의 의미를 브라우저, 검색엔진, 보조기술에 전달합니다. `div`만 사용한 구조보다 문서 관계를 이해하기 쉽고 접근성/유지보수에도 유리합니다.

## 2. Flexbox와 Grid는 어떻게 구분해 사용했는가?

Flexbox는 한 축의 정렬에 강해 Navigation의 로고/메뉴/버튼 배치에 사용했습니다. Grid는 행과 열을 함께 다루기 쉬워 Projects/Skills 카드처럼 반복되는 2차원 레이아웃에 사용했습니다. Projects는 `repeat(auto-fit, minmax(...))`로 화면 폭에 따라 열 수가 자동 조정됩니다.

## 3. mobile-first란?

기본 CSS를 작은 화면 기준으로 작성하고 `min-width: 768px`, `min-width: 1024px`에서 더 넓은 화면용 규칙을 추가하는 방식입니다. 작은 화면을 나중에 억지로 축소하는 것보다 핵심 콘텐츠 우선순위를 분명히 하기 쉽습니다.

## 4. DOM 선택과 이벤트 연결 흐름은?

`querySelector/querySelectorAll`로 요소를 찾고 `addEventListener`로 click/submit/scroll/input 이벤트를 연결합니다. 이벤트가 발생하면 local state나 class/attribute/text를 바꾸고 브라우저가 변경된 DOM/CSS를 다시 화면에 반영합니다.

## 5. 왜 HTML onclick을 사용하지 않았는가?

마크업 구조와 동작 코드를 분리하면 HTML 가독성과 JavaScript 유지보수가 좋아집니다. 같은 요소에 여러 이벤트를 연결하거나 기능을 재사용하기도 쉽습니다.

## 6. 다크 모드가 새로고침 후 유지되는 원리는?

사용자가 toggle하면 `data-theme`을 바꾸고 선택값을 `localStorage`에 저장합니다. 페이지 시작 시 저장된 값을 읽어 같은 theme을 다시 적용합니다. CSS는 `[data-theme="dark"]` 변수만 바꿔 전체 컴포넌트가 같은 theme 값을 사용하게 합니다.

## 7. GitHub API 비동기 흐름은?

`fetch()`가 Promise를 반환하고 `await`로 HTTP 응답과 JSON 변환을 기다립니다. 성공하면 repository를 필터링해 카드로 렌더링하고, 시작 전에는 loading, 결과가 0개면 empty, HTTP/network 실패는 error 상태를 보여 줍니다. `try/catch/finally`로 성공/실패와 버튼 상태를 일관되게 관리합니다.

## 8. 왜 loading/error/empty 상태가 필요한가?

네트워크 요청은 즉시 끝나지 않고 실패하거나 결과가 없을 수 있습니다. 아무것도 보여 주지 않으면 사용자는 멈춘 것인지 빈 결과인지 알 수 없습니다. 상태를 명시하면 현재 상황과 다음 행동을 이해할 수 있습니다.

## 9. 사용자 이벤트 → 상태 → DOM 업데이트는 어떻게 연결되는가?

예를 들어 dark mode 버튼 click → 현재 theme 확인 → nextTheme 결정 → `data-theme`/localStorage 변경 → CSS 변수 재계산 → 화면 변화 순서입니다. React의 state→render 흐름을 배우기 전 Vanilla JS에서 같은 원리를 직접 확인하는 예입니다.

## 10. 햄버거 메뉴는 어떻게 동작하는가?

모바일에서는 `.nav-menu`가 기본 숨김이고 버튼 click 시 `classList.toggle('active')`와 `aria-expanded`를 함께 변경합니다. CSS가 `.active` 상태를 보고 메뉴를 표시합니다. 링크를 선택하면 메뉴를 닫습니다.

## 11. 폼 검증은 어떻게 구현했는가?

HTML의 `required`, `type=email`, `minlength`를 기본 규칙으로 사용하고 JavaScript에서 `ValidityState`를 읽어 필드별 오류 문구, `invalid` class, `aria-invalid`를 갱신합니다. submit에서는 `preventDefault()`로 서버 전송을 막고 모든 필드가 유효할 때 성공 안내를 표시합니다.

## 12. 스크롤 이벤트가 너무 많으면 어떤 문제가 있고 어떻게 개선할 수 있는가?

scroll은 짧은 시간에 매우 자주 발생하므로 무거운 계산을 매번 하면 성능이 나빠질 수 있습니다. Reference의 scroll handler는 class 두 개만 바꾸도록 작게 유지합니다. 더 복잡한 기능이라면 throttle/requestAnimationFrame을 사용할 수 있고 요소 진입 감지는 `IntersectionObserver`로 scroll polling을 피할 수 있습니다.

## 13. GitHub API에 Access Token을 프론트엔드에 넣지 않는 이유는?

브라우저가 받는 JavaScript는 사용자가 모두 볼 수 있습니다. 따라서 token을 넣으면 Secret이 공개됩니다. B4-1 Reference는 공개 repository API만 사용하고, 인증이 필요한 API라면 backend/proxy에서 Secret을 보관해야 합니다.

## 14. 접근성을 위해 어떤 요소를 넣었는가?

skip link, nav label, button `aria-expanded/pressed`, 의미 있는 image alt, label-for/id, `aria-live`, keyboard focus-visible, reduced-motion 대응을 포함했습니다. 접근성은 별도 장식이 아니라 HTML 구조와 interaction 상태에 함께 반영해야 합니다.
