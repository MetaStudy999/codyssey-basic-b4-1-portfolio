# B4-1 R01 Environment

## Golden Path

- Modern browser
- Python 3 for simple local HTTP server
- optional Node.js for `node --check`
- Vanilla HTML/CSS/JavaScript only
- GitHub public API
- GitHub Pages는 Phase C에서 실제 설정

## Local Server

```bash
cd training/round-01-clear/reference
python3 -m http.server 8000
```

## Reference Verify

Repository root에서:

```bash
bash training/round-01-clear/environment/verify.sh
```

검사 범위:

- HTML/CSS/JS/images/reference docs
- semantic tags/sections/anchors/form labels
- CSS variables/Flex/Grid/mobile breakpoints
- JS DOM/events/localStorage/fetch/async/array methods
- explicit STATE theme/projects/form flows
- 60px/300px/0.2 thresholds
- forbidden framework/library references
- JavaScript syntax when Node is available
- Secret-pattern tracked filenames

## Runtime Verify

Phase C 실제 Evidence 이후:

```bash
bash training/round-01-clear/environment/verify.sh --runtime
```

필요 Evidence:

```text
evidence/runtime/verify.txt
evidence/runtime/browser.md
evidence/runtime/api.md
evidence/runtime/deploy.md
evidence/runtime/evaluation.md
```

정적 verify는 실제 browser/network/deployment를 대신하지 않습니다.
