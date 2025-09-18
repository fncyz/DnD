import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DriveIndex() {
  return (

    <View style={styles.container}>
      <Text style={styles.text}>Welcome! Select a tab below.</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", color: "#b5b5b5ff" },
  text: { fontSize: 18 },
});
