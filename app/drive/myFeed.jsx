import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Button, Alert, TextInput, Modal, ActivityIndicator } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";

export default function MyFeed() {
  const { user, loading, logout } = useAuth();  // added loading
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    if (!user) return; // guard null user

    const q = query(collection(db, "posts"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });

    return unsubscribe;
  }, [user]);

  const handleDelete = (post) => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => await deleteDoc(doc(db, "posts", post.id)) },
    ]);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewContent(post.content);
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (!newContent.trim()) return;
    await updateDoc(doc(db, "posts", editingPost.id), { content: newContent });
    setModalVisible(false);
    setEditingPost(null);
    setNewContent("");
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (err) {
            console.error("Logout failed:", err.message);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#924b4bff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.loginPrompt}>You must be logged in to view your posts.</Text>
        {/* You could add a button here to navigate to login if desired */}
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.quote}>"{item.content}"</Text>
      <Text style={styles.username}>—{item.username}</Text>
      <View style={styles.actions}>
        <Button title="Edit" color="#bd8993ff" onPress={() => handleEdit(item)} />
        <Button title="Delete" color="#743945ff" onPress={() => handleDelete(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Personal Feed</Text>

      <View style={styles.logoutContainer}>
        <Button title="Logout" color="#6d2e2eff" onPress={handleLogout} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

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
  container: { flex: 1, backgroundColor: "#000000ff", paddingTop: 40 },
  title: {
    fontSize: 30 ,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#745b5bff",
  },
  logoutContainer: { padding: 10, backgroundColor: "#000000ff", alignItems: "flex-end" },
  post: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#745b5bff",
    borderRadius: 8,
    backgroundColor: "#000000",
    color: "white",
  },
  quote: { fontSize: 16, fontStyle: "italic", marginBottom: 8, color: "#ffffffff" },
  username: { fontSize: 14, fontWeight: "bold", alignSelf: "flex-end", color: "#9b6b72" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(79, 76, 76, 0.5)" },
  modalContent: { width: "90%", padding: 20, backgroundColor: "#000000", borderRadius: 10, color: "white" },
  input: { borderWidth: 1, borderColor: "#f08d8dff", borderRadius: 8, padding: 10, marginBottom: 10, color: "#ffffffff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  centeredContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loginPrompt: { fontSize: 16, color: "#924b4bff", textAlign: "center" },
});
