# Taviro

Android-only, offline React Native app for a personal contact card. Sharing is
available through QR, NFC HCE, and WhatsApp.

## Layers

- `src/repositories/`: AsyncStorage CRUD only.
- `src/services/`: validation, profile rules, and `buildShareableCard`.
- `src/controllers/`: React hooks orchestrating services.
- `src/screens/`: UI consuming controllers; use `useTheme()` for colors.

Sharing screens select field ids and call `buildShareableCard(profile, selectedFieldIds)`.

## Cómo compilar

1. Instala Android Studio con Android SDK Platform 37, Build-Tools 37.0.0 y un emulador o dispositivo Android.
2. Configura el SDK en tu shell (ajusta la ruta si Android Studio usa otra):

   ```sh
   export ANDROID_HOME="$HOME/Library/Android/sdk"
   export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
   ```

3. Desde la raíz del proyecto ejecuta:

   ```sh
   npm install
   npm run android
   ```

La app es offline; `android.permission.INTERNET` permanece porque React Native lo
usa para conectar la build debug con Metro. No se usa para ninguna otra función.

Para probar NFC HCE necesitas dos dispositivos físicos con NFC: uno emite la
tarjeta y el otro la lee con cualquier lector NFC o con otro teléfono Android.
