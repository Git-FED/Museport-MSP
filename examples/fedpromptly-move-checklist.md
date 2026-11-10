# fedpromptly.com — move checklist

A planning checklist only. No domain or DNS change is made by this repository.

- [ ] Confirm owner approval, registrar access, and target platform feasibility.
- [ ] Inventory current pages, APIs, data, forms, auth, third parties, analytics, and scheduled jobs.
- [ ] Export data and prove restore from a separate copy.
- [ ] Verify target platform's policies, capacity, custom domain, TLS, uptime, backup, and recovery.
- [ ] Build staging; test all paths, forms, auth callbacks, redirects, assets, 404, and mobile layouts.
- [ ] Record DNS zones including MX/TXT/CAA; preserve mail routing and verification records.
- [ ] Define cutover time, monitoring owner, rollback trigger, and rollback steps.
- [ ] Lower DNS TTL in advance where appropriate; do not guess record values.
- [ ] Perform final sync, integrity checks, and explicitly approved DNS cutover.
- [ ] Monitor and retain the old provider until the rollback window closes.
- [ ] Update documentation and test recovery after cutover.
