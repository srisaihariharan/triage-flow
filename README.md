# PulseBridge Triage Integration

PulseBridge is a hackathon-ready, backend-focused healthcare data integration pipeline. It simulates patient intake, validates required vitals, applies deterministic triage rules, checks ward availability, and emits normalized triage cases through a clean operations dashboard. This is not a hospital app and contains mock data only.

## Structure

- `app/api/intake` — raw intake queue
- `app/api/triage` — validation and scoring
- `app/api/allocate` — ward assignment
- `app/api/cases` — normalized output
- `lib/` — validator, scorer, allocator, and pipeline orchestration
- `data/` — JSON mock intake, ward, and staff records
- `types/` — shared TypeScript contracts

## Clinical scoring rules

- Oxygen below 90: +5
- Systolic blood pressure below 90: +4
- Heart rate above 130: +3
- Temperature above 39°C: +2
- Age above 70: +1

Severity is Low (0–2), Moderate (3–5), High (6–8), or Critical (9+). If any required vital is null, the patient is flagged with `Incomplete vitals` and never receives a score.

## API

- `GET /api/intake` returns the raw queue.
- `POST /api/triage` accepts `{ "id": "PT-1042" }` and returns a triage result.
- `POST /api/allocate` accepts `{ "severity": "Critical" }` and returns a ward or `WAITLIST`.
- `GET /api/cases` returns normalized patient cases with vitals, triage, placement, and timestamps.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification tests

The dashboard includes three tests: queue count matches the dataset length, severity scores have a meaningful range, and missing vitals produce `FLAGGED` output rather than a score. Run `pnpm build` to verify the production bundle and TypeScript compilation.
