# B4-1 Runtime Evidence

> 이 문서는 **실제 관찰 결과와 코드/정적 검증을 구분**하여 기록합니다. 실제 재현하지 않은 항목은 PASS로 과장하지 않습니다.

## Environment

- Verification date: `2026-08-09`
- Browser: 증빙 캡처 브라우저 (정확한 버전 미기록)
- Local development URL: `http://localhost:8000`
- Deployed URL: https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/
- Deployment: GitHub Pages, `main / (root)`, public, HTTPS enforced
- Evidence index: [`docs/evidence/README.md`](evidence/README.md)

## Status Legend

| 상태 | 의미 |
|---|---|
| `PASS` | 실제 브라우저/배포 환경에서 확인되었거나 직접 증빙이 존재함 |
| `PARTIAL` | 구현은 확인되었으나 런타임 동작의 일부를 독립적으로 계측/증빙하지 못함 |
| `NOT-RUNTIME-VERIFIED` | 코드 구현은 확인되지만 해당 런타임 시나리오를 실제로 재현하지 않음 |

## Runtime Checklist

| ID | Check | Actual | Status | Evidence / 근거 |
|---|---|---|---|---|
| RT-01 | Desktop ≥1024px | 데스크톱 레이아웃 정상 표시 | `PASS` | [`desktop.png`](evidence/desktop.png), [`responsive-1024.png`](evidence/responsive-1024.png) |
| RT-02 | Mobile 375px | 모바일 레이아웃 및 햄버거 메뉴 상태 확인 | `PASS` | [`mobile.png`](evidence/mobile.png), [`mobile-menu.png`](evidence/mobile-menu.png) |
| RT-03 | 768px / 1024px responsive | 주요 반응형 구간 레이아웃 확인 | `PASS` | [`responsive-768.png`](evidence/responsive-768.png), [`responsive-1024.png`](evidence/responsive-1024.png) |
| RT-04 | Theme toggle | 다크 모드 적용 상태 확인 | `PASS` | [`dark.png`](evidence/dark.png) |
| RT-05 | Theme reload persistence | 새로고침 후 선택 테마 유지 확인 | `PASS` | 실제 브라우저 관찰 기록 + `localStorage` 구현 |
| RT-06 | Smooth anchor scroll | 네비게이션 클릭 후 대상 섹션 도달 확인. 스크롤 보간 애니메이션 자체는 별도 계측하지 않음 | `PARTIAL` | 실제 관찰 + `scrollIntoView({ behavior: "smooth" })` 구현 |
| RT-07 | Header 60px state | `60px` 기준 구현 확인. 정확히 60px에서 전환되는 순간은 별도 런타임 계측하지 않음 | `PARTIAL` | `NAV_SCROLL_THRESHOLD = 60`, `.site-header.scrolled` 구현 |
| RT-08 | Scroll-top 300px | 버튼 표시 및 상단 이동 동작 확인 | `PASS` | [`mobile-scroll-top.png`](evidence/mobile-scroll-top.png) + 실제 동작 확인 |
| RT-09 | Scroll reveal | `IntersectionObserver` 기반 reveal 구현 확인. 정확한 threshold 진입 시점은 별도 계측하지 않음 | `PARTIAL` | `OBSERVER_THRESHOLD = 0.25`, `.reveal.is-visible` 구현 |
| RT-10 | Form blank | 필수 입력값 오류 표시 확인 | `PASS` | [`contact-empty.png`](evidence/contact-empty.png) |
| RT-11 | Invalid email | 이메일 형식 오류 표시 확인 | `PASS` | [`contact-invalid-email.png`](evidence/contact-invalid-email.png) |
| RT-12 | Valid form | 정상 입력 후 성공 상태 및 폼 초기화 흐름 확인 | `PASS` | [`contact-success.png`](evidence/contact-success.png) |
| RT-13 | GitHub API success | 실제 저장소 카드 렌더링 확인 | `PASS` | [`projects.png`](evidence/projects.png), [`mobile-projects.png`](evidence/mobile-projects.png) |
| RT-14 | API error + Retry | Error UI와 Retry 구현은 코드에서 확인했으나 실제 실패 상황 재현은 하지 않음 | `NOT-RUNTIME-VERIFIED` | `renderProjects()` error 분기 + `projectsRetry` 구현 |
| RT-15 | API empty | Empty UI 구현은 코드에서 확인했으나 실제 빈 응답 재현은 하지 않음 | `NOT-RUNTIME-VERIFIED` | `status === "success" && items.length === 0` 분기 |
| RT-16 | Console | DevTools Console 오류/경고/Issues 없음 확인 | `PASS` | [`console-no-errors.png`](evidence/console-no-errors.png) |
| RT-17 | GitHub Pages | 외부 배포 및 Pages 설정 확인. Pages 상태 `built`, public, `main /`, HTTPS enforced | `PASS` | [`github-pages-settings.png`](evidence/github-pages-settings.png), [`github-pages-settings-crop.png`](evidence/github-pages-settings-crop.png), 배포 URL |

## Verified Evidence Set

실제 PNG 증빙은 [`docs/evidence/README.md`](evidence/README.md)에서 목적별로 확인할 수 있습니다.

- Desktop / Theme
- Responsive Layout
- Mobile / Interaction
- Contact Form Validation
- GitHub API / Dynamic Projects
- Developer Console / GitHub Pages Deployment

## Runtime Boundary

현재 실제 런타임 PASS로 처리하지 않은 항목은 다음과 같습니다.

1. GitHub API 오류 상태 + Retry UI의 실제 실패 시나리오 재현
2. GitHub API 빈 응답 상태의 실제 재현
3. Smooth Scroll의 보간 애니메이션 자체에 대한 독립 계측
4. Header `60px` 전환 시점의 별도 런타임 계측
5. IntersectionObserver `threshold = 0.25` 진입 시점의 별도 런타임 계측

위 항목은 **미구현을 의미하지 않습니다.** 현재 코드에서 구현은 확인되며, 이 문서에서는 실제 브라우저 재현 여부만 별도로 구분합니다.

## Final Runtime Verdict

- Overall: `PARTIAL-RUNTIME-VERIFIED`
- Confirmed: 데스크톱/모바일/반응형, 다크 모드 및 유지, 햄버거 메뉴, Scroll Top, Contact 검증 3종, GitHub API 성공 렌더링, Console, GitHub Pages 배포
- Remaining runtime-only gaps: API Error/Retry, API Empty, 일부 스크롤 동작의 정확한 임계값/애니메이션 계측
- Implementation blocker observed: 없음
