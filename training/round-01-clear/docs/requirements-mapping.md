# B4-1 R01 — Requirement / Implementation / Verification / Evidence

실제 브라우저/API/배포를 수행하지 않은 항목은 Evidence 완료로 표시하지 않습니다.

| ID | Requirement | Reference Implementation | Verification | Runtime Evidence |
|---|---|---|---|---|
| R01 | index/css/js/images 분리 | `reference/` | static verify | tree/verify |
| R02 | semantic header/nav/main/section/article/footer | `index.html` | static + browser | browser.md |
| R03 | Hero/About/Skills/Projects/Contact/Footer | `index.html` | static/browser | browser.md |
| R04 | section anchors | HTML + smooth-scroll handler | static/browser | browser.md |
| R05 | image alt | `index.html` | static/browser | browser.md |
| R06 | label-for/id | Contact form | static/browser | browser.md |
| R07 | CSS `:root` variables | `style.css` | static | verify |
| R08 | dark variables | `[data-theme=dark]` | static/browser | browser.md |
| R09 | nav Flexbox | `.nav` | static/browser | browser.md |
| R10 | Projects Grid auto-fit/minmax | `.projects-grid` | static/browser | browser.md |
| R11 | mobile-first + 768/1024 | CSS media queries | static/browser | browser.md |
| R12 | mobile hamburger | HTML/CSS/STATE/menu render | browser | browser.md |
| R13 | hover/transition/shadow | CSS | static/browser | browser.md |
| R14 | JS defer, const/let, no onclick | HTML/JS | static | verify |
| R15 | querySelector/querySelectorAll | JS | static/code | verify |
| R16 | classList / DOM update | JS render functions | static/browser | browser.md |
| R17 | click/submit/scroll/input | JS listeners | static/browser | browser.md |
| R18 | preventDefault | anchors/form | static/browser | browser.md |
| R19 | smooth scroll | `scrollIntoView` | browser | browser.md |
| R20 | scroll-top 300px | constant + handler | static/browser | browser.md |
| R21 | nav style 60px | constant + handler | static/browser | browser.md |
| R22 | dark mode persistence | STATE + localStorage | browser reload | browser.md |
| R23 | scroll animation threshold 0.2 | IntersectionObserver | static/browser | browser.md |
| R24 | Contact required/email/errors | validity + render | browser | browser.md |
| R25 | input immediate feedback | input listener | browser | browser.md |
| R26 | successful form message | submit handler | browser | browser.md |
| R27 | arrow functions/template literal/destructuring | `script.js` | code review | evaluation.md |
| R28 | `filter()` | exclude forks | static/code | api.md |
| R29 | `map()` | repo → card DOM | static/code | api.md |
| R30 | `forEach()` | DOM/events iteration | static/code | api/browser |
| R31 | GitHub API endpoint | meta username + fetch | network/browser | api.md |
| R32 | async/await + try/catch | `loadProjects()` | static/network | api.md |
| R33 | loading/success/error/empty | `STATE.projects` + render | static/scenario | api.md |
| R34 | error retry | reload button state | static/browser | api.md |
| R35 | explicit STATE object | `STATE` | static/code | evaluation.md |
| R36 | theme state→render | `setTheme/renderTheme` | code/browser | evaluation/browser |
| R37 | API state→render | `setProjectsState/renderProjects` | code/browser | evaluation/api |
| R38 | form state→render | form handlers/result | code/browser | evaluation/browser |
| R39 | Vanilla only | no forbidden framework ref | static | verify |
| R40 | GitHub Pages | Phase C | external check | deploy.md |
| R41 | deployed URL all functions | Phase C | external browser | deploy.md |
| R42 | README description/tech/deploy/screenshots | Reference plan + Phase C actual data | doc review | deploy.md |
| R43 | evaluation concepts | `evaluation-qa.md` | user explanation | evaluation.md |
| R44 | no required Secret | no credential dependency | tracked filename scan | verify |

## Runtime 핵심

1. mobile/tablet/desktop viewport
2. hamburger/smooth scroll/nav scroll/top button/observer
3. theme toggle + reload
4. form invalid/valid
5. API loading/success
6. API error/retry + empty state
7. GitHub Pages 외부 URL
8. deployed URL 전체 기능
9. Evaluation 자기 말 설명

정적 verify만으로 CLEAR하지 않습니다.
