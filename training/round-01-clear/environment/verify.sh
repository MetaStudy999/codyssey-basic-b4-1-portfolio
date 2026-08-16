#!/usr/bin/env bash
# B4-1 R01 static verification helper.

set -u

PASS=0
FAIL=0
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROUND_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
REF="$ROUND_DIR/reference"
HTML="$REF/index.html"
CSS="$REF/css/style.css"
JS="$REF/js/script.js"

pass() { echo "[PASS] $1"; PASS=$((PASS + 1)); }
fail() { echo "[FAIL] $1"; FAIL=$((FAIL + 1)); }
contains() { grep -Eq "$2" "$1"; }

for file in "$HTML" "$CSS" "$JS" "$REF/images/profile-placeholder.svg"; do
  [ -f "$file" ] && pass "file exists: ${file#$ROUND_DIR/}" || fail "file missing: ${file#$ROUND_DIR/}"
done

for tag in header nav main section article footer; do
  contains "$HTML" "<$tag([ >])" && pass "semantic tag <$tag>" || fail "semantic tag <$tag> missing"
done

for id in hero about skills projects contact; do
  contains "$HTML" "id=\"$id\"" && pass "section #$id" || fail "section #$id missing"
done

if contains "$HTML" '<script[^>]+defer'; then pass "JavaScript defer"; else fail "JavaScript defer missing"; fi
if contains "$HTML" '<img[^>]+alt="[^"]+"'; then pass "image alt text"; else fail "meaningful image alt missing"; fi
if contains "$HTML" '<label[^>]+for="name"' && contains "$HTML" 'id="name"' && contains "$HTML" '<label[^>]+for="email"' && contains "$HTML" 'id="email"'; then
  pass "form label/id association"
else
  fail "form label/id association"
fi

for pattern in ':root' '\[data-theme="dark"\]' 'display: flex' 'display: grid' 'repeat\(auto-fit, minmax' '@media \(min-width: 768px\)' '@media \(min-width: 1024px\)' 'box-shadow' 'transition'; do
  contains "$CSS" "$pattern" && pass "CSS requirement: $pattern" || fail "CSS requirement missing: $pattern"
done

for pattern in 'querySelector\(' 'querySelectorAll\(' 'addEventListener\(' 'classList\.(add|remove|toggle)' 'event\.preventDefault\(\)' 'localStorage\.(getItem|setItem)' 'fetch\(' 'async \(' 'await ' 'IntersectionObserver' 'scrollIntoView' 'window\.scrollTo'; do
  contains "$JS" "$pattern" && pass "JS behavior: $pattern" || fail "JS behavior missing: $pattern"
done

if grep -Eq '(^|[^[:alnum:]_$])var[[:space:]]+' "$JS"; then fail "var usage detected"; else pass "no var usage"; fi
if grep -Eq 'onclick=' "$HTML"; then fail "inline onclick detected"; else pass "no inline onclick"; fi

if command -v node >/dev/null 2>&1; then
  if node --check "$JS" >/tmp/b4-1-node-check.out 2>&1; then pass "JavaScript syntax"; else fail "JavaScript syntax"; fi
else
  echo "[INFO] node not installed; browser JavaScript syntax check deferred"
fi

echo
printf 'Result: %d PASS / %d FAIL\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ]
