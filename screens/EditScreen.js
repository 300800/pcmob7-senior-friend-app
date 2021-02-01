import React from "react";
import { StylesSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const App = () => {
  return <NavigationContainer></NavigationContainer>;
};

export default function EditScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Edit Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
