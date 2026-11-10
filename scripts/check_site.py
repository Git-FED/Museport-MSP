#!/usr/bin/env python3
"""Check local HTML navigation/assets, README references, and JSON/JSONC syntax."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.local_anchors = []
        self.has_symbol_favicon = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        href = attrs.get("href", "")
        if tag == "link" and attrs.get("rel", "").lower() == "icon" and href.endswith("assets/favicon.svg"):
            self.has_symbol_favicon = True
        for key in ("href", "src"):
            value = attrs.get(key, "")
            if value and not value.startswith(("https://", "http://", "data:", "#", "mailto:", "tel:")):
                self.refs.append(value)
        if tag == "a" and href and not href.startswith(("https://", "http://", "mailto:", "tel:", "#")):
            self.local_anchors.append(href)


errors = []
html_files = sorted(ROOT.glob("*.html"))
for page in html_files:
    parser = RefParser()
    parser.feed(page.read_text(encoding="utf-8"))
    if not parser.has_symbol_favicon:
        errors.append(f"{page.name}: missing symbolic SVG favicon")
    for ref in parser.refs:
        target = (page.parent / urlsplit(ref).path).resolve()
        if not target.exists():
            errors.append(f"{page.name}: missing local reference {ref}")
    for href in parser.local_anchors:
        path = urlsplit(href).path
        if path and not path.endswith(".html"):
            errors.append(f"{page.name}: local navigation should lead to an HTML page, got {href}")

readme = (ROOT / "README.md").read_text(encoding="utf-8")
for match in re.finditer(r"!?\[[^\]]*\]\(([^)]+)\)", readme):
    destination = match.group(1).split()[0].split("#", 1)[0]
    if not destination or destination.startswith(("https://", "http://", "mailto:", "#")):
        continue
    if not (ROOT / destination).resolve().exists():
        errors.append(f"README.md: missing local link or image {destination}")

for filename in ("msp/config-schema.json", "wrangler.jsonc", "wrangler.worker.jsonc"):
    try:
        json.loads((ROOT / filename).read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        errors.append(f"{filename}: invalid JSON/JSONC syntax: {exc}")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print(f"OK: {len(html_files)} HTML pages have the symbol favicon; local links/assets, README references, and three configs are valid.")
