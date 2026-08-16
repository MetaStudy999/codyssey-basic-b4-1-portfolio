# B4-1 R01 — Reference Build

## 목적

공식 Mission/Evaluation을 기준으로 **순수 HTML/CSS/JavaScript 포트폴리오**의 Reference Complete Version을 준비합니다. 실제 브라우저, GitHub API, GitHub Pages 배포는 Phase C에서 확인하기 전까지 PASS로 간주하지 않습니다.

## Source of Truth

1. `b4-1-mission.pdf`
2. `b4-1-mission.md`
3. `b4-1-evaluation.md`

## Reference 설계 결정

- Vanilla HTML/CSS/JavaScript only
- semantic HTML + accessibility 기본기
- mobile-first CSS, 768px/1024px
- nav Flexbox / Projects Grid
- explicit `STATE` object
- Event → State → Render 흐름을 theme/projects/form/menu로 분리
- GitHub API: meta username 기반 public repos
- API state: loading/success/error/empty + retry
- array methods: `filter`, `map`, `forEach`
- localStorage theme persistence
- form input/submit validation
- thresholds: nav 60px, top 300px, observer 0.2
- GitHub Pages와 실제 네트워크 결과는 Phase C

## 자체감사에서 보강한 항목

- [x] 기존 Reference HTML/CSS/JS 구조 재검토
- [x] 공식 평가가 요구하는 `STATE` 객체를 명시적으로 추가
- [x] theme/projects/form의 state→render 흐름 분리
- [x] GitHub API loading/success/error/empty 상태를 state로 통일
- [x] error 상태에서 `다시 시도` UI 제공
- [x] GitHub repository → card 변환에 `map()` 실제 사용
- [x] fork 제외 `filter()`, DOM 부착 `forEach()` 유지
- [x] IntersectionObserver threshold를 공식 권장 `0.2`로 정렬
- [x] 60px/300px/0.2 임계값을 Reference README에 문서화
- [x] form state/즉시 input feedback/submit 결과 흐름 명확화
- [x] verifier에 semantic/anchors/form/CSS/JS/events/state/array methods/threshold/framework ban 검사 추가
- [x] `--runtime` browser/API/deploy/evaluation Evidence Gate 추가
- [x] Reference README 신규 작성
- [x] Reference와 Runtime을 엄격히 분리
- [x] 실제 API/Pages 결과를 허위 PASS로 기록하지 않음

## Reference Complete Path

1. Source/Evaluation 확인
2. semantic HTML
3. mobile-first CSS
4. DOM/event 기본
5. menu/scroll interactions
6. theme state + persistence
7. GitHub API state machine
8. project map/filter/forEach render
9. form validation state
10. IntersectionObserver
11. static verify
12. browser/API scenarios
13. GitHub Pages
14. Evidence/Evaluation
15. CLEAR

## Phase C에서만 완료할 것

- [ ] mobile/tablet/desktop 실제 브라우저 확인
- [ ] hamburger/smooth scroll/nav/top/animation 실제 확인
- [ ] dark/light + reload persistence
- [ ] form invalid/valid 즉시 피드백
- [ ] GitHub API 실제 loading/success
- [ ] error/retry 및 empty 상태 재현
- [ ] GitHub Pages 실제 배포 URL
- [ ] 배포 URL에서 전체 기능 재확인
- [ ] README 실제 배포 URL/스크린샷
- [ ] Evaluation 자기 말 설명
- [ ] Evidence
- [ ] `✅ B4-1 CLEAR`

## 현재 판정

**Reference Build: CORE READY**  
**Runtime Mission 상태: ⬜ NOT STARTED / CLEAR 아님**

다음 Phase A 자체감사 대상은 **B5-1**입니다.
