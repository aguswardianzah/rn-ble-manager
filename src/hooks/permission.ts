import { useEffect, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"

const AndroidPermissions = [
  PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
]

export const usePermission = (): boolean => {
  const [granted, setGranted] = useState(false)

  const checkGranted = async () => {
    const permissionGranted = (
      await Promise.all(
        AndroidPermissions.map(p => { return PermissionsAndroid.check(p) })
      )
    ).includes(false)

    if (permissionGranted) setGranted(true)
    else requestPermission()
  }

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      setGranted(true)
      return
    }

    if (PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION) {
      const apiLevel = parseInt(Platform.Version.toString(), 10)

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        setGranted(granted === PermissionsAndroid.RESULTS.GRANTED)
        return
      }

      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = (
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ])
        )

        setGranted(
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.granted &&
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.granted
        )
      }
    }
  }

  useEffect(() => {
    checkGranted()
  })

  return granted
}