# B4-1 Mission Work Packet

> Control Tower는 READ ONLY이며, 이 문서는 `MetaStudy999/codyssey-basic-b4-1-portfolio`에서만 갱신한다.

## 1. Identity

- Mission ID: `B4-1`
- Mission Title: `나를 소개하는 웹페이지 처음부터 만들기`
- Mission Repository: `MetaStudy999/codyssey-basic-b4-1-portfolio`
- Workcell: `20260808-01 / chat 7`
- Started At: `2026-08-08T04:37:00+09:00`

## 2. Control Tower Baseline

- Control Tower Repository: `MetaStudy999/codyssey-basic`
- Baseline SHA: `0d1581b3e82366988f57e1d76da311c028b8e15e`
- Baseline Rule: 이 Workcell 동안 고정한다.

### Required Control Tower Context

- `docs/00-governance/README.md`
- `docs/00-governance/multi-agent-mission-engineering.md`
- `docs/00-governance/source-discovery-fallback-protocol.md`
- `docs/00-governance/parallel-mission-execution.md`
- `docs/00-governance/source-registry.md`
- `docs/00-governance/work-packets/b4-1.md`

## 3. Read / Write Boundary

### READ

- frozen Control Tower baseline
- 현재 B4-1 Repository
- B4-1 Mission PDF/Markdown/Evaluation 후보

### WRITE

- `MetaStudy999/codyssey-basic-b4-1-portfolio`의 `mission/b4-1` 브랜치만

### DO NOT WRITE

- `MetaStudy999/codyssey-basic`
- 다른 Mission Repository

## 4. Source Inventory

| Source Candidate | Type | State | Location | Notes |
|---|---|---|---|---|
| Mission | PDF | `VALID` | `b4-1-mission.pdf` | 8쪽. 필수 기능/제약/배포/증빙 포함 |
| Mission | Markdown | `DUPLICATE` | `b4-1-mission.md` | PDF 구조화 전사본, 핵심 요구 일치 |
| Evaluation | Markdown | `UNVERIFIED` | `b4-1-evaluation.md` | 실질 평가항목은 있으나 frozen Source Registry에서 공식 provenance 미확인 |
| Official operation context | Governance | `VALID` | frozen Control Tower | Gate/Source/Workcell 경계에 한해 적용 |

- Source Mode: `MISSION-LED`
- Source Confidence: `HIGH` (Mission 기준)
- Source Gaps:
  - `b4-1-evaluation.md`의 공식 Evaluation provenance를 frozen Source Registry에서 확인하지 못했다.
  - 따라서 Evaluation은 보조 검증으로 사용하고, 공식 Requirement/PASS 근거는 Mission PDF를 우선한다.

## 5. Mission Contract

### Goal

외부 프레임워크 없이 순수 HTML/CSS/JavaScript로 반응형 포트폴리오를 구현하고, 사용자 이벤트 → 상태 변경 → DOM 업데이트 및 GitHub API 비동기 상태 흐름을 실제 코드로 설명할 수 있게 한다.

### Required Deliverables

- [x] 반응형 포트폴리오 웹사이트 소스 — `IMPLEMENTED`
- [x] GitHub Repository — 현재 Repository
- [ ] GitHub Pages 배포 URL — `NEEDS-RUNTIME`
- [ ] Desktop/Mobile/Dark mode 스크린샷 — `NEEDS-RUNTIME`
- [x] README의 프로젝트/기술/실행/threshold 설명 — `TESTED`
- [ ] README의 실제 배포 URL/실제 스크린샷 — `NEEDS-RUNTIME`

### Required Functions / Behaviors

- [x] Hero/About/Skills/Projects/Contact/Footer
- [x] 시맨틱 HTML + `alt` + `label for/id`
- [x] CSS 변수 + dark 변수 + Flexbox nav + Grid projects
- [x] Mobile-first + 768/1024 breakpoint + mobile hamburger 구현
- [x] `defer`, `const/let`, `querySelector(All)`, `addEventListener`, `classList`
- [x] hamburger / smooth scroll / scroll-top / nav scroll style / dark mode / IntersectionObserver 구현
- [x] Contact required/email validation + inline error + success 구현
- [x] ES6+ arrow/template literal/destructuring + filter/map/forEach
- [x] GitHub API `fetch` + `async/await` + `try/catch`
- [x] Projects loading/success/error+retry/empty + 403 rate-limit 분기 구현
- [x] 3개 이상 상태→렌더링 흐름
- [ ] 실제 Chrome 및 GitHub Pages에서 기능 검증

### Constraints

- React, Vue, jQuery, Bootstrap, Tailwind CSS 등 외부 UI/JS 프레임워크/라이브러리 금지
- 순수 HTML/CSS/JavaScript 사용
- `var` 금지
- inline `onclick` 금지
- inline `style="..."` 금지
- 최신 Chrome에서 정상 동작해야 함
- 인증 없는 GitHub API rate limit과 403 에러 UI 고려

### Explicit Non-scope

보너스는 현재 Mission 완료를 지연시키지 않는다.

- 언어별 프로젝트 필터 UI
- 타이핑 효과
- Formspree/EmailJS 실제 전송
- 시스템 다크모드 자동 감지

## 6. Requirement Traceability

| ID | Requirement | Source | Implementation | Validation | Status |
|---|---|---|---|---|---|
| REQ-001 | `index.html`, `css/`, `js/`, `images/` 분리 | PDF p2-3 | tree | CI static check | `TESTED` |
| REQ-002 | semantic HTML + 필수 섹션 + nav | PDF p3 | `index.html` | CI static check + browser pending | `IMPLEMENTED` |
| REQ-003 | alt + label 연결 | PDF p3 | `index.html` | CI static check | `TESTED` |
| REQ-004 | CSS vars/dark/Flex/Grid | PDF p3 | `css/style.css` | CI static check | `TESTED` |
| REQ-005 | mobile-first + 768/1024 + hamburger | PDF p3 | CSS/JS | source checked; viewport pending | `IMPLEMENTED` |
| REQ-006 | defer/const-let/DOM/events/classList | PDF p4 | `js/app.js` | CI static + JS syntax | `TESTED` |
| REQ-007 | 6종 interaction | PDF p4-5 | CSS/JS | browser pending | `IMPLEMENTED` |
| REQ-008 | dark `localStorage` persistence | PDF p4 | `js/app.js` | source checked; reload pending | `IMPLEMENTED` |
| REQ-009 | Contact validation UX | PDF p5 | HTML/JS | source checked; browser pending | `IMPLEMENTED` |
| REQ-010 | ES6+ + 배열 메서드 | PDF p5 | `js/app.js` | CI static check | `TESTED` |
| REQ-011 | GitHub API async flow | PDF p5 | `js/app.js` | source checked; live API pending | `IMPLEMENTED` |
| REQ-012 | loading/success/error/retry/empty/403 | PDF p5,7-8 | `renderProjects`/`loadProjects` | CI static branches; live success pending | `IMPLEMENTED` |
| REQ-013 | 3+ state→render 흐름 | PDF p5-6 | theme/projects/form | code review + `docs/LEARNING.md` | `TESTED` |
| REQ-014 | GitHub Pages URL 정상 | PDF p2,p6 | Settings pending | external URL pending | `NEEDS-RUNTIME` |
| REQ-015 | README 설명/기술/deploy/screenshots/threshold | PDF p4-6 | `README.md` | 내용 tested; URL/screenshots pending | `IMPLEMENTED` |
| REQ-016 | framework/var/inline handler/style 금지 | PDF p6-7 | source | CI static check | `TESTED` |

## 7. Evaluation Mapping

> `b4-1-evaluation.md`는 `UNVERIFIED`이므로 보조 검증이다.

| Evaluation ID | Criterion | Related | Validation | Status |
|---|---|---|---|---|
| EVA-001 | 반응형 레이아웃 | REQ-005 | Chrome 375/768/1024+ | `NEEDS-RUNTIME` |
| EVA-002 | theme toggle + reload | REQ-008 | Chrome click/reload | `NEEDS-RUNTIME` |
| EVA-003 | hamburger/scroll/top | REQ-007 | Chrome interaction | `NEEDS-RUNTIME` |
| EVA-004 | GitHub API + 상태 UI | REQ-011/012 | static branch check + live success | `IMPLEMENTED` |
| EVA-005 | form validation | REQ-009 | Chrome invalid/valid inputs | `NEEDS-RUNTIME` |
| EVA-006 | file/semantic/CSS/events | REQ-001/2/4/6 | CI static check | `TESTED` |
| EVA-007 | event→state→DOM/async/map/Flex/Grid 설명 | REQ-004/10/11/13 | `docs/LEARNING.md` | `TESTED` |
| EVA-008 | central STATE/mobile-first 설명 | REQ-005/13 | source + learning doc | `TESTED` |

## 8. Repository Baseline

- Default Branch: `main`
- Baseline Commit: `8d8a8e738ecf16fd6c6053de4adcf21045f69ae3`
- Work Branch: `mission/b4-1`
- Pull Request: `#1` (draft)
- Runtime: latest Chrome + HTML5/CSS/modern JavaScript
- Dependency Manager: none
- Existing implementation at baseline: Mission/Evaluation docs only
- Current implementation: HTML/CSS/JS/image/test/docs/workflow added

## 9. Mission-specific TOC

```text
B4-1
├── Source Discovery
├── Semantic HTML & Accessibility
├── CSS Tokens / Light-Dark Theme
├── Flex Navigation / Grid Projects
├── Mobile-first 768 / 1024
├── DOM / Events / State
├── Interaction Set
├── Contact Form UX
├── GitHub API State Machine
├── Learning Guide
├── Test / Review
├── Browser Runtime / Pages
├── Evidence
└── Handoff
```

## 10. Engineering Plan

### Prompt Engineering

- ROLE: B4-1 주 책임 개발자 + 교육 설계자 + 품질 관리자
- GOAL: Mission PDF 필수 요구의 최소 충분 구현과 검증
- SCOPE: B4-1 Repository only
- OUTPUT: source + test + learning + runtime/evidence + handoff
- STOP: 필수 요구/Test/Review/Runtime/Evidence/G8 완료

### Context Engineering

현재 Gate에 필요한 Mission, 코드, CI, Runtime 결과만 우선 사용한다.

### Harness Engineering

- Git boundary: `mission/b4-1`
- Automated validation: `python3 tests/static_check.py`, `node --check js/app.js`, HTTP serve/curl
- Secret boundary: token/API key 저장 없음
- Evidence boundary: 실제 출력과 예상 출력 분리

### Loop Engineering

- Self review: 1회 수행
- Independent review: PR #1에 GitHub Copilot review 요청 완료, 결과 수집 중
- Re-validation: BLOCKER/MAJOR 범위만

### Fusion Engineering

판정 우선순위: `Mission PDF → Test → Runtime → Evidence`

## 11. Agent Routing

- Orchestrator / Integrator: `ChatGPT`
- Primary Builder: `ChatGPT`
- Independent Reviewer: `GitHub Copilot code review` — requested on PR #1
- Claude: `OFF`
- Gemini: `CONDITIONAL` — PDF 시각 source는 제공된 렌더링으로 확인
- Grok: `OFF`
- Runtime Authority: `Human`

## 12. Dependency / Drift Check

- Upstream Dependency: `NONE`
- Related Mission: `NONE`
- Control Tower Drift: `NONE` — frozen baseline 유지
- Source Drift: `NONE` — Mission PDF/MD 핵심 요구 일치
- Action: `CONTINUE`

## 13. Test Plan

| Test | Requirement | Command / Method | Expected | Actual | Status |
|---|---|---|---|---|---|
| Static acceptance | REQ-001~006,010~013,016 | `python3 tests/static_check.py` | all pass | GitHub Actions run `31213110237` success | `TESTED` |
| JavaScript syntax | core JS | `node --check js/app.js` | exit 0 | GitHub Actions run `31213110237` success | `TESTED` |
| Static HTTP serve | site entry | `python3 -m http.server` + `curl` | 200 + projects markup | GitHub Actions run `31213110237` success | `TESTED` |
| Responsive | REQ-005 | Chrome 375/768/1024+ | no broken layout | not run | `NEEDS-RUNTIME` |
| Interactions/Form | REQ-007~009 | Chrome click/input/scroll/reload | required flows | not run | `NEEDS-RUNTIME` |
| GitHub API live | REQ-011/012 | Chrome network request | loading→cards | not run | `NEEDS-RUNTIME` |
| Error/empty branches | REQ-012 | source/static validation | branches and retry/empty text exist | CI success | `TESTED` |
| GitHub Pages | REQ-014 | external URL | HTTP 200 + feature parity | not run | `NEEDS-RUNTIME` |

## 14. Runtime Plan

| Runtime Check | AI 가능 | Human 필요 | Evidence | Status |
|---|---|---|---|---|
| Desktop Chrome | limited | yes | screenshot | `NEEDS-RUNTIME` |
| Mobile Chrome viewport | limited | yes | screenshot | `NEEDS-RUNTIME` |
| Dark persistence | limited | yes | screenshot + reload observation | `NEEDS-RUNTIME` |
| Contact validation | limited | yes | runtime observation | `NEEDS-RUNTIME` |
| GitHub live API | limited | yes | projects screenshot | `NEEDS-RUNTIME` |
| GitHub Pages Settings + external URL | no | yes | URL + screenshot | `NEEDS-RUNTIME` |

## 15. Evidence Plan

| Evidence | Requirement | Location | Status |
|---|---|---|---|
| CI test | source-level | GitHub Actions run `31213110237` | `TESTED` |
| Desktop | REQ-002/005 | `docs/evidence/desktop.png` | `NEEDS-RUNTIME` |
| Mobile | REQ-005 | `docs/evidence/mobile.png` | `NEEDS-RUNTIME` |
| Dark mode | REQ-008 | `docs/evidence/dark.png` | `NEEDS-RUNTIME` |
| Projects/API | REQ-011/012 | `docs/evidence/projects.png` | `NEEDS-RUNTIME` |
| Runtime checklist | REQ-007~014 | `docs/RUNTIME-EVIDENCE.md` | `NEEDS-RUNTIME` |

## 16. Completion Gates

| Gate | Exit Condition | Status |
|---|---|---|
| G1 SOURCE | Source/Mode/Gap/provenance 확정 | `PASS` |
| G2 BUILD | 필수 소스 구현 존재 | `IMPLEMENTED` |
| G3 TEST | 자동 검증 통과 | `TESTED` |
| G4 REVIEW | BLOCKER=0, MAJOR=0 + 독립 review | `IN PROGRESS` |
| G5 RUNTIME | 실제 Chrome/Pages 검증 | `NEEDS-RUNTIME` |
| G6 EVIDENCE | 필수 screenshots/URL | `NEEDS-RUNTIME` |
| G7 LEARN | 구현 일치 학습 자료 | `IMPLEMENTED` |
| G8 MERGE | PR merge + handoff/result | `TODO` |

## 17. STOP Rule

공식 필수 Requirement가 충족되고 Evaluation Gap이 명시되며 BLOCKER=0, MAJOR=0, 필요한 Test/Runtime/Evidence/G8이 완료되면 추가 구현·검토를 중단한다. 보너스는 Backlog로 남긴다.

## 18. Handoff Contract

G8 완료 후 `HANDOFF.md`, `mission-result.yaml`을 B4-1 Repository에 남긴다. Control Tower는 직접 수정하지 않는다.
