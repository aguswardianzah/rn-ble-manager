import { TurboModule, TurboModuleRegistry } from 'react-native'

export interface BluetoothDevice {
  id?: string
  name?: string
  signalStrength?: number
}

export interface Spec extends TurboModule {
  startScan(scanResult: (device: BluetoothDevice) => void): void
  stopScan(): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBluetooth')