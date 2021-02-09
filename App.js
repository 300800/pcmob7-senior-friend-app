import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [imageURL, setImageURL] = useState();

  // const [numbers, setNumbers] = useState([
  //   {
  //     name: "Enter Name",
  //     number: "90080000",
  //     imageURL:
  //       "https://www.clipartkey.com/mpngs/m/156-1568007_senior-services-icon-family-and-friends-icon.png",
  //   },
  //   {
  //     name: "Enter name",
  //     number: "96800000",
  //     imageURL:
  //       "https://static01.nyt.com/images/2017/07/27/us/27techfix/27techfix-videoSixteenByNineJumbo1600-v2.jpg",
  //   },
  // ]);

  const [contacts, setContacts] = useState([]);

  // this function loads the contacts stored in the local storage
  async function loadContacts() {
    const contactsString = await AsyncStorage.getItem("contacts"); // 'contacts' here refer to the storage key
    if (contactsString) {
      console.log("these are the contacts");
      console.log(contactsString);

      const storedContacts = JSON.parse(contactsString); // convert the contactsString from a string back to an object
      setContacts(storedContacts);
    }
  }

  // useeffect hook: to get the contacts stored in the phone, and assign them to the'numbers' variable
  useEffect(() => {
    loadContacts();
  }, []);

  const emergencyNumbers = [
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
    {
      name: "Ambulance",
      number: "995",
      imageURL:
        "https://p1.hiclipart.com/preview/563/664/55/ambulance-cartoon-emergency-telephone-number-emergency-service-emergency-call-box-first-aid-health-certified-first-responder-vehicle-png-clipart.jpg",
    },
    {
      name: "Fire Engine",
      number: "998",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/R%C3%B6d_brandbil_Scania_P360_%C3%A5rsmodell_2012_-_6211.jpg",
    },
  ];

  const renderImage = (array) =>
    array.map(({ name, number, imageURL }) => {
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

  // this function adds contacts into the local storage
  function addContact() {
    const contact = {
      name: name, // change "new contact" to the name indicated by the use
      number: number,
      // allow the user to select an image from the gallery
      imageURL:
        "https://p.kindpng.com/picc/s/720-7206165_heart-frame-background-png-frame-love-photo-background.png",
    };

    // convert the numbers object into a string
    const numberString = JSON.stringify([...contacts, contact]); //;

    // save the contacts in localstorage
    AsyncStorage.setItem("contacts", numberString); // storage key would be 'contacts'

    // add the new contact in the the 'contacts' variable
    setContacts([...contacts, contact]);
  }
  function addImage() {
    console.log("Upload image");
  }

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 24, fontWeight: "bold", padding: 30, color: "red" }}
      >
        SENIOR FRIEND APP
      </Text>
      <StatusBar style="auto" />
      {renderImage(contacts)}
      <View style={styles.emergencyNumbers}>
        {renderImage(emergencyNumbers)}
      </View>

      <TextInput
        style={{ height: 20, borderColor: "red", borderWidth: 2 }}
        placeholder="Add name" // Initial display on text input box
        style={{ color: "blue", fontWeight: "bold" }}
        value={name}
        onChangeText={(input) => setName(input)} //This will set the text input
      ></TextInput>
      <TextInput
        style={{ height: 20, borderColor: "red", borderWidth: 2 }}
        placeholder="Add number" // Initial display on text input box
        style={{ fontWeight: "bold", color: "blue" }}
        value={number}
        onChangeText={(input) => setNumber(input)} //This will set the text input
      ></TextInput>

      <TouchableOpacity style={styles.submitButtonAdd} onPress={addContact}>
        <Text style={styles.buttonText}>Add!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButtonUpload} onPress={addImage}>
        <Text style={styles.buttonText}>Upload image</Text>
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
  submitButtonAdd: {
    backgroundColor: "#00bfff",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  submitButtonUpload: {
    backgroundColor: "#00bfff",
    padding: 10,
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
  },
  emergencyNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
