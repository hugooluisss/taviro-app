## Context

The current architecture already separates AsyncStorage repositories, business services, hooks, and screens, but every layer assumes one `Profile`. The existing sharing services and native HCE boundary can remain unchanged apart from accepting `Card` data.

## Goals / Non-Goals

**Goals:**

- Store the whole small card list in one AsyncStorage value.
- Centralize migration and card rules in `CardService`.
- Pass card ids through typed navigation to all sharing screens.
- Keep photo handling UI-only and avoid payload growth.

**Non-Goals:**

- No granular storage CRUD, backend sync, image picker, or native Android changes.
- No new dependencies.

## Decisions

- Use `@taviro/cards` as the source of truth and keep `@taviro/profile` read-only for one-time migration. A whole-list save is sufficient for the expected small number of cards.
- Use `card-${Date.now()}` and `${field.id}-${Date.now()}` ids. This matches the existing lightweight offline approach without adding a UUID dependency.
- Share controllers load by route card id and derive initially selected fields from `shareable`, preserving current screen behavior.
- Keep the existing vCard custom-property format and filter `photo` fields in the shared builder so QR, NFC, and WhatsApp stay consistent.

## Risks / Trade-offs

- Timestamp ids can theoretically collide on same-millisecond repeated actions → append a random suffix only if collision is observed; current UI actions are sequential.
- Legacy profiles have no field type → migrate old fields as `text` and map `photoUri` to a non-shareable `photo` field.
