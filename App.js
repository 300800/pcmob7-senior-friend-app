import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { TextInput } from "react-native-gesture-handler";

export default function App() {
  const [textInput, setTextInput] = useState();
  const [number, setNumber] = useState();
  const numbers = [
    {
      name: "Enter Name",
      number: "90080000",
      imageURL:
        "https://www.clipartkey.com/mpngs/m/156-1568007_senior-services-icon-family-and-friends-icon.png",
    },
    {
      name: "Enter name",
      number: "96800000",
      imageURL:
        "https://static01.nyt.com/images/2017/07/27/us/27techfix/27techfix-videoSixteenByNineJumbo1600-v2.jpg",
    },

    {
      name: "Police",
      number: "97830000",
      imageURL:
        "https://cdn1.vectorstock.com/i/1000x1000/94/60/policeman-in-uniform-vector-4409460.jpg",
    },
    {
      name: "SOS",
      number: "18002214444",
      imageURL:
        "https://uploads-ssl.webflow.com/5a4c78412b69220001d82c7d/5a4c78412b69220001d82d29_3.svg",
    },
  ];

  const renderImage = numbers.map(({ name, number, imageURL }) => {
    return (
      <TouchableOpacity
        key={number}
        onPress={() => Linking.openURL(`tel: ${number}`)}
      >
        <Text style={{ fontSize: 20, color: "blue" }}>{name}</Text>
        <Image
          style={{ width: 100, height: 100, marginBottom: 15 }}
          source={{ uri: `${imageURL}` }}
        />
      </TouchableOpacity>
    );
  });

  function button1() {
    console.log("Key in name");
  }
  function button2() {
    console.log("Upload image");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, padding: 30, color: "red" }}>
        SENIOR FRIEND APP
      </Text>
      <StatusBar style="auto" />
      {renderImage}
      <TextInput
        style={{ height: 20, borderColor: "blue", borderWith: 2 }}
        placeholder="Add name" // Initial display on text input box
        value={textInput}
        onChangetext={(input) => setTextInput(input)} //This will set the text input
      ></TextInput>
      <TextInput
        style={{ height: 20, borderColor: "red", borderWith: 2 }}
        placeholder="Add number" // Initial display on text input box
        value={number}
        onChangetext={(input) => setNumber(input)} //This will set the text input
      ></TextInput>
      <Button title="Add!" onPress={button1}></Button>
      <Button title="Upload image" onPress={button2}></Button>
      <TouchableOpacity
        Key={number}
        onPress={() => Linking.openURL(`tel: ${number}`)}
      >
        <Text style={{ fontSize: 24, color: "blue" }}>{number}</Text>
      </TouchableOpacity>
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
