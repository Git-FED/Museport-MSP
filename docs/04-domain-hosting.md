# 04 — Domain hosting

The vision mentions possibly moving `fedpromptly.com` to a Muse-based host in the future. This is an idea, not a decision or completed migration. A public domain needs an actual origin, reliable deployment, DNS ownership, HTTPS, renewal, monitoring, backups, an incident plan, and a tested rollback.

Checklist: confirm registrar and authoritative DNS; inventory A/AAAA/CNAME/TXT/MX/CAA records; document current TTL and origin; confirm the new platform supports custom domains and SSL; test redirects and canonical paths on staging; protect email-related records; schedule a cutover; monitor; retain the old environment until stability is established. See [the migration page](../migration.html).
