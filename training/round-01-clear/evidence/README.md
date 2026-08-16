# B4-1 R01 — Evidence Guide

## 원칙

Reference 코드가 있다는 사실과 실제 브라우저/네트워크/배포가 동작한다는 사실을 분리합니다.

B4-1 필수 범위에는 API Key/Token/Password가 필요하지 않습니다. 비밀정보를 JavaScript나 Evidence에 넣지 않습니다.

## Runtime Evidence 최소 구조

Phase C에서 실제 결과로 작성합니다.

```text
evidence/runtime/
├── verify.txt
├── browser.md
├── api.md
├── deploy.md
└── evaluation.md
```

## 1. Static Verify

```bash
mkdir -p training/round-01-clear/evidence/runtime
bash training/round-01-clear/environment/verify.sh \
  | tee training/round-01-clear/evidence/runtime/verify.txt
```

마지막 줄 `Result: N PASS / 0 FAIL`을 실제 확인합니다.

## 2. Browser Evidence — `browser.md`

실제 브라우저에서 다음을 기록합니다.

- mobile 약 375px
- tablet 768px 이상
- desktop 1024px 이상
- hamburger open/close
- smooth section navigation
- 60px 이후 header style
- 300px 이후 top button
- top button click
- dark/light toggle
- reload 후 theme 유지
- IntersectionObserver reveal
- Contact 빈 값
- invalid email
- 정상 form 결과

스크린샷을 사용할 경우 개인 정보가 포함되지 않도록 확인합니다.

## 3. API Evidence — `api.md`

Network/화면에서 다음을 기록합니다.

- 실제 GitHub username
- request endpoint
- loading state
- HTTP success
- project cards
- fork filter 결과를 확인한 방법
- error state + `다시 시도`
- empty state를 재현한 방법

Error/empty를 억지로 가짜 성공으로 기록하지 않습니다. 필요하면 일시적으로 테스트 가능한 username/네트워크 조건을 사용한 뒤 원래 설정으로 되돌립니다.

## 4. Deploy Evidence — `deploy.md`

- GitHub Pages 설정 방식
- 실제 외부 URL
- 외부 URL 접속 시간
- CSS/JS/image relative path 정상
- API 정상
- mobile/desktop 정상
- 주요 interaction 정상
- README에 실제 deployment URL 반영 여부
- README에 실제 screenshots 반영 여부

Reference 단계에서는 URL을 추측해서 적지 않습니다.

## 5. Evaluation — `evaluation.md`

다음 질문을 실제 코드를 가리키며 자기 말로 정리합니다.

- HTML/CSS/JS 분리
- semantic tags
- CSS variables
- addEventListener vs onclick
- Event → STATE → Render
- async/await + try/catch
- filter/map/forEach
- Flexbox vs Grid
- explicit STATE 이유
- Mobile First 이유

## 6. 최종 Gate

모든 파일을 실제 내용으로 채운 후:

```bash
bash training/round-01-clear/environment/verify.sh --runtime
```

## CLEAR

정적 verify, 실제 브라우저, 실제 GitHub API, 실제 GitHub Pages, 설명형 평가 Evidence가 모두 충족되어야 `✅ CLEAR`입니다.
