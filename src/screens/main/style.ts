import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const style = StyleSheet.create({
  container: {
    flex: 1
  },
  appBar: {
    backgroundColor: Colors.dark, 
    padding: 16, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    flex: 1
  },
  action: {
    fontSize: 16
  },
  scanIndicator: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16
  },
  scanLabel: {
    fontSize: 16, 
    marginStart: 12
  },
  listContainer: {
    padding: 16
  },
  cardSeparator: {
    height: 12
  }
})