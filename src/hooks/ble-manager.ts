import { useCallback, useEffect, useState } from 'react'
import { usePermission } from './permission'
import { debounce } from '../helper'
import NativeBluetooth, { type BluetoothDevice } from '../../specs/NativeBluetooth'


export const useBleManager = () => {
  const granted = usePermission()
  // save scanned devices
  const [devices, setDevices] = useState<BluetoothDevice[]>([])
  // hold scan state
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    // return manager.destroy
  }, [granted])

  // update isScanning state to true and start device scan process
  const startScan = useCallback(() => {
    setIsScanning(true)
    NativeBluetooth.startScan(debounce((device: BluetoothDevice) => {
      isScanning && _onDeviceFound(device)
    }, 500))
  }, [isScanning])

  // update isScanning state to false and stop device scan process
  const stopScan = useCallback(() => {
    setIsScanning(false)
    NativeBluetooth.stopScan()
  }, [isScanning])

  useEffect(() => {
    startScan()
  }, [])

  const _onDeviceFound = useCallback((device: BluetoothDevice) => {
    if (devices.findIndex(b => b.id === device.id) < 0)
      setDevices([...devices, device])
  }, [devices])

  return {
    devices,
    isScanning,
    startScan,
    stopScan
  }
}