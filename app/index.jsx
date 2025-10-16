import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../auth/authContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) router.replace("/drive");
  }, [user]);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>
    <Text style={{ color: "white" }}>Drift </Text>
    <Text style={{ color: "#c9a5aa" }}>n'</Text>
    <Text style={{ color: "white" }}> Dwell</Text>
    </Text>

      <TextInput style={styles.input} placeholderTextColor="#FFFFFF" placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholderTextColor="#FFFFFF" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    backgroundColor: "#000000ff",
    ...(Platform.OS === 'web' && {
      maxWidth: 500,
      marginHorizontal: 'auto',
      width: '100%',
    }),
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12, color: "white" },
  button: { backgroundColor: "#9b6b72", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#bd878fff", marginTop: 15, textAlign: "center" },
});
