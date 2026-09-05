## Design

- `src/repositories/` owns AsyncStorage CRUD only.
- `src/services/` validates/normalizes profiles and builds share payloads.
- `src/controllers/` exposes React hooks that orchestrate services.
- `src/screens/` consumes controllers only; theme tokens come from `useTheme()`.
