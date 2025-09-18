import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const { user } = useAuth();

 const handleCreatePost = async () => {
  if (!user) {
    Alert.alert("Error", "You must be logged in to create a post.");
    return;
  }

  if (!content.trim()) {
    Alert.alert("Error", "Post cannot be empty.");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      content,
      uid: user.uid,
      username: user.displayName || "Anonymous",
      createdAt: serverTimestamp(),
    });
    Alert.alert("Success", "Post created!");
    setContent("");
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your motivational quote..."
        placeholderTextColor="#999"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Post" color="#cc7d7dff" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff", // matches feed + myFeed
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f08d8dff", // matches input border color in feeds
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // transparent effect
    color: "#333", // text color
    fontSize: 16,
  },
});
