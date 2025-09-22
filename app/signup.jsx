import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../auth/authContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function SignUpScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  // Automatically redirect if already logged in
  useEffect(() => {
    if (user) router.replace("/drive/index");
  }, [user]);

  const handleSignUp = async () => {
    if (!displayName.trim()) {
      Alert.alert("Error", "Please enter a display name");
      return;
    }

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      // Update display name
      await updateProfile(currentUser, { displayName });

      Alert.alert("Success", "Account created successfully!");
      router.replace("/drive"); // Redirect after signup
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor="#FFFFFF"
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#FFFFFF"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#FFFFFF"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
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
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#c9a5aaff" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    color: "white" 
  },
  button: { 
    backgroundColor: "#9b6b72", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  link: { 
    color: "#bd878fff", 
    marginTop: 15, 
    textAlign: "center" 
  },
});

