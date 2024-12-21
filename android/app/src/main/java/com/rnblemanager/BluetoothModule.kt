package com.rnblemanager

import android.annotation.SuppressLint
import android.bluetooth.BluetoothManager
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanResult
import android.content.Intent
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext

class BluetoothModule(private val context: ReactApplicationContext): NativeBluetoothSpec(context) {
  private val btAdapter by lazy {
    context.getSystemService(BluetoothManager::class.java).adapter
  }

  override fun getName(): String = NAME

  @SuppressLint("MissingPermission")
  override fun startScan(scanResult: Callback?) {

    if (btAdapter.isEnabled) {
      btAdapter.bluetoothLeScanner.startScan(
        object: ScanCallback(){
          override fun onScanResult(callbackType: Int, result: ScanResult?) {
            if (result != null && scanResult != null) {
              scanResult(mapOf(
                "id" to result.device.uuids.joinToString(":"),
                "name" to result.device.name,
                "signalStrength" to result.rssi
              ))
            }
          }
        }
      )
    } else {
      context.startActivity(Intent(android.provider.Settings.ACTION_BLUETOOTH_SETTINGS))
    }
  }

  @SuppressLint("MissingPermission")
  override fun stopScan() {
    btAdapter.bluetoothLeScanner.stopScan(object: ScanCallback() {})
  }

  companion object {
    const val NAME = "NativeBluetooth"
  }
}