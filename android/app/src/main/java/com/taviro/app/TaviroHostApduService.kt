package com.taviro.app

import android.nfc.cardemulation.HostApduService
import android.os.Bundle

class TaviroHostApduService : HostApduService() {
  private var selectedFile = ""

  override fun processCommandApdu(commandApdu: ByteArray, extras: Bundle?): ByteArray {
    val prefs = getSharedPreferences(PREFERENCES, 0)
    if (!prefs.getBoolean(ENABLED, false)) return STATUS_FAILED
    val command = commandApdu.toHex()
    if (command.startsWith("00A40400")) {
      val aidLength = commandApdu[4].toInt() and 0xff
      return if (commandApdu.copyOfRange(5, 5 + aidLength).toHex() == AID) STATUS_OK else STATUS_FAILED
    }
    if (command == "00A4000C02E103") { selectedFile = "cc"; return STATUS_OK }
    if (command == "00A4000C02E104") { selectedFile = "ndef"; return STATUS_OK }
    if (command.startsWith("00B0")) return if (selectedFile == "cc") readBinary(commandApdu, cc()) else readBinary(commandApdu, ndef(prefs.getString(CARD, "") ?: ""))
    return STATUS_FAILED
  }

  override fun onDeactivated(reason: Int) = Unit

  private fun readBinary(command: ByteArray, data: ByteArray): ByteArray {
    val offset = (command[2].toInt() and 0xff) * 256 + (command[3].toInt() and 0xff)
    val length = (command[4].toInt() and 0xff).let { if (it == 0) 256 else it }
    if (offset >= data.size) return STATUS_FAILED
    return data.copyOfRange(offset, minOf(offset + length, data.size)) + STATUS_OK
  }

  private fun ndef(vcard: String): ByteArray {
    val payload = vcard.toByteArray(Charsets.UTF_8)
    val type = "text/vcard".toByteArray(Charsets.US_ASCII)
    val record = byteArrayOf(0xC2.toByte(), type.size.toByte(), (payload.size shr 24).toByte(), (payload.size shr 16).toByte(), (payload.size shr 8).toByte(), payload.size.toByte()) + type + payload
    return byteArrayOf((record.size shr 8).toByte(), record.size.toByte()) + record
  }

  private fun cc() = byteArrayOf(0x00, 0x0F, 0x20, 0x00, 0x3B, 0x00, 0x00, 0x04, 0x06, 0xE1.toByte(), 0x04, 0x00, 0xFF.toByte(), 0xFE.toByte(), 0x00)

  private fun ByteArray.toHex() = joinToString("") { "%02X".format(it) }

  companion object {
    const val PREFERENCES = "taviro_nfc"
    const val CARD = "vcard"
    const val ENABLED = "enabled"
    const val MAX_NDEF_PAYLOAD = 65519
    private const val AID = "D2760000850101"
    private val STATUS_OK = byteArrayOf(0x90.toByte(), 0x00)
    private val STATUS_FAILED = byteArrayOf(0x6F.toByte(), 0x00)
  }
}
