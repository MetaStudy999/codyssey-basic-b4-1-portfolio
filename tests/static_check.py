#!/usr/bin/env python3
"""B4-1 source-level acceptance checks.

This script verifies requirements that can be checked reliably without a browser.
Browser interactions, responsive rendering, live GitHub API behavior, and Pages
availability remain runtime checks.
"""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
CSS = ROOT / "css" / "style.css"
JS = ROOT / "js" / "app.js"
IMAGE = ROOT / "images" / "profile.svg"

failures: list[str] = []
passes: list[str] = []


def check(condition: bool, message: str) -> None:
    if condition:
        passes.append(message)
    else:
        failures.append(message)


for path in (INDEX, CSS, JS, IMAGE):
    check(path.exists(), f"required file exists: {path.relative_to(ROOT)}")

if failures:
    for item in failures:
        print(f"FAIL: {item}")
    sys.exit(1)

html = INDEX.read_text(encoding="utf-8")
css = CSS.read_text(encoding="utf-8")
js = JS.read_text(encoding="utf-8")

for tag in ("header", "nav", "main", "section", "article", "footer"):
    check(bool(re.search(fr"<{tag}\b", html, re.IGNORECASE)), f"semantic tag <{tag}> is present")

for section_id in ("hero", "about", "skills", "projects", "contact"):
    check(f'id="{section_id}"' in html, f"section #{section_id} is present")

check("<footer" in html.lower(), "Footer section is present")
check('src="images/profile.svg"' in html, "profile image uses images/ asset")
check(bool(re.search(r"<img\b[^>]*\balt=\"[^\"]+\"", html, re.IGNORECASE)), "image has meaningful alt text")

for field in ("name", "email", "message"):
    check(bool(re.search(fr'<label\b[^>]*for="{field}"', html)), f"label is connected to #{field}")
    check(f'id="{field}"' in html, f"form field #{field} exists")

check('href="css/style.css"' in html, "external stylesheet is linked")
check(bool(re.search(r'<script\b[^>]*src="js/app\.js"[^>]*\bdefer\b', html)), "JavaScript is linked with defer")
check(not re.search(r"\bonclick\s*=", html, re.IGNORECASE), "no inline onclick handler")
check(not re.search(r"\sstyle\s*=", html, re.IGNORECASE), "no inline style attribute")

check(":root" in css, "CSS :root variables are defined")
check('[data-theme="dark"]' in css, "dark theme variables are defined")
check("display: flex" in css, "Flexbox is used")
check("display: grid" in css, "Grid is used")
check("auto-fit" in css and "minmax" in css, "Projects-compatible responsive Grid uses auto-fit/minmax")
check("@media (min-width: 768px)" in css, "768px breakpoint is present")
check("@media (min-width: 1024px)" in css, "1024px breakpoint is present")
check("box-shadow" in css and "transition" in css and ":hover" in css, "hover/transition/box-shadow effects are present")

check(not re.search(r"\bvar\s+[A-Za-z_$]", js), "JavaScript has no var declarations")
for token in ("querySelector(", "querySelectorAll(", "addEventListener(", "classList.add(", "classList.remove(", "classList.toggle("):
    check(token in js, f"JavaScript uses {token.rstrip('(')}")

for event_name in ('"click"', '"submit"', '"scroll"', '"input"'):
    check(event_name in js, f"JavaScript handles {event_name.strip(chr(34))} events")

check("preventDefault()" in js, "form/navigation default behavior is explicitly controlled")
check("localStorage.getItem" in js and "localStorage.setItem" in js, "dark theme persists with localStorage")
check("IntersectionObserver" in js and "OBSERVER_THRESHOLD = 0.25" in js, "scroll animation uses IntersectionObserver threshold >= 0.2")
check("NAV_SCROLL_THRESHOLD = 60" in js, "navigation scroll threshold is 60px")
check("SCROLL_TOP_THRESHOLD = 300" in js, "scroll-top threshold is 300px")

for token in ("fetch(", "async ()", "await fetch", "try {", "catch (error)"):
    check(token in js, f"GitHub API flow contains {token}")
check("api.github.com/users/${GITHUB_USER}/repos" in js, "GitHub repositories endpoint is configured")
check("response.status === 403" in js, "GitHub rate-limit 403 has a dedicated error path")

for status in ('"loading"', '"success"', '"error"'):
    check(status in js, f"project state includes {status}")
check("표시할 프로젝트가 없습니다" in js, "empty project state is rendered")
check("다시 시도" in html and "projectsRetry" in js, "project error state supports retry")

check(".filter(" in js, "Array.filter is used")
check(".map(" in js, "Array.map is used")
check(".forEach(" in js, "Array.forEach is used")
check("const STATE =" in js, "central STATE object is present")

prohibited = ("react", "vue", "jquery", "bootstrap", "tailwind")
implementation_text = f"{html}\n{css}\n{js}".lower()
for name in prohibited:
    check(name not in implementation_text, f"prohibited framework/library is absent: {name}")

print(f"PASS checks: {len(passes)}")
for item in passes:
    print(f"PASS: {item}")

if failures:
    print(f"FAIL checks: {len(failures)}")
    for item in failures:
        print(f"FAIL: {item}")
    sys.exit(1)

print("RESULT: static acceptance PASS; browser/runtime checks are still required.")
