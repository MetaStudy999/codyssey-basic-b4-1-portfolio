# B4-1 Review Record

## Review Scope

검토 범위는 `AGENTS.md`에 따라 다음으로 제한했다.

- BLOCKER / MAJOR
- Mission 필수 요구 누락
- 자동 테스트 실패
- 코드/문서의 명백한 모순
- 실제 검증 없이 PASS로 표시한 항목
- secret / credential 노출

MINOR, 보너스 기능, 대규모 리팩터링은 B4-1 완료 Gate를 지연시키지 않는다.

## 1. Self Review

### Result

- Mission PDF 필수 소스 요구: 구현됨
- 금지 프레임워크 사용: 없음
- `var`, inline `onclick`, inline `style`: 없음
- secret/API token 하드코딩: 없음
- 브라우저/Pages 미실행 항목의 허위 PASS: 없음
- 실제 Chrome/외부 배포 검증: `NEEDS-RUNTIME`으로 유지

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

Copilot inline comment에 수정 내용을 답변했고 review thread를 resolved 처리했다. 수정 후 최신 PR-head CI run `31213465789`가 성공했다.

## 3. Review Gate Verdict

| Category | Remaining |
|---|---:|
| BLOCKER | 0 |
| MAJOR | 0 |
| Explicit Mission source-level omission | 0 known |
| Failing automated tests | 0 |
| False PASS | 0 |
| Secret / credential exposure | 0 known |

**G4 REVIEW:** `PASS`

단, 다음 항목은 코드 리뷰가 아니라 실제 환경 acceptance 대상이므로 별도로 남긴다.

- responsive layout 375 / 768 / 1024+
- hamburger / smooth scroll / scroll-top / header scroll behavior
- dark-mode reload persistence
- form interaction UX
- live GitHub API rendering
- GitHub Pages external URL
- required screenshots

위 항목의 상태는 `NEEDS-RUNTIME`이며 `docs/RUNTIME-EVIDENCE.md`에서 실제 결과만 기록한다.
