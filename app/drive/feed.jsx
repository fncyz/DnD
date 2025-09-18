import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput, Modal } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";


export default function CommunityFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContent, setNewContent] = useState("");

  // Fetch all posts
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });
    return unsubscribe;
  }, []);

  // Delete post
  const handleDelete = (post) => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => await deleteDoc(doc(db, "posts", post.id)) },
    ]);
  };

  // Start editing
  const handleEdit = (post) => {
    setEditingPost(post);
    setNewContent(post.content);
    setModalVisible(true);
  };

  // Save edited post
  const saveEdit = async () => {
    if (!newContent.trim()) return;
    await updateDoc(doc(db, "posts", editingPost.id), { content: newContent });
    setModalVisible(false);
    setEditingPost(null);
    setNewContent("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.quote}>"{item.content}"</Text>
      <Text style={styles.username}>—{item.username}</Text>

      {item.uid === user.uid && (
        <View style={styles.actions}>
          <Button title="Edit" color="#bd8993ff" onPress={() => handleEdit(item)} />
          <Button title="Delete" color="#743945ff" onPress={() => handleDelete(item)} />
        </View>
      )}
    </View>
  );

  return (

    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* Modal for editing */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={newContent}
              onChangeText={setNewContent}
              placeholder="Edit your post"
              placeholderTextColor="#999"
            />
            <Button title="Save" color="#cc7d7dff" onPress={saveEdit} />
            <Button title="Cancel" color="#6d2e2eff" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff", // black background (matches your logo scheme)
    paddingTop: 20,
  },
  post: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#745b5bff",
    borderRadius: 8,
    backgroundColor: "#fff", // card style
  },
  quote: { fontSize: 16, fontStyle: "italic", marginBottom: 8, color: "#333" },
  username: { fontSize: 14, fontWeight: "bold", alignSelf: "flex-end", color: "#9b6b72" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(79, 76, 76, 0.5)" },
  modalContent: { width: "90%", padding: 20, backgroundColor: "hsla(0, 0%, 100%, 1.00)", borderRadius: 10, color: "#000000ff"},
  input: {
    borderWidth: 1,
    borderColor: "#f08d8dff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "black", // <-- text color white
  },
});
