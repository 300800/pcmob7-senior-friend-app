import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Button,
} from "react-native";

export default function App() {
  const numbers = ["97661000", "90403905", "98780000"];

  const renderImage = () => {
    numbers.map((number) => {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${number}`)}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 15 }}
            source={{
              uri:
                "https://static01.nyt.com/images/2017/07/27/us/27techfix/27techfix-videoSixteenByNineJumbo1600-v2.jpg",
            }}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>SENIOR FRIEND APP</Text>
      <StatusBar style="auto" />
      {renderImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
