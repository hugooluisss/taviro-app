// ponytail: react-native-svg still imports the pre-0.87 '@react-native/assets-registry/registry'
// module, which react-native moved to a private path. Shim it here instead of patching
// node_modules. Drop this once react-native-svg ships a fix for the new path.
const {AssetRegistry} = require('react-native/src/private/assets/AssetRegistry');

module.exports = {
  registerAsset: AssetRegistry.registerAsset,
  getAssetByID: AssetRegistry.getAssetByID,
};
