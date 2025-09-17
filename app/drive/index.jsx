import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../auth/authContext";

export default function DriveDashboard() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/"); // back to login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/drive/feed")}>
        <Text style={styles.buttonText}>Community Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/drive/myFeed")}>
        <Text style={styles.buttonText}>Personal Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/drive/create")}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  button: { backgroundColor: "#3498db", padding: 15, borderRadius: 8, marginVertical: 10, width: "80%", alignItems: "center" },
  logout: { backgroundColor: "#e74c3c" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
