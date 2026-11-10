# 01 — Hosting settings

The concept proposes 15 configurable settings: custom domain; SSL; public/private toggle and password; direct uploads; storage meter; file manager; redirects/routes; custom 404; forms; visitor stats; scheduled runs; secrets; versions/rollback; DNS settings; and cache control.

For descriptions, requirements, and caveats, see [the HTML settings page](../settings.html). These are candidate capabilities, not currently implemented features. Each needs an owner, permission model, validation, audit log, failure behavior, and recovery plan. Destructive changes should be reversible where practical; secrets should be scoped and never echoed back in plaintext.
