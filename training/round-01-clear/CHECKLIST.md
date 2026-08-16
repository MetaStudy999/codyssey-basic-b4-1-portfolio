# B4-1 Round 01 — Mission Clear Checklist

> 현재는 Phase A Reference Build입니다. 실제 브라우저/API/배포를 수행하기 전에는 Runtime 항목을 체크하지 않습니다.

## 현재 상태

- Round: **R01 — CLEAR**
- Mission: **B4-1**
- Runtime 상태: **⬜ NOT STARTED**
- Reference 판정: **CORE READY**

## A. Source
- [x] Mission PDF/MD 확인
- [x] Evaluation 확인
- [x] 필수/보너스 분리
- [x] Runtime/배포 항목 분리

## B. HTML
- [x] index / css / js / images 역할 분리
- [x] header/nav/main/section/article/footer
- [x] Hero/About/Skills/Projects/Contact/Footer
- [x] section anchor
- [x] meaningful alt
- [x] form label-for/id
- [x] script defer

## C. CSS / Responsive
- [x] `:root` 변수
- [x] dark theme 변수
- [x] mobile-first
- [x] 768px breakpoint
- [x] 1024px breakpoint
- [x] nav Flexbox
- [x] Projects Grid auto-fit/minmax
- [x] mobile hamburger/nav
- [x] hover / transition / box-shadow
- [ ] 실제 mobile/tablet/desktop 확인

## D. JavaScript / Events
- [x] const/let only
- [x] no inline onclick
- [x] querySelector/querySelectorAll
- [x] text/DOM update
- [x] classList
- [x] click/submit/scroll/input
- [x] preventDefault
- [x] smooth scroll
- [x] hamburger
- [x] scroll-top 300px
- [x] nav state 60px
- [x] IntersectionObserver 0.2
- [ ] 실제 browser interaction

## E. STATE / Render
- [x] explicit `STATE`
- [x] menu state
- [x] theme state → render
- [x] project state → render
- [x] form state → render
- [x] Event → State → Render 설명 가능 구조

## F. Theme
- [x] dark/light toggle
- [x] localStorage get/set
- [x] reload persistence 설계
- [ ] 실제 reload persistence 확인

## G. GitHub API
- [x] fetch + async/await
- [x] try/catch
- [x] username meta 설정
- [x] public repository filter
- [x] `filter()`
- [x] `map()` card transformation
- [x] `forEach()` DOM append
- [x] loading
- [x] success
- [x] error
- [x] empty
- [x] error retry button state
- [ ] 실제 GitHub API success
- [ ] 실제 error/retry
- [ ] 실제 empty scenario

## H. Form
- [x] name/email/message
- [x] required
- [x] email type validation
- [x] nearby field error
- [x] input immediate feedback
- [x] submit preventDefault
- [x] success/error result
- [ ] 실제 invalid/valid browser 확인

## I. Constraints / Verification
- [x] no React/Vue/jQuery/Bootstrap/Tailwind reference
- [x] static verifier
- [x] threshold checks
- [x] array-method checks
- [x] state-flow checks
- [x] Secret-pattern scan
- [x] Runtime Evidence Gate
- [ ] 실제 verify 0 FAIL

## J. Docs / Evaluation
- [x] REFERENCE-BUILD
- [x] REFERENCE-STATUS
- [x] reference README
- [x] detailed Beginner Guide
- [x] requirements mapping
- [x] evaluation Q&A
- [x] Evidence Guide
- [x] HTML/CSS/JS 분리 이유
- [x] semantic tags
- [x] CSS variables
- [x] addEventListener vs onclick
- [x] async/await + try/catch
- [x] map/filter data→UI
- [x] Flexbox vs Grid
- [x] STATE object rationale
- [x] mobile-first rationale
- [ ] 사용자 자기 말 설명

## K. GitHub Pages / Submission
- [ ] 실제 GitHub Pages 배포
- [ ] 외부 URL 접속
- [ ] deployed site 전체 기능
- [ ] README 실제 project description/stack
- [ ] README 실제 deployment URL
- [ ] README 실제 screenshots

## L. Final CLEAR
- [ ] 공식 Mission 누락 없음 최종 확인
- [ ] 공식 Evaluation 누락 없음 최종 확인
- [ ] static verify 실제 PASS
- [ ] browser Runtime 완료
- [ ] API Runtime 완료
- [ ] GitHub Pages Runtime 완료
- [ ] Evidence 완료
- [ ] 평가 설명 가능
- [ ] **✅ B4-1 CLEAR**
