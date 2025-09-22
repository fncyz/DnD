import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DriveIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to <Text style={{ color: "white" }}>Drift </Text>
        <Text style={{ color: "#c9a5aa" }}>n'</Text>
        <Text style={{ color: "white" }}> Dwell</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
});
