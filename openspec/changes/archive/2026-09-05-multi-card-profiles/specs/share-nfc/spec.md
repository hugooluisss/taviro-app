## MODIFIED Requirements

### Requirement: Share selected fields by NFC HCE
The NFC screen MUST default to the selected card's shareable fields and emit only the resulting vCard through Android Host Card Emulation; it MUST NOT read third-party tags or include photo fields.

#### Scenario: Tap to receive
- **WHEN** another NFC phone requests the selected card
- **THEN** the HCE service returns the selected non-photo vCard bytes
