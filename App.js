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
  ScrollView,
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
  const [contactIndex, setContactIndex] = useState();

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
      key: 0,
      name: "Police",
      number: "97830000",
      imageURL:
        "https://cdn1.vectorstock.com/i/1000x1000/94/60/policeman-in-uniform-vector-4409460.jpg",
    },
    {
      key: 1,
      name: "SOS",
      number: "18002214444",
      imageURL:
        "https://uploads-ssl.webflow.com/5a4c78412b69220001d82c7d/5a4c78412b69220001d82d29_3.svg",
    },
    {
      key: 2,
      name: "Ambulance",
      number: "995",
      imageURL:
        "https://p1.hiclipart.com/preview/563/664/55/ambulance-cartoon-emergency-telephone-number-emergency-service-emergency-call-box-first-aid-health-certified-first-responder-vehicle-png-clipart.jpg",
    },
    {
      key: 3,
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
          style={{ paddingHorizontal: 3 }}
          key={number}
          onPress={
            deleteMode
              ? () => deleteContact(number)
              : editMode
              ? () => editContact(number)
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
      //todo: add in a key
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

  function editContact(number) {
    console.log(number);

    setContactIndex(
      contacts.findIndex((item) => {
        return item.number == number;
      })
    );

    const contact = contacts.find((item) => {
      return item.number == number;
    });
    console.log(contact);

    // Set the name, number and image to the text inputs
    setName(contact.name);
    setNumber(contact.number);
    setImage(contact.imageURL);
  }

  function saveEdit() {
    console.log("saving edit");
    console.log(contacts);

    contacts[contactIndex] = {
      name: name,
      number: number,
      imageURL: imageURL,
    };

    setName("");
    setNumber("");
    setImage("");
  }

  // This deletes an individual profile
  function deleteContact(id) {
    console.log("Deleting " + id);

    // To delete the item, we filter out the item not wanted
    setContacts(contacts.filter((item) => item.number !== id));

    // convert the numbers object into a string
    const numberString = JSON.stringify(
      contacts.filter((item) => item.number !== id)
    ); //; stringy contacts

    // save the contacts in localstorage
    AsyncStorage.setItem("contacts", numberString); // storage key would be 'contacts'
  }
  function toggleDeleteMode() {
    setDeleteMode(!deleteMode);
    setEditMode(false);
  }
  function toggleEditMode() {
    setEditMode(!editMode);
    setDeleteMode(false);
  }

  // old way to declare a function.  const is new way.
  function addImage() {
    console.log("Upload image");
  }
  // function to open Image selector
  // old way to declare a function: function openImageSelector() {
  //console.log("uploadImage");
  const openImageSelector = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!image.cancelled) {
      setImage(image.uri);
    }
  };

  // function to open camera
  // old way of declaing function openCamera()
  //console.log("openCamera");
  const openCamera = async () => {
    let image = await ImagePicker.launchCameraAsync().catch((error) =>
      console.log({ error })
    );

    if (!image.cancelled) {
      //set the 'image' state to contain the image uri
      setImage(image.uri);
    }
  };

  function seeContacts() {
    console.log(contacts);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            padding: 30,
            color: "red",
          }}
        >
          SENIOR FRIEND APP
        </Text>
        <StatusBar style="auto" />

        <View style={styles.family}>{renderImage(contacts)}</View>
        <View style={styles.emergencyNumbers}>
          {renderImage(emergencyNumbers)}
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Add name" // Initial display on text input box
          value={name}
          onChangeText={(input) => setName(input)} //This will set the text input
        ></TextInput>

        <TextInput
          style={styles.inputText}
          placeholder="Add number" // Initial display on text input box
          value={number}
          onChangeText={(input) => setNumber(input)} //This will set the text input
        ></TextInput>

        <TextInput
          style={styles.inputTextURL}
          placeholder="Add ImageURL"
          value={imageURL}
          onChangeText={(imageURL) => setImage(imageURL)}
        ></TextInput>

        <TouchableOpacity
          style={styles.submitButtonAdd}
          onPress={editMode ? saveEdit : addContact}
        >
          <Text style={styles.buttonText}>{editMode ? "Save" : "Add!"}</Text>
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
        <TouchableOpacity
          style={[styles.imageButton]}
          onPress={() => {
            openImageSelector();
          }}
        >
          <Text style={[styles.buttonText, styles.submitButtonEdit]}>
            Image from Gallery
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cameraButton]}
          onPress={() => {
            openCamera();
          }}
        >
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>

        <Button onPress={seeContacts} title="See Contacts" />
      </ScrollView>
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
  inputText: {
    height: 30,
    width: "20%",
    borderColor: "#00bfff",
    backgroundColor: "pink",
    borderWidth: 3,
    marginTop: 5,
    marginBottom: 5,
    color: "blue",
    fontWeight: "bold",
  },
  inputTextURL: {
    height: 30,
    width: "40%",
    borderColor: "#00bfff",
    backgroundColor: "pink",
    borderWidth: 3,
    marginTop: 5,
    marginBottom: 5,
    color: "blue",
    fontWeight: "bold",
  },
  submitButtonAdd: {
    flexDirection: "row",
    backgroundColor: "#00bfff",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: "20%",
  },
  //submitButtonEdit: {
  //   flexDirection: "row",
  //   backgroundColor: "#00bfff",
  // },
  // submitButtonDelete: {
  //   flexDirection: "row",
  //   backgroundColor: "#00bfff",
  // },
  emergencyNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
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
    width: "20%",
  },
  buttonNotActive: {
    flexDirection: "row",
    backgroundColor: "#00bfff",
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    width: "20%",
  },
  buttonActiveText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonNotActiveText: {
    color: "red",
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#00bfff",
    padding: 10,
    width: "20%",
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
  },
  cameraButton: {
    flexDirection: "row",
    backgroundColor: "#00bfff",
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    width: "20%",
  },
  cameraButtonText: {
    color: "red",
    fontWeight: "bold",
  },
});
