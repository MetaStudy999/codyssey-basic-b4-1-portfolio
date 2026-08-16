# B4-1 R01 Environment

## Golden Path

- 현대 브라우저(Chrome/Edge/Firefox 등)
- VS Code + Live Server 권장
- 외부 UI/JS 라이브러리 없음
- GitHub public REST API 사용
- GitHub Pages 배포는 Phase C에서 실제 확인

## 로컬 실행

가장 단순한 방법은 VS Code Live Server입니다. Python이 있다면 Reference 확인용으로 다음도 사용할 수 있습니다.

```bash
cd training/round-01-clear/reference
python3 -m http.server 5500
```

브라우저에서 `http://localhost:5500`으로 접속합니다.

## Reference 검증

```bash
bash training/round-01-clear/environment/verify.sh
```

정적 검증은 HTML/CSS/JS 필수 구조와 금지 패턴을 확인하지만, 실제 responsive layout, GitHub API 네트워크 응답, localStorage 유지, GitHub Pages 외부 접속을 대신하지 않습니다.

## Secret

GitHub 공개 repository 조회에는 API Key를 저장하지 않습니다. 개인 Access Token을 프론트엔드 JavaScript에 넣으면 브라우저 사용자에게 노출되므로 금지합니다.
