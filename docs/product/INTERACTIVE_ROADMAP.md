# Interactive Features Roadmap

**Status as of 27 November 2026.** This document keeps the Academy's planned interactive functionality in the product, and separates what is **operational** from what is **planned**. No planned feature has been removed.

Workshops are designed to be complete and fully usable **without AI**, using human role cards. AI is a later, additional layer: it attaches to the same steps and never sets an assessment status or a certificate.

## Status of the interactive features

| Feature | Status | First version (no external service) | Later version and external dependency |
|---|---|---|---|
| Speaking Studio | Planned (Stage 4: local-first version approved) | Recording and playback in the browser; recordings stay on the learner's device; timing, silent pauses, speaking-rate calculation | Optional upload only after a separately implemented and approved consent process, storage design, retention rules, DPIA and processor agreement |
| Transcription | Planned | — | Speech-to-text provider (account, API key, EU processing, processor agreement), DPIA, consent |
| Speaking performance analysis | Planned | Timing, pauses and rate measured locally (Stage 4) | Fillers and rate by section from a transcript (depends on transcription) |
| Six AI teachers | Planned (profiles and roles exist) | Role specifications and prompts written and reviewed | Language-model provider (account, API key, cost budget), DPIA, AI Act classification, transparency notices, prohibited-inference tests |
| Simulation Centre | Planned | Human role-card simulations in W3–W5 | AI roles for chair, reviewer, sceptic, journalist, using the workshop role cards as specification; same dependencies as the AI teachers |
| AI feedback | Planned | Human instructor feedback (workshops now; lesson assignments in Stage 3) | Same dependencies as the AI teachers; feedback limited to observable behaviour |
| Learner progress analytics | Planned (Stage 5) | Built from existing learning records | None |

## Planned AI-enhanced routes per workshop

These routes are **not operational** and are not described to learners as available.

| Workshop | Human version (current design) | Planned AI-enhanced route |
|---|---|---|
| W1 Voice and Presence Lab | Three rounds recorded on the learner's device; listener comprehension check; instructor-confirmed Competent | Speaking Studio measurements pre-filled in the round logs; AI Voice Coach drills |
| W2 Structure Clinic | Peer editor and outside-specialty listener role cards; instructor feedback | AI Presentation Coach feedback on message maps and openings |
| W3 Conference Simulation | Chair, reviewer and sceptical-peer role cards | AI Conference Audience |
| W4 Unexpected Questions | Question decks and questioner role cards | AI Conference Audience with escalating questions |
| W5 Media Interview Simulation | Journalist and producer role cards; recording on own device | AI Media Interviewer |
| W6 Group Coaching and Dress Rehearsal | Live session with an instructor | Optional AI rehearsal before the session |
