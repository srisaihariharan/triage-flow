# PulseBridge Triage Integration Service

Backend-first healthcare triage integration pipeline for hackathon evaluation. PulseBridge uses local mock adapters only; it does not represent a hospital system or claim real clinical data.

## Architecture

`IntakeAdapter` -> normalization -> `VitalsValidator` -> deterministic `TriageScorer` -> supporting `ClinicalReferenceAdapter` -> `BedAllocationSolver` -> Zod canonical case.

Core implementation lives under `src/`: domain schemas, intake/clinical adapters, normalization, validation, scoring, allocation, orchestration, logging, and configuration. JSON fixtures live under `data/`; API routes are thin wrappers under `app/api/`.

## Data flow

`TriageIntegrationService.processQueue()` retrieves the complete queue, preserves each raw record, maps aliases into a strongly typed patient, rejects malformed/incomplete/impossible vitals without scoring, applies explicit rules, reads supporting guidance, consumes ward capacity, and emits a validated canonical case.

## Installation

```bash
npm install
npm test
npm run dev
```

The project uses Next.js App Router, TypeScript, Tailwind CSS, Zod, and Vitest. The evaluator can use npm; pnpm also works.

## Environment variables

Copy `.env.example` to `.env.local`. `INTAKE_API_URL` and `CLINICAL_REFERENCE_API_URL` are optional extension points. When unset, clearly labelled local mock adapters are used. Secrets remain server-side and are never returned to browser code.

## API

- `GET /api/intake` — complete raw intake queue.
- `POST /api/triage` — normalize, validate, and deterministically score one patient.
- `POST /api/allocate` — allocate a `LOW`, `MODERATE`, `HIGH`, or `CRITICAL` case.
- `POST /api/process` or `GET /api/process` — run the complete pipeline and return statistics plus cases.
- `GET /api/cases` — return normalized processed cases.
- `GET /api/wards` — return current local ward resources.
- `GET /api/health` — verify all local JSON data sources exist.

Errors return structured JSON and suitable 4xx/5xx status codes.

## Triage rules

- SpO2 below 90: +5
- Systolic BP below 90: +4
- Heart rate above 130: +3
- Temperature above 39°C: +2
- Age above 70: +1

Severity bands: 0–2 `LOW`, 3–5 `MODERATE`, 6–8 `HIGH`, 9+ `CRITICAL`. Missing, null, malformed, or impossible required vitals produce `FLAGGED` and never receive a score.

## Allocation logic

`CRITICAL -> ICU`, `HIGH -> EMERGENCY`, `MODERATE -> GENERAL`, `LOW -> OBSERVATION`. Allocation requires a matching ward, at least one bed, and at least one available staff member. Beds are consumed in the solver and unavailable placements become `WAITLIST`.

## Tests

```bash
npm test
npm run test:watch
```

Coverage includes queue parity, severity ordering, incomplete and impossible vitals, alias normalization, bed/staff availability, successful allocations, and competing patients.

## Replacing mock adapters

Implement `IntakeAdapter` or `ClinicalReferenceAdapter` with a server-side HTTP client, read the endpoint from configuration, validate external responses with Zod, and inject the adapter into `TriageIntegrationService`. The normalization, validation, scoring, allocation, and output contracts remain unchanged.

## Developer console

The root route is intentionally a small testing interface rather than the product. It can fetch intake data, run `/api/process`, inspect raw versus canonical records, view flagged/allocated outcomes, inspect the pipeline trace, and run browser-level contract checks.
