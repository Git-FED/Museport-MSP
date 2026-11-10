# 03 — Login with Muse

The conversation says “Login with Muse” is already in the user's broader setup and proposes using it as an auth layer. This project does not implement Login with Muse and contains no verified Muse auth SDK, endpoint, OAuth configuration, or provider documentation. The separate `join.html` page uses the Supabase Auth client and credentials supplied in the accompanying FEDPromptly snippet; that is a distinct integration, not Login with Muse.

Before integration, identify the official supported protocol, issuer, client registration, redirect URI rules, scopes, token audience, rotation/revocation, logout semantics, account recovery, and data handling. Use an established OIDC/OAuth flow if officially supported; validate issuer and signatures server-side; use least privilege and short-lived sessions; never put client secrets in static files. Confirm the provider's current security and terms before relying on it.
