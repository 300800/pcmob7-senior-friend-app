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
  const numbers = [
    {
      name: "Grace",
      number: "97661010",
      imageURL:
        "https://static01.nyt.com/images/2017/07/27/us/27techfix/27techfix-videoSixteenByNineJumbo1600-v2.jpg",
    },
    {
      name: "Zara",
      number: "9040-1000",
      imageURL:
        "https://static01.nyt.com/images/2017/07/27/us/27techfix/27techfix-videoSixteenByNineJumbo1600-v2.jpg",
    },
    {
      name: "Police",
      number: "990",
      imageURL:
        "https://www.mha.gov.sg/images/default-source/hometeamnews/spf1.jpg?sfvrsn=61db8001_0",
    },
  ];

  const renderImage = numbers.map(({ name, number, imageURL }) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${number}`)}>
        <Image
          style={{ width: 100, height: 100, marginBottom: 15 }}
          source={{
            uri: `${imageURL}`,
          }}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Text>SENIOR FRIEND APP</Text>
      <StatusBar style="auto" />
      {renderImage}
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
