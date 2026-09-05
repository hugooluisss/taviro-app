## ADDED Requirements

### Requirement: Share selected fields by NFC HCE
The NFC screen MUST default to profile shareable fields and emit only the resulting vCard through Android Host Card Emulation; it MUST NOT read third-party tags.

#### Scenario: Tap to receive
- **WHEN** another NFC phone requests the card
- **THEN** the HCE service returns the selected vCard bytes
