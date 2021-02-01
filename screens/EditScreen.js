import React from "react";
import { StylesSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { NavigationContainer } from "@react-navigation/native";

export default function EditScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Edit Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
