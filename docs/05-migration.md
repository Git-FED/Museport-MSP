# 05 — Migration

The supplied record names Supabase, Cloudflare, and Google Sites as possible existing dependencies and describes a future direction away from some of them. It also recalls that no final decision to remove those services had been made. Preserve that distinction: exploration is not a migration decision.

Inventory dependencies, export and restore-test data, build staging, verify policy and security, measure performance, set DNS/HTTPS, test a rollback, and move one workload at a time. Do not cancel the old provider until the new version is verified and recovery is demonstrated. The repo can deploy as ordinary static files through GitHub Pages or Cloudflare Pages; that does not itself move data or domains.
