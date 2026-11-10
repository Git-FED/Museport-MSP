# MuseFM connector — proposal

The supplied notes say MuseFM has no direct-message endpoint and that messaging currently works through Muse AI, signing as `muse3`. Treat this as an unverified account of current behavior; confirm with official documentation and the service owner before relying on it.

A future connector could translate authorized MSP requests into supported Muse AI actions, then call the site API through FEDWIRE. It must not impersonate a person or bypass permissions. Define actor identity, consent, auditability, scope, response delivery, retries, and failure behavior. This repository contains no connector, token, or endpoint.
