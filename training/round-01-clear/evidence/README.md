# B4-1 R01 — Evidence Guide

## 1. Static Verify

```bash
bash training/round-01-clear/environment/verify.sh
```

실제 `Result: N PASS / 0 FAIL`을 저장합니다.

## 2. Responsive

브라우저 DevTools에서 최소 다음 폭을 확인합니다.

- Mobile: 375px 전후
- Tablet: 768px 전후
- Desktop: 1024px 이상

확인:

- nav/hamburger
- Hero/About/Skills/Projects/Contact/Footer
- card grid overflow 없음
- text/image/form 가독성

## 3. Interaction

- hamburger open/close
- anchor smooth scroll
- 60px 이상 nav style 변화
- 300px 이상 scroll-top button
- dark/light toggle
- reload 후 dark mode 유지
- reveal animation
- invalid/valid contact form

## 4. GitHub API

- loading
- success project cards
- empty 상태(테스트 계정/임시 코드가 아니라 안전한 조건에서 확인)
- error 상태(DevTools offline/network 실패 등)
- API URL에 Secret/Token 없음

## 5. GitHub Pages

- 외부 접속 URL
- 다른 네트워크/시크릿 브라우징에서도 접근
- Projects API 정상 렌더링
- console 치명적 오류 없음

## 6. Accessibility

- keyboard tab 이동
- skip link
- visible focus
- alt text
- label 연결
- menu/theme aria state

## CLEAR

정적 구조만으로 CLEAR하지 않습니다. 실제 browser/API/Pages URL과 설명형 평가까지 확인합니다.
