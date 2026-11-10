# FEDWIRE — transport concept

FEDWIRE is the proposed transport layer named in the supplied notes. This document does not define or claim an existing transport service.

A production transport must specify endpoint discovery, TLS policy, request/response framing, authentication, signing algorithm and key lifecycle, canonicalization, nonce/expiry rules, retries, idempotency, message size limits, rate limits, error taxonomy, observability, and availability targets. Use a reviewed standard rather than inventing cryptography. Do not transmit long-lived secrets in URLs or browser-side code.

The static site contains no transport client. A future prototype should begin with a local mock and synthetic settings, then undergo security review before connecting to real accounts.
