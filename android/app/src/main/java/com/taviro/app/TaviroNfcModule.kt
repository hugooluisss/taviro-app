package com.taviro.app

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class TaviroNfcModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  override fun getName() = "TaviroNfcHce"

  @ReactMethod
  fun setCard(vcard: String, promise: Promise) {
    if (vcard.toByteArray(Charsets.UTF_8).size > TaviroHostApduService.MAX_NDEF_PAYLOAD) {
      promise.reject("CARD_TOO_LARGE", "La tarjeta NFC supera el tamaño permitido")
      return
    }
    context.getSharedPreferences(TaviroHostApduService.PREFERENCES, 0).edit().putString(TaviroHostApduService.CARD, vcard).apply()
    promise.resolve(null)
  }

  @ReactMethod
  fun setEnabled(enabled: Boolean, promise: Promise) {
    context.getSharedPreferences(TaviroHostApduService.PREFERENCES, 0).edit().putBoolean(TaviroHostApduService.ENABLED, enabled).apply()
    promise.resolve(null)
  }
}
