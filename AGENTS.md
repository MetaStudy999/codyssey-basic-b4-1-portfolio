# AGENTS.md — B4-1 Review Contract

## Source of Truth

1. `b4-1-mission.pdf`
2. `b4-1-mission.md`
3. `b4-1-evaluation.md` — `UNVERIFIED`, advisory only
4. `MISSION-WORK-PACKET.md`
5. implementation / tests / runtime evidence

The frozen Control Tower baseline is `MetaStudy999/codyssey-basic@0d1581b3e82366988f57e1d76da311c028b8e15e` and is READ ONLY.

## Review Scope

Report only:

- BLOCKER
- MAJOR
- explicit Mission requirement omissions
- test failures
- code/document contradictions
- false PASS claims
- secret/credential exposure

Do not redesign the portfolio or expand optional bonus work.

## Forbidden Changes

- Do not introduce React, Vue, jQuery, Bootstrap, Tailwind CSS, or other UI frameworks.
- Do not add npm/build tooling unless an official requirement demands it.
- Do not replace the beginner-readable event → state → DOM structure with an abstraction layer.
- Do not mark browser, API, screenshot, or GitHub Pages runtime as PASS without actual evidence.
- Do not modify the Control Tower or any other Mission repository.

## Beginner Learning Preservation

The implementation intentionally keeps:

- semantic HTML in `index.html`
- mobile-first CSS in `css/style.css`
- a visible central `STATE` object in `js/app.js`
- named render/handler functions that show event → state → DOM updates
- `filter`, `map`, `forEach`, `fetch`, `async/await`, `try/catch`, and `localStorage` in direct use

Preserve those learning surfaces unless they violate a Mission requirement.

## Status Definitions

- `TODO`: not implemented/run
- `IMPLEMENTED`: code/config exists, runtime not verified
- `TESTED`: reliable automated test passed
- `PASS`: implementation + required runtime/evidence complete
- `NEEDS-RUNTIME`: actual browser/user/external environment required
- `BLOCKED`: cannot continue due to external condition

## Test Commands

```bash
python3 tests/static_check.py
```

Runtime checks are listed in `docs/RUNTIME-EVIDENCE.md`.

## Stop Condition

Stop review when:

- BLOCKER = 0
- MAJOR = 0
- no explicit Mission requirement omission remains in source-level implementation
- no secret exposure or false PASS claim exists

MINOR/IMPROVEMENT items must not delay the Mission and should be left as backlog notes.
