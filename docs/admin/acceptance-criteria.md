# Admin Panel Acceptance Criteria

## Access & Security
- All `/admin` routes and `/api/admin/*` enforce server-side admin RBAC and CSRF
- Pages send `X-Robots-Tag: noindex, nofollow`
- Feature flag `adminPanel` gates UI and routes

## Information Architecture
- `/admin` dashboard with links to Destinations, Activities, Trips
- Routes:
  - `/admin/destinations`, `/admin/destinations/new`, `/admin/destinations/:id/edit`
  - `/admin/activities`, `/admin/activities/new`, `/admin/activities/:id/edit`
  - `/admin/trips`, `/admin/trips/new`, `/admin/trips/:id/edit`

## Lists
- Table with search (q), filters (status, destination), sort, pagination
- Empty/loading/error states are explicit and styled
- URL reflects list state via query params

## Forms
- Destinations: name, country, region, description, hero image, status
- Activities: destinationId, name, category, duration, price, summary, images, status
- Trips: destinationId, name, start/end dates, base price, seats total/available, status, featured, activityIds, notes
- Validation with inline errors; confirmations for destructive actions

## Relations & Business Rules
- Activities require a valid destination
- Trips require a valid destination; can link multiple activities
- Trips support publish/unpublish; seats cannot drop below booked

## Quality Gates
- Unit/service tests; API tests for CRUD; e2e smoke for core flows
- a11y: no critical Axe issues; keyboard navigation; focus management
- Perf budgets met on list pages; search debounced; pagination enforced
- Audit log records actor, entity, action, and delta for write ops
