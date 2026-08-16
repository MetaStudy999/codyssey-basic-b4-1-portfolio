# B4-1 R01 — Requirement / Implementation / Verification / Evidence

| ID | Requirement | Reference Implementation | Verification | Evidence |
|---|---|---|---|---|
| R01 | index/css/js/images 구조 | `reference/` | static verify | tree |
| R02 | semantic header/nav/main/section/article/footer | `index.html` | static verify/browser | DOM |
| R03 | Hero/About/Skills/Projects/Contact/Footer | `index.html` | static verify/browser | page |
| R04 | nav anchor | `index.html`, `script.js` | browser | interaction |
| R05 | meaningful alt / label-for | `index.html` | static/browser | DOM |
| R06 | CSS variables + dark variables | `style.css` | static/browser | CSS/theme |
| R07 | Nav Flexbox | `style.css` | static/browser | responsive capture |
| R08 | Projects Grid auto-fit/minmax | `style.css` | static/browser | responsive capture |
| R09 | mobile-first + 768/1024 | `style.css` | static/browser | viewport captures |
| R10 | hamburger mobile | HTML/CSS/JS | browser | click capture |
| R11 | hover/transition/shadow | CSS | static/browser | UI |
| R12 | defer / const-let / no onclick | HTML/JS | static verify | verify result |
| R13 | DOM/querySelector/classList | `script.js` | static/browser | code/interaction |
| R14 | click/submit/scroll/input + preventDefault | `script.js` | static/browser | interaction |
| R15 | smooth scroll | `script.js` + CSS | browser | interaction |
| R16 | scroll-top threshold >=300 | `TOP_BUTTON_THRESHOLD=300` | browser | before/after |
| R17 | nav scroll style threshold >=60 | `NAV_SCROLL_THRESHOLD=60` | browser | before/after |
| R18 | dark mode persistence | localStorage | reload browser | light/dark/reload |
| R19 | scroll animation | IntersectionObserver | browser | interaction |
| R20 | form validation | native validity + JS errors | browser | invalid/valid form |
| R21 | GitHub API public repos | fetch username repos | browser/network | project cards |
| R22 | loading/error/empty states | projects status UI | browser scenarios | state captures |
| R23 | async/await + map/filter concept | async fetch + filter/forEach render | code/browser | code/Q&A |
| R24 | GitHub Pages deployment | Phase C | external URL check | Pages URL |
| R25 | README local run/stack | docs/root README | document review | README |
| R26 | evaluation concepts | `evaluation-qa.md` | user explanation | evaluator check |

## Runtime 필수

정적 verify만으로 CLEAR하지 않습니다. 모바일/태블릿/데스크톱, 새로고침 theme persistence, API 성공/오류/빈 상태, form invalid/valid, 외부 GitHub Pages URL을 실제로 확인합니다.
