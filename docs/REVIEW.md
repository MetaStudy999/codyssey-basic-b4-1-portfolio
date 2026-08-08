# B4-1 Review Record

> 이 문서는 초기 코드 리뷰 기록을 보존하면서, PR 병합 이후 확보된 Runtime/Evidence 결과를 현재 `main` 기준으로 추가 동기화한 기록입니다. 실제 재현하지 않은 런타임 시나리오는 PASS로 과장하지 않습니다.

## Review Scope

검토 범위는 `AGENTS.md`에 따라 다음으로 제한했다.

- BLOCKER / MAJOR
- Mission 필수 요구 누락
- 자동 테스트 실패
- 코드/문서의 명백한 모순
- 실제 검증 없이 PASS로 표시한 항목
- secret / credential 노출

MINOR, 보너스 기능, 대규모 리팩터링은 B4-1 완료 Gate를 지연시키지 않는다.

---

## 1. Historical Self Review

초기 PR 리뷰 시점의 결과는 다음과 같다.

- Mission PDF 필수 소스 요구: 구현됨
- 금지 프레임워크 사용: 없음
- `var`, inline `onclick`, inline `style`: 없음
- secret/API token 하드코딩: 없음
- 브라우저/Pages 미실행 항목의 허위 PASS: 없음
- 당시 실제 Chrome/외부 배포 검증: `NEEDS-RUNTIME`

### Automated revalidation

Latest reviewed PR-head commit:

```text
db3b92b6b74dc0fc58d62ea213257885fbbfe02f
```

GitHub Actions run:

```text
31213465789 — conclusion: success
```

검증 범위:

- `python3 tests/static_check.py`
- `node --check js/app.js`
- `python3 -m http.server 8000` + `curl` entry-page check

---

## 2. Independent Review — GitHub Copilot

PR #1에 GitHub Copilot Pull Request Reviewer를 1회 요청했다.

- Review state: `COMMENTED`
- Reviewed files: 10 / 11
- Inline findings: 1

### Finding CR-001

**Location:** `js/app.js` / `projectCardTemplate()`

**Finding:** GitHub API에서 받은 `stars`와 `url`을 `innerHTML` 템플릿에 넣을 때 외부 값에 대한 충분한 coercion/URL validation이 없었다. `encodeURI()`만으로는 악의적인 URL scheme 또는 attribute 경계 문제를 방지하는 보장이 부족하다는 지적이었다.

**Integrator decision:** `ACCEPT`

**Severity for Workcell:** `MAJOR`로 취급하고 수정 후 재검증했다.

### Fix

`js/app.js`:

- `getSafeProjectUrl()` 추가
- `new URL()`로 파싱
- `https:`만 허용
- hostname `github.com`만 허용
- 실패 시 `https://github.com/MetaStudy999`로 fallback
- star count를 finite number로 coercion
- URL과 star count를 `escapeHtml()` 후 `innerHTML`에 삽입

`tests/static_check.py`:

- URL parser 존재 확인
- HTTPS 제한 확인
- `github.com` host 제한 확인
- finite star coercion 확인
- URL/star escaping 확인

관련 수정 커밋:

```text
d2e34763807409021c0e17a5f29df735708cf8d0
db3b92b6b74dc0fc58d62ea213257885fbbfe02f
```

### Resolution

Copilot inline comment에 수정 내용을 답변했고 review thread를 resolved 처리했다. 수정 후 PR-head CI run `31213465789`가 성공했다.

---

## 3. Code Review Gate Verdict

| Category | Remaining |
|---|---:|
| BLOCKER | 0 |
| MAJOR | 0 |
| Explicit Mission source-level omission | 0 known |
| Failing automated tests | 0 |
| False PASS | 0 |
| Secret / credential exposure | 0 known |

**G4 REVIEW:** `PASS`

이 판정은 코드/정적 검증 및 독립 리뷰에 대한 것이다. Runtime acceptance는 별도 항목으로 관리한다.

---

## 4. Post-Merge Runtime / Evidence Follow-up

PR #1은 `main`에 병합되었으며, 이후 실제 브라우저 증빙과 GitHub Pages 상태를 추가 확인했다.

- PR #1: `merged`
- Merge commit: `af590599e80c7a7b87acd0520b2de8093e466e96`
- GitHub Pages: `built`
- Pages source: `main / (root)`
- Public: `true`
- HTTPS enforced: `true`
- 배포 URL: https://metastudy999.github.io/codyssey-basic-b4-1-portfolio/

### Runtime verification status

| 항목 | 현재 상태 | 근거 |
|---|---|---|
| Desktop ≥1024px | `PASS` | `docs/evidence/desktop.png`, `responsive-1024.png` |
| Mobile 375px | `PASS` | `docs/evidence/mobile.png`, `mobile-menu.png` |
| 768px / 1024px responsive | `PASS` | `responsive-768.png`, `responsive-1024.png` |
| Dark mode | `PASS` | `dark.png` |
| Theme reload persistence | `PASS` | 실제 브라우저 관찰 + `localStorage` 구현 |
| Hamburger Menu | `PASS` | `mobile-menu.png` |
| Scroll Top | `PASS` | `mobile-scroll-top.png` + 실제 동작 확인 |
| Contact blank | `PASS` | `contact-empty.png` |
| Invalid email | `PASS` | `contact-invalid-email.png` |
| Valid form | `PASS` | `contact-success.png` |
| GitHub API Success | `PASS` | `projects.png`, `mobile-projects.png` |
| Console | `PASS` | `console-no-errors.png` |
| GitHub Pages | `PASS` | Pages 설정 PNG + 외부 URL 상태 |
| Smooth Scroll 보간 자체 | `PARTIAL` | 목적지 도달 및 구현 확인, 보간 과정은 별도 계측하지 않음 |
| Header 60px 정확한 전환 시점 | `PARTIAL` | 코드 기준값 확인, 픽셀 단위 런타임 계측 없음 |
| IntersectionObserver 0.25 정확한 진입 시점 | `PARTIAL` | 구현 확인, 정밀 런타임 계측 없음 |
| API Error + Retry | `NOT-RUNTIME-VERIFIED` | 코드 구현 확인, 실제 실패 상황 미재현 |
| API Empty | `NOT-RUNTIME-VERIFIED` | 코드 구현 확인, 실제 빈 응답 미재현 |

상세 Runtime 판정은 [`RUNTIME-EVIDENCE.md`](RUNTIME-EVIDENCE.md), 실제 PNG 인덱스는 [`evidence/README.md`](evidence/README.md)에서 확인한다.

---

## 5. Evaluation Follow-up

평가 후보 문항 기준 현재 판정은 다음과 같다.

| 상태 | 문항 수 |
|---|---:|
| `PASS` | 13 |
| `PARTIAL` | 2 |
| `FAIL` | 0 |

세부 추적은 [`EVALUATION-MAPPING.md`](EVALUATION-MAPPING.md), 답변 준비는 [`EVALUATION-ANSWERS.md`](EVALUATION-ANSWERS.md)에 정리되어 있다.

두 `PARTIAL`은 구현 결함으로 확인된 것이 아니라 다음 Runtime 경계 때문이다.

1. 인터랙션 항목 중 일부 스크롤 동작의 정밀 계측 미실시
2. GitHub API Error + Retry / Empty 실제 런타임 재현 미실시

---

## 6. Current Review Conclusion

| Category | Current |
|---|---:|
| BLOCKER | 0 |
| MAJOR | 0 |
| Source-level required omission | 0 known |
| Automated test failure | 0 |
| Secret exposure | 0 known |
| False PASS claim | 0 known |
| Evaluation | `13 PASS / 2 PARTIAL / 0 FAIL` |
| Runtime verdict | `PARTIAL-RUNTIME-VERIFIED` |

### Remaining runtime-only gaps

- GitHub API Error + Retry 실제 실패 시나리오
- GitHub API Empty 실제 빈 응답 시나리오
- Smooth Scroll / Header threshold / IntersectionObserver의 정밀 계측은 낮은 우선순위로 문서 경계를 유지

따라서 **G4 REVIEW는 계속 `PASS`**이며, 현재 남은 내용은 코드 리뷰 결함이 아니라 Runtime 증빙의 경계로 관리한다.
