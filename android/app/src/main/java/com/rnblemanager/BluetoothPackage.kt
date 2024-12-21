package com.rnblemanager

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class BluetoothPackage: TurboReactPackage() {
  override fun getModule(name: String, context: ReactApplicationContext) =
    if (name == BluetoothModule.NAME)
      BluetoothModule(context)
    else null

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      BluetoothModule.NAME to ReactModuleInfo(
        BluetoothModule.NAME,
        BluetoothModule.NAME,
        false,
        false,
        false,
        true
      )
    )
  }
}