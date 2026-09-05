# share-whatsapp Specification

## Purpose
TBD - created by archiving change share-whatsapp. Update Purpose after archive.
## Requirements
### Requirement: Share selected fields with WhatsApp
The WhatsApp screen MUST default to profile shareable fields and invoke `Share.share()` or `whatsapp://send?text=` with the generated plain-text output, without a new sharing library.

#### Scenario: Share text
- **WHEN** the user taps share
- **THEN** WhatsApp receives only the selected fields' text

