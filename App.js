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
        "https://www.clipartkey.com/mpngs/m/156-1568007_senior-services-icon-family-and-friends-icon.png",
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
        "https://cdn1.vectorstock.com/i/1000x1000/94/60/policeman-in-uniform-vector-4409460.jpg",
    },
  ];

  const renderImage = numbers.map(({ name, number, imageURL }) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(`tel: ${number}`)}>
        <Text style={{ fontSize: 20, color: "blue" }}>{name}</Text>
        <Image
          style={{ width: 100, height: 100, marginBottom: 15 }}
          source={{ uri: `${imageURL}` }}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, padding: 30, color: "red" }}>
        SENIOR FRIEND APP
      </Text>
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
