# B4-1 R01 — Reference Build

## 목적

공식 Mission/Evaluation을 기준으로 **외부 UI 라이브러리 없이 순수 HTML/CSS/JavaScript로 구현한 반응형 포트폴리오 Reference Complete Version**을 준비합니다.

Reference Build가 완료되어도 실제 브라우저 반응형 확인, GitHub API 네트워크 동작, GitHub Pages 외부 URL, Lighthouse/접근성 확인과 Evidence가 끝나기 전에는 `✅ CLEAR`로 판정하지 않습니다.

## Source of Truth

1. `b4-1-mission.pdf`
2. `b4-1-mission.md`
3. `b4-1-evaluation.md`

## Reference 설계 결정

- Vanilla HTML/CSS/JavaScript only
- mobile-first CSS
- breakpoint: 768px / 1024px
- semantic sections: Header/Nav, Hero, About, Skills, Projects, Contact, Footer
- GitHub username: `MetaStudy999`를 Reference 값으로 사용하고 Phase C에서 실제 제출 계정과 일치 여부 재확인
- GitHub REST public repositories API 사용, Secret 없음
- loading/error/empty 상태를 Projects에서 명시
- dark mode: `data-theme="dark"` + localStorage
- hamburger menu
- smooth anchor scroll
- nav scroll state
- scroll-to-top button
- IntersectionObserver scroll reveal
- contact form client-side validation + field error UI
- 모든 JS는 `defer`, `const/let`, `addEventListener`

## Reference Complete Path

1. semantic HTML
2. CSS variables/layout/mobile-first
3. responsive nav + hamburger
4. dark mode + localStorage
5. smooth scroll / scroll top / nav scroll state
6. scroll animation
7. contact form validation
8. GitHub fetch + loading/error/empty + dynamic project cards
9. static/structural verify
10. browser responsive/API Runtime
11. GitHub Pages deploy
12. Evaluation Q&A / Evidence
13. CLEAR

## 상태

**Reference Build 진행 중 / Mission 상태 ⬜ NOT STARTED / Runtime 미시작**
