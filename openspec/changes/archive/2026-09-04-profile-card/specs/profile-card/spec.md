## ADDED Requirements

### Requirement: Store a dynamic profile
The app MUST persist an ordered list of text fields, each with an id, label, value, and shareable flag, plus an optional photo/logo URI, locally and offline.

#### Scenario: Reload profile
- **WHEN** the app starts after a profile was saved
- **THEN** it restores the same fields and shareable flags without network access

### Requirement: Edit fields
The profile screen MUST allow editing field labels and values, adding custom fields, removing fields, and toggling each field's shareable flag.

#### Scenario: Toggle a field
- **WHEN** the user toggles a field and saves
- **THEN** the selected state is persisted as the default for sharing screens

### Requirement: Build a shareable card
`ShareableCardService.buildShareableCard(profile, selectedFieldIds)` MUST return `{vcard, text}`, containing only selected non-empty fields; `vcard` MUST be vCard 3.0 and `text` MUST be plain text.

#### Scenario: Select a subset
- **WHEN** only some field ids are selected
- **THEN** neither output contains unselected fields
