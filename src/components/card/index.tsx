import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Device } from "react-native-ble-plx";

const Card = (device: Partial<Device>): React.ReactNode => {
  return (
    <View
      key={device.id}
      style={style.container}
    >
      <Text>{device.id}</Text>
      <Text>{device.name}</Text>
      <Text>Signal strength {device.rssi}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderRadius: 8, 
    // borderColor: '#00FF00', 
    borderWidth: 1, 
    padding: 12
  }
})

export default React.memo(Card)