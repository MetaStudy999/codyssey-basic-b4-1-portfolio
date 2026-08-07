# B4-1 Mission Work Packet

> Control Tower는 READ ONLY이며, 이 문서는 `MetaStudy999/codyssey-basic-b4-1-portfolio`의 Workcell 상태만 기록한다.

## 1. Identity

- Mission ID: `B4-1`
- Mission Title: `나를 소개하는 웹페이지 처음부터 만들기`
- Mission Repository: `MetaStudy999/codyssey-basic-b4-1-portfolio`
- Workcell: `20260808-01 / chat 7`
- Started At: `2026-08-08T04:37:00+09:00`
- Work Branch: `mission/b4-1`
- Draft PR: `#1`

## 2. Frozen Control Tower Baseline

- Repository: `MetaStudy999/codyssey-basic`
- SHA: `0d1581b3e82366988f57e1d76da311c028b8e15e`
- Rule: Workcell 동안 고정, READ ONLY

읽은 governance context:

- `docs/00-governance/README.md`
- `docs/00-governance/multi-agent-mission-engineering.md`
- `docs/00-governance/source-discovery-fallback-protocol.md`
- `docs/00-governance/parallel-mission-execution.md`
- `docs/00-governance/source-registry.md`
- `docs/00-governance/work-packets/b4-1.md`

## 3. Read / Write Boundary

### READ

- frozen Control Tower baseline
- B4-1 Mission Repository
- B4-1 Mission PDF / Markdown / Evaluation 후보

### WRITE

- `MetaStudy999/codyssey-basic-b4-1-portfolio`의 `mission/b4-1`만

### DO NOT WRITE

- `MetaStudy999/codyssey-basic`
- 다른 Mission Repository

## 4. Source Inventory

| Candidate | Type | State | Location | Note |
|---|---|---|---|---|
| Mission | PDF | `VALID` | `b4-1-mission.pdf` | 필수 기능·제약·배포·증빙 포함 |
| Mission | Markdown | `DUPLICATE` | `b4-1-mission.md` | PDF 구조화 전사본, 핵심 요구 일치 |
| Evaluation | Markdown | `UNVERIFIED` | `b4-1-evaluation.md` | frozen Source Registry에서 공식 provenance 미확인 |
| Governance | official context | `VALID` | frozen Control Tower | Source/Gate/Workcell 운영에 한해 사용 |

- Source Mode: `MISSION-LED`
- Source Confidence: `HIGH` for Mission
- Source Gap: Evaluation provenance 미확인. Evaluation은 보조 검증으로만 사용하고 공식 요구 판정은 Mission PDF를 우선한다.

## 5. Mission Contract

### Goal

외부 프레임워크 없이 순수 HTML/CSS/JavaScript로 반응형 포트폴리오를 구현하고, `사용자 이벤트 → 상태 변경 → DOM 업데이트` 및 GitHub API 비동기 상태 흐름을 실제 코드로 설명할 수 있게 한다.

### Required Deliverables

- [x] 반응형 포트폴리오 소스 — `IMPLEMENTED`
- [x] GitHub Repository — 현재 저장소
- [ ] GitHub Pages 외부 URL — `NEEDS-RUNTIME`
- [ ] Desktop / Mobile / Dark screenshots — `NEEDS-RUNTIME`
- [x] README 프로젝트/기술/실행/interaction threshold — `TESTED`
- [ ] README 실제 배포 URL/스크린샷 — `NEEDS-RUNTIME`

### Required Behaviors

- [x] Hero / About / Skills / Projects / Contact / Footer
- [x] semantic HTML + image `alt` + form `label for/id`
- [x] CSS custom properties + dark variables + Flexbox nav + responsive Grid
- [x] mobile-first + 768px / 1024px breakpoints + hamburger 구현
- [x] JS `defer`, `const/let`, querySelector(All), addEventListener, classList
- [x] hamburger / smooth scroll / scroll-top / nav scroll state / dark mode / IntersectionObserver
- [x] Contact required/email validation + inline error + success UI
- [x] ES6+ arrow/template literal/destructuring + filter/map/forEach
- [x] GitHub API fetch + async/await + try/catch
- [x] Projects Loading / Success / Error+Retry / Empty + HTTP 403 rate-limit path
- [x] 최소 3개 state→render 흐름
- [ ] 실제 Chrome + GitHub Pages에서 acceptance 검증

### Constraints

- React / Vue / jQuery / Bootstrap / Tailwind CSS 등 외부 UI/JS 프레임워크 금지
- 순수 HTML/CSS/JavaScript
- `var` 금지
- inline `onclick` 금지
- inline `style` 금지
- 최신 Chrome 기준
- 인증 없는 GitHub API rate limit / 403 처리

### Explicit Non-scope

Mission bonus는 완료를 지연시키지 않는다.

- language project filter
- typing effect
- Formspree / EmailJS 실제 전송
- system dark-mode auto detection

## 6. Requirement Traceability

| ID | Requirement | Source | Implementation | Validation | Status |
|---|---|---|---|---|---|
| REQ-001 | `index.html`, `css/`, `js/`, `images/` 분리 | PDF p2-3 | repository tree | CI static | `TESTED` |
| REQ-002 | semantic HTML + required sections + nav | PDF p3 | `index.html` | CI + browser pending | `IMPLEMENTED` |
| REQ-003 | alt + label connection | PDF p3 | `index.html` | CI static | `TESTED` |
| REQ-004 | CSS vars/dark/Flex/Grid | PDF p3 | `css/style.css` | CI static | `TESTED` |
| REQ-005 | mobile-first + 768/1024 + hamburger | PDF p3 | CSS/JS | source + viewport pending | `IMPLEMENTED` |
| REQ-006 | defer/const-let/DOM/events/classList | PDF p4 | `js/app.js` | CI static + syntax | `TESTED` |
| REQ-007 | required interactions | PDF p4-5 | CSS/JS | browser pending | `IMPLEMENTED` |
| REQ-008 | dark localStorage persistence | PDF p4 | `js/app.js` | source + reload pending | `IMPLEMENTED` |
| REQ-009 | Contact validation UX | PDF p5 | HTML/JS | source + browser pending | `IMPLEMENTED` |
| REQ-010 | ES6+ / array methods | PDF p5 | `js/app.js` | CI static | `TESTED` |
| REQ-011 | GitHub API async flow | PDF p5 | `js/app.js` | source + live API pending | `IMPLEMENTED` |
| REQ-012 | loading/success/error/retry/empty/403 | PDF p5,7-8 | project state renderer | CI branches + live pending | `IMPLEMENTED` |
| REQ-013 | 3+ state→render flows | PDF p5-6 | theme/projects/form | review + learning doc | `TESTED` |
| REQ-014 | GitHub Pages URL | PDF p2,p6 | Pages Settings pending | external runtime | `NEEDS-RUNTIME` |
| REQ-015 | README + deploy + screenshots + thresholds | PDF p4-6 | `README.md` | content tested, artifacts pending | `IMPLEMENTED` |
| REQ-016 | no framework/var/inline handler/style | PDF p6-7 | source | CI static | `TESTED` |

## 7. Evaluation Mapping

> `b4-1-evaluation.md` is `UNVERIFIED`; this table is advisory.

| Evaluation | Related | Validation | Status |
|---|---|---|---|
| responsive layout | REQ-005 | Chrome 375 / 768 / 1024+ | `NEEDS-RUNTIME` |
| theme toggle + reload | REQ-008 | Chrome click/reload | `NEEDS-RUNTIME` |
| hamburger/scroll/top | REQ-007 | Chrome interaction | `NEEDS-RUNTIME` |
| GitHub API + state UI | REQ-011/012 | static branches + live success | `IMPLEMENTED` |
| form validation | REQ-009 | invalid/valid browser input | `NEEDS-RUNTIME` |
| structure/semantic/CSS/events | REQ-001/2/4/6 | CI | `TESTED` |
| explanation: state/async/map/Flex/Grid | REQ-004/10/11/13 | `docs/LEARNING.md` | `PASS` |
| central STATE/mobile-first explanation | REQ-005/13 | source + learning | `PASS` |

## 8. Repository Baseline

- Default branch: `main`
- Baseline commit: `8d8a8e738ecf16fd6c6053de4adcf21045f69ae3`
- Work branch: `mission/b4-1`
- PR: `#1` draft
- Baseline implementation: Mission/Evaluation docs only
- Current implementation: HTML/CSS/JS/image/tests/CI/learning/runtime/review docs

## 9. Mission TOC

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
├── Test / Independent Review
├── Browser Runtime / Pages
├── Evidence
└── Handoff
```

## 10. Engineering / Review Loop

- Builder / Integrator: ChatGPT
- Independent Reviewer: GitHub Copilot Pull Request Reviewer, exactly one review pass
- Review record: `docs/REVIEW.md`
- Copilot finding: one external-value `innerHTML` URL/star sanitization issue
- Integrator decision: `ACCEPT`
- Fix commits: `d2e34763807409021c0e17a5f29df735708cf8d0`, `db3b92b6b74dc0fc58d62ea213257885fbbfe02f`
- Revalidation: PR-head CI run `31213465789` — `success`
- Review thread: answered and resolved
- Remaining BLOCKER: `0`
- Remaining MAJOR: `0`
- Runtime authority: Human

## 11. Harness

Automated validation:

```bash
python3 tests/static_check.py
node --check js/app.js
python3 -m http.server 8000
curl http://127.0.0.1:8000/
```

- Secret boundary: token/key 저장 없음
- Evidence boundary: 실제 결과와 예상 결과 분리
- Browser/Pages는 자동 테스트가 대체하지 않는다.

## 12. Dependency / Drift Check

- Upstream dependency: `NONE`
- Related Mission dependency: `NONE`
- Control Tower drift: `NONE` — frozen baseline 유지
- Source drift: `NONE` — Mission PDF/MD 핵심 요구 일치
- Action: `CONTINUE`

## 13. Test Plan / Result

| Test | Actual | Status |
|---|---|---|
| Static acceptance | PR-head run `31213465789` success | `TESTED` |
| JavaScript syntax | PR-head run `31213465789` success | `TESTED` |
| Static HTTP serving | PR-head run `31213465789` success | `TESTED` |
| External-value sanitization regression checks | PR-head run `31213465789` success | `TESTED` |
| Responsive layout | not run | `NEEDS-RUNTIME` |
| Interactions / form / reload persistence | not run | `NEEDS-RUNTIME` |
| Live GitHub API | not run in actual browser | `NEEDS-RUNTIME` |
| GitHub Pages | not enabled/verified | `NEEDS-RUNTIME` |

## 14. Runtime Plan

| Runtime Check | Human Required | Evidence | Status |
|---|---:|---|---|
| Desktop Chrome ≥1024 | yes | screenshot | `NEEDS-RUNTIME` |
| Mobile Chrome ~375 | yes | screenshot | `NEEDS-RUNTIME` |
| 768 transition | yes | observation | `NEEDS-RUNTIME` |
| dark persistence | yes | screenshot + reload | `NEEDS-RUNTIME` |
| hamburger/scroll/top/header | yes | observation | `NEEDS-RUNTIME` |
| Contact validation | yes | observation | `NEEDS-RUNTIME` |
| GitHub live projects | yes | screenshot/observation | `NEEDS-RUNTIME` |
| GitHub Pages external URL | yes | URL + browser | `NEEDS-RUNTIME` |

## 15. Evidence Plan

| Evidence | Location | Status |
|---|---|---|
| CI | Actions run `31213465789` | `TESTED` |
| Independent review | `docs/REVIEW.md`, PR #1 | `PASS` |
| Desktop | `docs/evidence/desktop.png` | `NEEDS-RUNTIME` |
| Mobile | `docs/evidence/mobile.png` | `NEEDS-RUNTIME` |
| Dark mode | `docs/evidence/dark.png` | `NEEDS-RUNTIME` |
| Runtime record | `docs/RUNTIME-EVIDENCE.md` | `NEEDS-RUNTIME` |
| Pages URL | README / handoff | `NEEDS-RUNTIME` |

## 16. Completion Gates

| Gate | Exit Condition | Status |
|---|---|---|
| G1 SOURCE | Source/Mode/Gap/provenance fixed | `PASS` |
| G2 BUILD | required implementation exists | `IMPLEMENTED` |
| G3 TEST | reliable automated checks pass | `PASS` |
| G4 REVIEW | BLOCKER=0, MAJOR=0, independent review complete | `PASS` |
| G5 RUNTIME | actual Chrome + Pages acceptance | `NEEDS-RUNTIME` |
| G6 EVIDENCE | required screenshots + external URL | `NEEDS-RUNTIME` |
| G7 LEARN | implementation-aligned learning material | `PASS` |
| G8 MERGE | handoff/result + PR merge | `TODO` |

## 17. STOP Rule

Mission 필수 Requirement + 필요한 Test/Runtime/Evidence + BLOCKER 0 + MAJOR 0 + G8을 만족하면 즉시 종료한다. 보너스/대규모 리팩터링/MINOR/IMPROVEMENT는 B4-1 완료를 지연시키지 않는다.

## 18. Handoff Contract

G5/G6 완료 후 `HANDOFF.md`, `mission-result.yaml`을 준비하고 PR #1을 main으로 통합한다. Control Tower는 직접 수정하지 않는다.
