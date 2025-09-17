import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { db } from "../../firebaseConfig"; // correct path from /app/drive/
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();
  const [quote, setQuote] = useState("");

  const handlePost = async () => {
    if (!quote.trim()) {
      Alert.alert("Error", "Quote cannot be empty");
      return;
    }

    if (!user) {
      Alert.alert("Error", "You must be logged in to post.");
      console.error("CreatePost error: user is null");
      return;
    }

    console.log("Posting quote:", quote, "by user:", user.uid);

    try {
      await addDoc(collection(db, "posts"), {
        quote: quote.trim(),
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
      console.log("Quote posted successfully!");
      Alert.alert("Success", "Quote posted!");
      setQuote("");
      router.push("/drive/feed"); // redirect to Community Feed
    } catch (error) {
      console.error("Error posting quote:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Quote</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your motivational quote..."
        value={quote}
        onChangeText={setQuote}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post Quote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12, minHeight: 80, textAlignVertical: "top" },
  button: { backgroundColor: "#3498db", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
