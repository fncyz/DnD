import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Platform, Text } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const handleCreatePost = async () => {
    if (!user) {
      Alert.alert("Authentication Error", "You must be logged in to create a post.");
      return;
    }

    if (!content.trim()) {
      Alert.alert("Validation Error", "Post cannot be empty.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        content: content.trim(),
        uid: user.uid,
        username: user.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      });
      Alert.alert("Success", "Post created!");
      setContent(""); // Clear the input after posting
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create post.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your motivational quote..."
        placeholderTextColor="#999"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button
        title="Post"
        color="#cc7d7dff"
        onPress={handleCreatePost}
        disabled={!user} // Disable button if user is not logged in
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff", // matches feed + myFeed
    padding: 20,
    justifyContent: "center",
    ...(Platform.OS === 'web' && {
      maxWidth: 600,
      marginHorizontal: 'auto',
      width: '100%',
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f08d8dff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#ffffffff",
    fontSize: 16,
    ...(Platform.OS === 'web' && {
      minHeight: 120,
      resize: 'vertical',
    }),
  },
});
