# Codyssey Basic B4-1 — Vanilla Portfolio

## 현재 훈련 상태

- 구분: **필수 미션 (REQUIRED)**
- Round: **R01 — CLEAR**
- Runtime Mission 상태: **⬜ NOT STARTED**
- 현재 모드: **Phase A — REFERENCE BUILD**
- Reference 판정: **CORE READY**

Reference Complete Version은 준비되었지만 실제 브라우저/API/GitHub Pages/Evidence를 아직 수행하지 않았으므로 `✅ CLEAR`가 아닙니다.

## 공식 원본

- `b4-1-mission.pdf`
- `b4-1-mission.md`
- `b4-1-evaluation.md`

## 시작 위치

1. `training/round-01-clear/REFERENCE-STATUS.md`
2. `training/round-01-clear/REFERENCE-BUILD.md`
3. `training/round-01-clear/BEGINNER-GUIDE.md`
4. `training/round-01-clear/CHECKLIST.md`
5. `training/round-01-clear/reference/README.md`

## Reference 핵심

- semantic HTML
- mobile-first CSS
- Flexbox + Grid
- Vanilla JavaScript
- Event → STATE → Render
- theme localStorage
- GitHub API loading/success/error/empty/retry
- filter/map/forEach
- Contact validation
- GitHub Pages Runtime 계획

## 실행

```bash
cd training/round-01-clear/reference
python3 -m http.server 8000
```

## 검증

```bash
bash training/round-01-clear/environment/verify.sh
```

Phase C Evidence 이후:

```bash
bash training/round-01-clear/environment/verify.sh --runtime
```

## CLEAR 원칙

정적 코드와 Reference 문서만으로 CLEAR하지 않습니다. 실제 responsive browser, interaction, theme persistence, API states, form validation, GitHub Pages URL, 배포 사이트 재검증, Evaluation 설명과 Evidence 후에만 `✅ CLEAR`로 변경합니다.
