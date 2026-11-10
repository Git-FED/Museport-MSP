# Museport (MSP) — concept specification

**Status: proposal / not an implemented or approved standard.** Museport is the selected project name for “Muse Settings Protocol” (MSP), with FEDWIRE as the proposed transport layer.

## Goal
Allow an authorized operator, potentially through Muse AI, to inspect and change a site's settings through a direct configuration API.

## Proposed request envelope
- `protocol`: `msp`; `version`: explicit semantic version.
- `site_id`: stable site identifier; `request_id`: unique idempotency key.
- `issued_at` and expiry: bounded clock skew and replay protection.
- `actor`, `operation`, `resource`, and validated `payload`.
- Signature/auth context: references only; secrets never included in logs.

## Required safeguards
Authentication and per-site authorization; signed requests; replay resistance; validation; rate limits; audit records; redacted errors; secret rotation; revocation; dry runs; idempotency; rollback; version negotiation; and documented transport security.

## Candidate operations
Read settings; validate candidate config; dry-run; apply a scoped change; inspect operation status; roll back to a prior version. Operations must be separately authorized.

This sketch needs threat modeling, security review, wire format, compatibility rules, and service-owner approval before implementation.
