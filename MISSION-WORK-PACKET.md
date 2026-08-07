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

- Control Tower baseline `0d1581b...`
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
| Mission | PDF | `VALID` | `b4-1-mission.pdf` | 8쪽, 기능/제약/제출물/Test Case 포함. File Library 원본과 교차 확인 |
| Mission | Markdown | `DUPLICATE` | `b4-1-mission.md` | PDF 문장을 Markdown으로 구조화한 전사본. PDF와 핵심 요구 일치 |
| Evaluation | Markdown | `UNVERIFIED` | `b4-1-evaluation.md` | 실질 평가항목은 존재하지만 현재 Source Registry에 공식 provenance가 없음 |
| Official operation context | Governance | `VALID` | Control Tower frozen baseline | B4-1 필수, Web & Front-end, Workcell/Gate 운영 규칙만 사용 |

- Source Mode: `MISSION-LED`
- Source Confidence: `HIGH` (Mission 기준)
- Source Gaps:
  - `b4-1-evaluation.md`가 공식 Evaluation이라는 provenance를 frozen Source Registry에서 확인하지 못했다.
  - 따라서 Evaluation 항목은 보조 검증으로 사용하되 공식 PASS 근거는 Mission PDF를 우선한다.

## 5. Mission Contract

### Goal

외부 프레임워크 없이 순수 HTML/CSS/JavaScript로 반응형 포트폴리오를 만들고, 사용자 이벤트 → 상태 변경 → DOM 업데이트 흐름과 GitHub API 비동기 상태 처리를 실제 결과물로 설명할 수 있게 한다.

### Required Deliverables

- [ ] 반응형 포트폴리오 웹사이트
- [ ] GitHub Repository URL
- [ ] GitHub Pages 배포 URL
- [ ] Desktop/Mobile/Dark mode 스크린샷
- [ ] README: 프로젝트 설명, 사용 기술, 배포 URL, 스크린샷, 변경 가능한 interaction threshold 설명

### Required Functions / Behaviors

- [ ] Hero/About/Skills/Projects/Contact/Footer 섹션
- [ ] 시맨틱 HTML + `alt` + `label for/id`
- [ ] CSS 변수, dark theme 변수, Flexbox nav, Grid projects
- [ ] Mobile-first, 768px/1024px breakpoint, mobile hamburger
- [ ] `defer`, `const/let`, `querySelector(All)`, `addEventListener`, `classList`
- [ ] hamburger / smooth scroll / scroll-top / nav scroll style / dark mode / IntersectionObserver
- [ ] Contact required/email validation + inline error + success state
- [ ] ES6+ arrow/template literal/destructuring + map/forEach
- [ ] GitHub API `fetch` + `async/await` + `try/catch`
- [ ] Projects loading/success/error+retry/empty UI, 403 rate-limit error UI
- [ ] 최소 3개의 상태→렌더링 흐름
- [ ] GitHub Pages 배포 후 핵심 기능 정상 동작

### Constraints

- React, Vue, jQuery, Bootstrap, Tailwind CSS 등 외부 UI/JS 라이브러리 금지
- 순수 HTML/CSS/JavaScript 사용
- Font Awesome / Google Fonts는 허용되지만 이번 최소 구현에서는 사용하지 않는다.
- `var` 금지
- HTML inline `onclick` 금지
- inline `style="..."` 금지
- 최신 Chrome에서 정상 동작해야 함
- GitHub API 인증 없는 호출은 rate limit을 고려하고 403을 에러 UI로 처리

### Explicit Non-scope

Mission의 보너스는 G8 완료를 지연시키지 않는다.

- 언어별 프로젝트 필터링
- 타이핑 효과
- Formspree/EmailJS 실제 전송
- 시스템 다크모드 자동 감지

## 6. Requirement Traceability

| ID | Requirement | Source | Location | Confidence | Implementation | Test | Evidence | Status |
|---|---|---|---|---|---|---|---|---|
| REQ-001 | `index.html`, `css/`, `js/`, `images/` 역할 분리 | Mission PDF | p2-3 | HIGH | repository tree | static tree check | tree | TODO |
| REQ-002 | semantic HTML + 6개 필수 섹션 + anchor nav | Mission PDF | p3 | HIGH | `index.html` | markup check | desktop/mobile | TODO |
| REQ-003 | 이미지 alt, form label 연결 | Mission PDF | p3 | HIGH | `index.html` | markup check | source/runtime | TODO |
| REQ-004 | CSS variables + dark variables + Flex/Grid | Mission PDF | p3 | HIGH | `css/style.css` | static check | source/runtime | TODO |
| REQ-005 | mobile-first + 768/1024 + mobile hamburger | Mission PDF | p3 | HIGH | CSS/JS | viewport runtime | mobile screenshot | TODO |
| REQ-006 | JS defer, const/let, addEventListener, DOM/classList | Mission PDF | p4 | HIGH | `js/app.js` | static check | source | TODO |
| REQ-007 | hamburger/smooth scroll/top/nav scroll/dark/scroll animation | Mission PDF | p4-5 | HIGH | CSS/JS | browser interaction | screen evidence | TODO |
| REQ-008 | dark mode localStorage persistence | Mission PDF | p4 | HIGH | `js/app.js` | reload runtime | dark screenshot | TODO |
| REQ-009 | Contact validation inline errors + success | Mission PDF | p5 | HIGH | HTML/JS | browser form runtime | form evidence | TODO |
| REQ-010 | ES6+ + map + forEach | Mission PDF | p5 | HIGH | `js/app.js` | static check | source | TODO |
| REQ-011 | GitHub API fetch/async-await/try-catch | Mission PDF | p5 | HIGH | `js/app.js` | browser/API | projects evidence | TODO |
| REQ-012 | loading/success/error+retry/empty and 403 UI | Mission PDF | p5, p7-8 | HIGH | state renderer | state tests/runtime | API evidence | TODO |
| REQ-013 | 3개 이상 event→state→DOM 흐름 | Mission PDF | p5-6 | HIGH | central `STATE` + render functions | code walkthrough | learning doc | TODO |
| REQ-014 | GitHub Pages URL에서 기능 정상 | Mission PDF | p2, p6 | HIGH | Pages | external runtime | deployed URL | TODO |
| REQ-015 | README project/tech/deploy/screenshots + thresholds | Mission PDF | p4-6 | HIGH | `README.md` | doc check | README | TODO |
| REQ-016 | no framework/var/inline onclick/style | Mission PDF | p6-7 | HIGH | all source | grep/static check | audit | TODO |

## 7. Evaluation Mapping

> Evaluation source는 `UNVERIFIED`이므로 아래는 보조 검증 매핑이다.

| Evaluation ID | Criterion | Related Requirement | Validation | Evidence | Status |
|---|---|---|---|---|---|
| EVA-001 | 반응형 레이아웃 | REQ-005 | viewport 375/768/1024+ | screenshots | TODO |
| EVA-002 | theme toggle + reload persistence | REQ-008 | click/reload | screenshot | TODO |
| EVA-003 | hamburger/scroll/top interactions | REQ-007 | browser interaction | runtime notes | TODO |
| EVA-004 | GitHub API + 4-state UI | REQ-011,012 | live + deterministic state hooks | screenshot/source | TODO |
| EVA-005 | form validation feedback | REQ-009 | invalid/valid input | runtime notes | TODO |
| EVA-006 | file separation/semantic/CSS variables/events | REQ-001,002,004,006 | static audit | source | TODO |
| EVA-007 | event→state→DOM / async-await / map / Flex/Grid explanation | REQ-004,010,011,013 | learning walkthrough | `docs/LEARNING.md` | TODO |
| EVA-008 | central STATE rationale + mobile-first explanation | REQ-005,013 | code/doc walkthrough | `docs/LEARNING.md` | TODO |

## 8. Repository Baseline

- Default Branch: `main`
- Baseline Commit: `8d8a8e738ecf16fd6c6053de4adcf21045f69ae3`
- Work Branch: `mission/b4-1`
- Runtime / Language: latest Chrome + HTML5/CSS/ES2020+
- Dependency Manager: none
- Existing Tests: `NO`

### Repository Inventory

```text
.
├── README.md
├── b4-1-evaluation.md
├── b4-1-mission.md
└── b4-1-mission.pdf
```

### Existing Implementation

- 이미 충족: Mission/Evaluation 문서 존재
- 부분 충족: 없음
- 누락: 실제 HTML/CSS/JS/images, 테스트, 배포, Evidence, 학습 문서, handoff
- 잘못 구현: 없음(구현 자체가 없음)

## 9. Mission-specific TOC

```text
B4-1
├── Source / Evaluation Discovery
├── Semantic HTML & Accessibility
├── CSS Tokens / Light-Dark Theme
├── Flex Navigation / Grid Projects
├── Mobile-first 768 / 1024
├── DOM / Events
├── Interaction Set
│   ├── Hamburger
│   ├── Smooth Scroll
│   ├── Scroll Top
│   ├── Nav Scroll State
│   ├── Dark Mode + localStorage
│   └── Intersection Observer
├── Contact Form UX
├── GitHub API State Machine
│   ├── Loading
│   ├── Success
│   ├── Error / 403 / Retry
│   └── Empty
├── Event → State → DOM Learning
├── GitHub Pages
├── Evidence
└── Handoff
```

## 10. Engineering Plan

### Prompt Engineering

- ROLE: B4-1 주 책임 개발자 + 교육 설계자 + 품질 관리자
- GOAL: Mission PDF 필수 요구를 최소 충분 구현으로 충족
- SCOPE: B4-1 repository only
- OUTPUT CONTRACT: source + tests + learning + runtime/evidence status + handoff
- STOP CONDITION: 필수 요구, test/runtime/evidence, BLOCKER=0, MAJOR=0, G8 완료

### Context Engineering

각 Gate에서 Mission PDF, 해당 소스, test/runtime 결과만 우선 사용한다.

### Harness Engineering

- Git boundary: `mission/b4-1`
- Test commands: `python3 tests/static_check.py`, browser/runtime checklist
- Secret boundary: API token/key를 소스에 저장하지 않음
- Evidence boundary: 실제/예상 출력 구분

### Loop Engineering

- Self review: 1회
- Independent review: 사용 가능한 독립 Agent가 있을 때 1회; 도구 부재 시 허위 실행하지 않음
- Re-validation: BLOCKER/MAJOR 수정 범위만

### Fusion Engineering

판정 우선순위: `Mission PDF → Test → Runtime → Evidence`

## 11. Agent Routing

- Orchestrator / Integrator: `ChatGPT`
- Primary Builder: `ChatGPT` (현재 Workcell에서 직접 저장소 쓰기 가능)
- Independent Reviewer: `CONDITIONAL` (별도 reviewer tool이 제공되지 않으면 self audit만 기록)
- Claude: `OFF`
- Gemini: `CONDITIONAL` (시각 Source는 제공된 PDF 렌더링으로 직접 검증)
- Grok: `OFF`
- Runtime Authority: `Human`

## 12. Dependency / Drift Check

- Upstream Dependency: `NONE`
- Related Mission: `NONE`
- Control Tower Drift: `NONE` (frozen baseline 사용)
- Source Drift: `NONE` (Mission PDF와 MD 핵심 요구 일치)
- Action: `CONTINUE`

## 13. Test Plan

| Test | Requirement | Command / Method | Expected | Actual | Status |
|---|---|---|---|---|---|
| Static structure | 001-006,010,011,016 | `python3 tests/static_check.py` | all checks pass | not run | TODO |
| Responsive | 005 | Chrome 375/768/1024+ | no broken layout | not run | NEEDS-RUNTIME |
| Interactions | 007-009 | Chrome click/input/scroll/reload | all flows work | not run | NEEDS-RUNTIME |
| API | 011-012 | live GitHub API + forced state hooks | 4-state UI | not run | NEEDS-RUNTIME |
| Pages | 014 | external URL | 200 + feature parity | not run | NEEDS-RUNTIME |

## 14. Runtime Plan

| Runtime Check | AI 가능 | Human 필요 | Evidence | Status |
|---|---|---|---|---|
| Desktop Chrome | limited | yes | screenshot | NEEDS-RUNTIME |
| Mobile viewport | limited | yes | screenshot | NEEDS-RUNTIME |
| Dark persistence | limited | yes | screenshot + reload | NEEDS-RUNTIME |
| Contact validation | limited | yes | runtime note/screenshot | NEEDS-RUNTIME |
| GitHub live API | limited | yes | projects screenshot | NEEDS-RUNTIME |
| GitHub Pages external URL | limited | yes | URL + screenshot | NEEDS-RUNTIME |

## 15. Evidence Plan

| Evidence | Requirement / Evaluation | Capture Method | Location | Status |
|---|---|---|---|---|
| Desktop | REQ-002/005 | screenshot | `docs/evidence/desktop.png` | TODO |
| Mobile | REQ-005 | screenshot | `docs/evidence/mobile.png` | TODO |
| Dark mode | REQ-008 | screenshot | `docs/evidence/dark.png` | TODO |
| API/Projects | REQ-011/012 | screenshot | `docs/evidence/projects.png` | TODO |
| Runtime checklist | 007-014 | actual observations | `docs/RUNTIME-EVIDENCE.md` | TODO |

## 16. Completion Gates

| Gate | Exit Condition | Status |
|---|---|---|
| G1 SOURCE | Source 상태·Mode·Gap·Requirement provenance 확정 | `PASS` |
| G2 BUILD | 필수 구현 존재 | TODO |
| G3 TEST | 필요한 자동/신뢰 가능한 Test 통과 | TODO |
| G4 REVIEW | BLOCKER=0, MAJOR=0 | TODO |
| G5 RUNTIME | 실제 환경 검증 완료 또는 정확한 NEEDS-RUNTIME | TODO |
| G6 EVIDENCE | 필수 Evidence 완성 | TODO |
| G7 LEARN | 학습 결과 기록 | TODO |
| G8 MERGE | Mission Repository PR/merge 완료 | TODO |

## 17. STOP Rule

공식 필수 Requirement가 충족되고, Evaluation Gap이 명시되며, BLOCKER=0, MAJOR=0, 필요한 Test/Runtime/Evidence/G8이 완료되면 미션 완료를 위한 추가 구현을 중단한다. 보너스는 Backlog로 유지한다.

## 18. Handoff Contract

Mission 종료 시 `HANDOFF.md`, `mission-result.yaml`을 남긴다. 대표 Repository는 직접 수정하지 않는다.
