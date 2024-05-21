import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/card";
import { useBleManager } from "../../hooks/ble-manager";
import { style } from "./style";

const Main = (): React.ReactNode => {
  // get devices, status scan, and scan action from BleManager hooks
  const { devices, isScanning, startScan, stopScan } = useBleManager()

  const cardSeparator = useCallback(() => (<View style={style.cardSeparator} />), [])

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