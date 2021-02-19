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
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [imageURL, setImage] = useState();
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState();

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
          onPress={
            deleteMode
              ? () => deleteContact(number)
              : () => Linking.openURL(`tel: ${number}`)
          }
          // Ternary operator: condition... ? func1 : func2
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
      name: name, // change "new contact" to the name indicated by the user
      number: number,
      // allow the user to select an image from the gallery
      imageURL: imageURL,
    };

    // convert the numbers object into a string
    const numberString = JSON.stringify([...contacts, contact]); //;

    // save the contacts in localstorage
    AsyncStorage.setItem("contacts", numberString); // storage key would be 'contacts'

    // add the new contact in the the 'contacts' variable
    setContacts([...contacts, contact]);
  }
  function editContact() {
    console.log("editContact");
  }
  // This deletes an individual profile
  function deleteContact(id) {
    console.log("Deleting " + id);
    // To delete the item, we filter out the item not wanted
    setContacts(contacts.filter((item) => item.number !== id));
  }
  function toggleDeleteMode() {
    setDeleteMode(!deleteMode);
    setEditMode(false);
  }
  function toggleEditMode() {
    setEditMode(!editMode);
    setDeleteMode(false);
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

      <View style={styles.family}>{renderImage(contacts)}</View>
      <View style={styles.emergencyNumbers}>
        {renderImage(emergencyNumbers)}
      </View>

      <TextInput
        style={{ height: 20, borderColor: "red", borderWidth: 2 }}
        placeholder="Add name" // Initial display on text input box
        style={{ color: "black", fontWeight: "bold" }}
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

      <TextInput
        style={{ height: 20, bordercolor: "red", borderWidth: 2 }}
        placeholder="Add ImageURL"
        style={{ color: "black", fontWeight: "bold" }}
        value={imageURL}
        onChangeText={(imageURL) => setImage(imageURL)}
      ></TextInput>

      <TouchableOpacity style={styles.submitButtonAdd} onPress={addContact}>
        <Text style={styles.buttonText}>Add!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={editMode ? styles.buttonActive : styles.buttonNotActive}
        onPress={toggleEditMode}
      >
        <Text
          style={
            editMode ? styles.buttonActiveText : styles.buttonNotActiveText
          }
        >
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={deleteMode ? styles.buttonActive : styles.buttonNotActive}
        onPress={toggleDeleteMode}
      >
        <Text
          style={
            deleteMode ? styles.buttonActiveText : styles.buttonNotActiveText
          }
        >
          Delete
        </Text>
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
    flexDirection: "row",
    backgroundColor: "#00bfff",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  submitButtonEdit: {
    flexDirection: "row",
    backgroundColor: "#00bfff",
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
  submitButtonDelete: {
    flexDirection: "row",
    backgroundColor: "#00bfff",
    marginTop: 5,
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
    marginLeft: 20,
    marginRight: 20,
  },
  family: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  buttonActive: {
    flexDirection: "row",
    backgroundColor: "red",
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
  buttonNotActive: {
    flexDirection: "row",
    backgroundColor: "red",
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  buttonActiveText: {
    backgroundColor: "red",
    fontWeight: "bold",
  },
  buttonNotActiveText: {
    backgroundColor: "red",
    fontWeight: "bold",
  },
});
