#!/usr/bin/env bash
# B4-1 R01 verification-only helper.
# Reference mode: bash verify.sh
# Runtime evidence gate: bash verify.sh --runtime

set -u

PASS=0
FAIL=0
MODE="${1:-reference}"
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROUND_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
REPO_ROOT=$(cd "$SCRIPT_DIR/../../.." && pwd)
REF="$ROUND_DIR/reference"
HTML="$REF/index.html"
CSS="$REF/css/style.css"
JS="$REF/js/script.js"

pass() { echo "[PASS] $1"; PASS=$((PASS + 1)); }
fail() { echo "[FAIL] $1"; FAIL=$((FAIL + 1)); }
contains() { grep -Eq "$2" "$1"; }

for file in \
  "$HTML" "$CSS" "$JS" "$REF/images/profile-placeholder.svg" "$REF/README.md" \
  "$ROUND_DIR/docs/requirements-mapping.md" "$ROUND_DIR/docs/evaluation-qa.md" \
  "$ROUND_DIR/evidence/README.md"; do
  [ -f "$file" ] && pass "file exists: ${file#$REPO_ROOT/}" || fail "file missing: ${file#$REPO_ROOT/}"
done

for tag in header nav main section article footer; do
  contains "$HTML" "<$tag([ >])" && pass "semantic tag <$tag>" || fail "semantic tag <$tag> missing"
done

for id in hero about skills projects contact; do
  contains "$HTML" "id=\"$id\"" && pass "section #$id" || fail "section #$id missing"
done

for target in about skills projects contact; do
  contains "$HTML" "href=\"#$target\"" && pass "navigation anchor #$target" || fail "navigation anchor #$target missing"
done

contains "$HTML" '<script[^>]+defer' && pass "JavaScript defer" || fail "JavaScript defer missing"
contains "$HTML" '<img[^>]+alt="[^"]+"' && pass "image alt text" || fail "meaningful image alt missing"

FORM_OK=true
for field in name email message; do
  if ! contains "$HTML" "<label[^>]+for=\"$field\"" || ! contains "$HTML" "id=\"$field\""; then
    FORM_OK=false
  fi
done
[ "$FORM_OK" = true ] && pass "form label/id associations" || fail "form label/id associations"

for pattern in ':root' '\[data-theme="dark"\]' 'display: flex' 'display: grid' 'repeat\(auto-fit, minmax' '@media \(min-width: 768px\)' '@media \(min-width: 1024px\)' 'box-shadow' 'transition'; do
  contains "$CSS" "$pattern" && pass "CSS requirement: $pattern" || fail "CSS requirement missing: $pattern"
done

for pattern in \
  'const STATE[[:space:]]*=' \
  'querySelector\(' 'querySelectorAll\(' 'addEventListener\(' \
  'classList\.(add|remove|toggle)' 'event\.preventDefault\(\)' \
  'localStorage\.getItem' 'localStorage\.setItem' \
  'fetch\(' 'async \(' 'await ' 'try[[:space:]]*\{' 'catch[[:space:]]*\(' \
  '\.map\(' '\.filter\(' '\.forEach\(' \
  'IntersectionObserver' 'scrollIntoView' 'window\.scrollTo'; do
  contains "$JS" "$pattern" && pass "JS requirement: $pattern" || fail "JS requirement missing: $pattern"
done

for event in click submit scroll input; do
  contains "$JS" "addEventListener\('$event'" && pass "event handled: $event" || fail "event missing: $event"
done

contains "$JS" 'NAV_SCROLL_THRESHOLD[[:space:]]*=[[:space:]]*60' && pass "nav threshold documented in code: 60" || fail "nav threshold 60 missing"
contains "$JS" 'TOP_BUTTON_THRESHOLD[[:space:]]*=[[:space:]]*300' && pass "top threshold documented in code: 300" || fail "top threshold 300 missing"
contains "$JS" 'OBSERVER_THRESHOLD[[:space:]]*=[[:space:]]*0\.2' && pass "IntersectionObserver threshold 0.2" || fail "IntersectionObserver threshold 0.2 missing"

for state in loading success error empty; do
  contains "$JS" "status:[[:space:]]*'$state'|'$state'" && pass "project state: $state" || fail "project state missing: $state"
done

contains "$JS" '다시 시도' && pass "API error retry UI text" || fail "API error retry UI missing"
contains "$JS" 'STATE\.theme' && contains "$JS" 'STATE\.projects' && contains "$JS" 'STATE\.form' && pass "3 state→render flows represented" || fail "STATE theme/projects/form flows missing"

if grep -Eq '(^|[^[:alnum:]_$])var[[:space:]]+' "$JS"; then fail "var usage detected"; else pass "no var usage"; fi
if grep -Eq 'onclick=' "$HTML"; then fail "inline onclick detected"; else pass "no inline onclick"; fi

if grep -Eqi '(react|vue|jquery|bootstrap|tailwind)(\.min)?\.(js|css)|cdn.*(react|vue|jquery|bootstrap|tailwind)' "$HTML"; then
  fail "forbidden frontend framework/library reference detected"
else
  pass "no forbidden frontend framework/library reference"
fi

if command -v node >/dev/null 2>&1; then
  if node --check "$JS" >/tmp/b4-1-node-check.out 2>&1; then pass "JavaScript syntax"; else fail "JavaScript syntax"; cat /tmp/b4-1-node-check.out; fi
else
  echo "[INFO] node not installed; JavaScript syntax check deferred to browser/runtime"
fi

if command -v git >/dev/null 2>&1 && git -C "$REPO_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  TRACKED=$(git -C "$REPO_ROOT" ls-files 'training/round-01-clear/**' | grep -E '(^|/)(\.env($|\.)|.*\.(key|pem)$|secrets/)' || true)
  [ -z "$TRACKED" ] && pass "no tracked Secret-pattern files" || fail "tracked Secret-pattern files detected"
fi

if [ "$MODE" = "--runtime" ] || [ "$MODE" = "runtime" ]; then
  RUNTIME_DIR="$ROUND_DIR/evidence/runtime"
  for file in verify.txt browser.md api.md deploy.md evaluation.md; do
    [ -s "$RUNTIME_DIR/$file" ] && pass "runtime evidence exists: evidence/runtime/$file" || fail "runtime evidence missing: evidence/runtime/$file"
  done
fi

echo
printf 'Result: %d PASS / %d FAIL\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ]
