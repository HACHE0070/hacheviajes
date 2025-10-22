# Review Checklists

## Design Review Checklist (Admin Panel)
- Scope matches story and ACs
- Flows cover list → form → success, and empty/error/loading states
- Responsive breakpoints (≥1280 desktop, 1024 tablet) acceptable
- Contrast ≥ 4.5:1; focus states visible; keyboard nav paths defined
- Interaction notes: validation, error copy, confirmations, destructive actions
- Tokens used (color/typography/spacing); components reuse where possible

## Code Review Checklist
- Small PR (≤ 300 LOC diff), clear title/description
- Feature behind flag `adminPanel`; guarded by server-side RBAC
- Lint/types/tests pass; Storybook stories added/updated
- API contracts validated; input sanitized; errors standardized
- Lists: paginated, searchable, sortable; query params preserved
- Forms: controlled, proper validation, optimistic updates only where safe
- a11y: no Axe criticals; semantic HTML; labels/aria; keyboard traps avoided
- Perf: avoid N+1; paginate; debounce search; bundle delta within budget
- Telemetry: key events emitted; audit log on create/update/delete

## QA Checklist
- Access control: non-admin blocked (403) on pages and APIs
- Destinations CRUD fully tested with states
- Activities CRUD with destination linkage
- Trips CRUD with publish/unpublish and activity association
- Error/empty/loading handled on all lists and forms
- Cross-browser smoke (Chrome, Firefox) and viewport checks
- E2E: create/edit flows for all three entities pass
