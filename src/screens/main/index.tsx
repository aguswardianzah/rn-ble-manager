import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/card";
import { useBleManager } from "../../hooks/ble-manager";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { style } from "./style";

const Main = (): React.ReactNode => {
  const { devices, isScanning, startScan, stopScan } = useBleManager()

  const cardSeparator = useCallback(() => (<View style={style.cardSeparator} />), [])

  useEffect(() => { console.log('devices', devices) }, [])

  const _toggleScan = useCallback(() => {
    isScanning ? stopScan() : startScan()
  }, [isScanning])

  return (
    <View style={style.container}>
      <View style={style.appBar}>
        <Text style={style.title}>BLE Manager</Text>
        <TouchableOpacity onPress={_toggleScan}>
          <Text style={style.action}>{isScanning ? 'Stop scan' : 'Start scan'}</Text>
        </TouchableOpacity>
      </View>
      {
        isScanning &&
        <View style={style.scanIndicator}>
          <ActivityIndicator size={24} />
          <Text style={style.scanLabel}>Scanning ...</Text>
        </View>
      }
      <FlatList
        data={devices}
        keyExtractor={device => device.rawScanRecord}
        renderItem={({ item }) => <Card {...item} />}
        ItemSeparatorComponent={cardSeparator}
        contentContainerStyle={style.listContainer}
      />
    </View>
  )
}

export default React.memo(Main)