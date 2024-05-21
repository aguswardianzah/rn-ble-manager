import { useCallback, useEffect, useState } from "react";
import { BleError, BleManager, Device } from "react-native-ble-plx";
import { usePermission } from "./permission";
import { Alert } from "react-native";
import { debounce, throttle } from "../helper";

type BLDevice = Pick<Device, 'id' |
  'isConnectable' |
  'localName' |
  'manufacturerData' |
  'mtu' |
  'name' |
  'rawScanRecord' |
  'rssi' |
  'serviceData' |
  'serviceUUIDs' |
  'solicitedServiceUUIDs' |
  'txPowerLevel'
>

export const useBleManager = () => {
  const manager = new BleManager()
  const granted = usePermission()
  // save scanned devices
  const [devices, setDevices] = useState<BLDevice[]>([])
  // hold scan state
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    // return manager.destroy
  }, [granted])

  // update isScanning state to true and start device scan process
  const startScan = useCallback(() => { 
    setIsScanning(true) 
    manager.startDeviceScan(
      null,
      { legacyScan: false },
      
      // debounce handler to prevent anr
      debounce((error: BleError | undefined, device: Device | undefined) => {
        if (error) return console.log('scan error', error)

        device && isScanning && _onScanedDevice(device)
      }, 500)
    )
  }, [isScanning])

  // update isScanning state to false and stop device scan process
  const stopScan = useCallback(() => { 
    setIsScanning(false) 
    manager.stopDeviceScan()
  }, [isScanning])

  useEffect(() => {
    const subs = manager.onStateChange((state) => {
      switch (state) {
        case 'Unauthorized':
        case 'Unsupported':
          Alert.alert(`Your device is not supported/authorized to use BluetoothLE`)
          break;
        case 'PoweredOff':
          Alert.alert(`Please turn on your device's bluetooth to start scanning`)
          break;
        case 'PoweredOn':
          // trigger start scan if isScanning state is true
          isScanning && startScan()
          break;
      }
    }, true)

    return subs.remove
  }, [manager, devices, isScanning])

  const _onScanedDevice = useCallback((device: BLDevice) => {
    const idx = devices.findIndex(d => d.rawScanRecord === device.rawScanRecord)
    if (idx < 0) {
      setDevices([...devices, device])
    }
  }, [devices])

  return { 
    devices,
    isScanning,
    startScan,
    stopScan
  }
}