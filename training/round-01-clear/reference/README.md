# B4-1 Portfolio Reference

## 상태

- Reference Build: **CORE READY candidate**
- Runtime Mission: **⬜ NOT STARTED**
- 실제 브라우저/API/GitHub Pages 검증 전이므로 `✅ CLEAR` 아님

## 기술 범위

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- GitHub REST API
- GitHub Pages는 Phase C에서 실제 배포

React, Vue, jQuery, Bootstrap, Tailwind CSS를 사용하지 않습니다.

## 로컬 실행

정적 파일이라 단순 파일 열기보다 HTTP 서버 사용을 권장합니다.

```bash
cd training/round-01-clear/reference
python3 -m http.server 8000
```

브라우저에서 로컬 서버의 `/`를 엽니다.

## 구조

```text
reference/
├── index.html
├── css/style.css
├── js/script.js
├── images/profile-placeholder.svg
└── README.md
```

## 공식 기능 대응

### HTML

- semantic `header/nav/main/section/article/footer`
- Hero / About / Skills / Projects / Contact / Footer
- section anchor navigation
- profile image alt
- Contact label-for/id 연결

### CSS

- `:root` design tokens
- `[data-theme="dark"]`
- mobile-first
- 768px / 1024px breakpoints
- Navigation Flexbox
- Project Grid `auto-fit/minmax`
- hover / transition / box-shadow

### JavaScript

명확한 `STATE`를 두어 다음 흐름을 추적할 수 있습니다.

```text
Event → STATE 변경 → Render
```

최소 3개 흐름:

1. theme click → `STATE.theme` → document theme render
2. GitHub fetch → `STATE.projects` loading/success/error/empty → project UI render
3. form input/submit → `STATE.form` → field/result UI render

추가로 hamburger는 `STATE.menuOpen`을 사용합니다.

### 공식 임계값

Reference는 다음 값을 고정합니다.

- navigation scrolled: `60px`
- scroll-top visible: `300px`
- IntersectionObserver threshold: `0.2`

### GitHub API

`index.html`의 다음 meta 값을 실제 학습자 GitHub ID로 바꿀 수 있습니다.

```html
<meta name="github-username" content="MetaStudy999">
```

요청 endpoint:

```text
https://api.github.com/users/{username}/repos
```

UI 상태:

- loading
- success
- error + 다시 시도
- empty

Repository 배열은 `filter()`로 fork를 제외하고, `map()`으로 card DOM을 만든 뒤, `forEach()`로 화면에 붙입니다.

## Form

- name/email/message required
- email type validation
- minimum length
- input event 즉시 피드백
- submit `preventDefault()`
- 성공/오류 메시지

실제 이메일 전송은 보너스이므로 Reference 필수 범위에서는 수행하지 않습니다.

## 자동검증

```bash
bash training/round-01-clear/environment/verify.sh
```

이 검증은 정적 구조/문법/제약을 확인합니다. 실제 브라우저 동작은 Phase C에서 확인합니다.

## Phase C Runtime

반드시 실제로 확인할 항목:

- mobile/tablet/desktop layout
- hamburger
- smooth scroll / nav scroll style / scroll top
- dark/light + reload persistence
- IntersectionObserver animation
- form invalid/valid
- GitHub API loading/success/error/empty/retry
- GitHub Pages external URL
- deployed site에서 전체 기능

## 제출 README

실제 제출 시 README에 다음을 포함합니다.

- 프로젝트 설명
- 사용 기술
- 실행 방법
- threshold 값
- GitHub API username 설정 위치
- 배포 URL
- 실제 화면 스크린샷

Reference 단계에서는 배포 URL이나 실제 스크린샷을 허위로 작성하지 않습니다.
