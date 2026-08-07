# B4-1 Runtime Evidence

> 이 문서는 **실제 관찰 결과만** 기록한다. 예상 결과를 PASS로 쓰지 않는다.

## Environment

- Date/Time: `TODO`
- Browser: `TODO` (최신 Chrome)
- Local URL: `http://localhost:8000`
- Deployed URL: `NEEDS-RUNTIME`
- Tester: `Human Runtime Authority`

## Runtime Checklist

| ID | Check | Expected | Actual | Status | Evidence |
|---|---|---|---|---|---|
| RT-01 | Desktop ≥1024px | 2-column layout, nav visible | not run | NEEDS-RUNTIME | `docs/evidence/desktop.png` |
| RT-02 | Mobile 375px | hamburger visible, nav hidden until toggle | not run | NEEDS-RUNTIME | `docs/evidence/mobile.png` |
| RT-03 | 768px transition | desktop nav appears | not run | NEEDS-RUNTIME | observation |
| RT-04 | Theme toggle | light ↔ dark | not run | NEEDS-RUNTIME | `docs/evidence/dark.png` |
| RT-05 | Theme reload | selected theme persists | not run | NEEDS-RUNTIME | observation |
| RT-06 | Smooth anchor scroll | target section reached smoothly | not run | NEEDS-RUNTIME | observation |
| RT-07 | Header 60px | `scrolled` visual state | not run | NEEDS-RUNTIME | observation |
| RT-08 | Scroll-top 300px | button visible; click goes to top | not run | NEEDS-RUNTIME | observation |
| RT-09 | Scroll reveal | section reveal on viewport entry | not run | NEEDS-RUNTIME | observation |
| RT-10 | Form blank | inline required errors | not run | NEEDS-RUNTIME | observation |
| RT-11 | Invalid email | inline email format error | not run | NEEDS-RUNTIME | observation |
| RT-12 | Valid form | success message; no network submit | not run | NEEDS-RUNTIME | observation |
| RT-13 | GitHub API live | loading → repository cards | not run | NEEDS-RUNTIME | `docs/evidence/projects.png` |
| RT-14 | API error/retry | error message + retry | not run | NEEDS-RUNTIME | observation |
| RT-15 | API empty | empty state message | not run | NEEDS-RUNTIME | observation |
| RT-16 | Console | no uncaught error | not run | NEEDS-RUNTIME | observation |
| RT-17 | GitHub Pages | external URL returns site | not run | NEEDS-RUNTIME | deployed URL + screenshot |

## Evidence Capture Rules

### Desktop

- viewport width: 1024px 이상
- Hero와 Projects 또는 전체 레이아웃이 식별되도록 캡처
- 저장: `docs/evidence/desktop.png`

### Mobile

- viewport width: 약 375px
- hamburger가 보이고 레이아웃이 한 열로 정리되는 상태
- 저장: `docs/evidence/mobile.png`

### Dark mode

- dark theme가 명확히 보이도록 캡처
- reload 후에도 유지되는지 별도 관찰 기록
- 저장: `docs/evidence/dark.png`

### Projects/API

- 실제 GitHub repository card가 표시된 상태
- 저장: `docs/evidence/projects.png`

## Runtime Notes

```text
TODO: Human Runtime 결과를 붙여 넣는다.
```

## Final Runtime Verdict

- Status: `NEEDS-RUNTIME`
- Blocking reason: 브라우저 UI와 GitHub Pages Settings/외부 URL은 현재 ChatGPT Workcell 도구만으로 실제 acceptance를 확정할 수 없음.
