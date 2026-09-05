## Purpose

Users can maintain multiple offline contact cards and choose the exact card used by each sharing channel.

## ADDED Requirements

### Requirement: Persist multiple cards
The app MUST persist an ordered list of cards locally and offline. Each card MUST have an id, name, and fields; each field MUST have an id, type, label, value, and shareable flag.

#### Scenario: First launch
- **WHEN** no current or legacy profile is stored
- **THEN** the app creates and persists one card named "Mi tarjeta" with Nombre, Teléfono, and Email fields

#### Scenario: Legacy profile migration
- **WHEN** no cards are stored but a legacy profile exists under `@taviro/profile`
- **THEN** the app converts it into the first card named "Mi tarjeta", persists it under the cards storage, and uses it without requiring user action

### Requirement: Manage cards
The app MUST allow creating, renaming, duplicating, editing, and deleting cards, and MUST always retain at least one card.

#### Scenario: Delete last card
- **WHEN** the user attempts to delete the only card
- **THEN** the card remains stored

#### Scenario: Duplicate card
- **WHEN** the user duplicates a card
- **THEN** a new card named "Copia de X" is created with equivalent values and distinct ids

### Requirement: Edit card fields
The card editor MUST support adding text, phone, email, and photo fields; editing names, labels, values, and shareable flags; removing fields; and previewing a non-empty photo URI.

#### Scenario: Save card
- **WHEN** the user saves a card
- **THEN** labels and values are trimmed, fields with empty labels are removed, and the complete card list is persisted

### Requirement: Share a selected card
QR, NFC, and WhatsApp sharing MUST receive a card id and use that card's selected fields.

#### Scenario: Share photo field
- **WHEN** a selected field has type `photo`
- **THEN** it is omitted from both the generated vCard and plain-text payload
