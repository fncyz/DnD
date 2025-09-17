import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";

export default function MyFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "posts"),
      where("authorId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#21cc8d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Feed</Text>
      {posts.length === 0 ? (
        <Text>You haven't posted any quotes yet.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.quote}>"{item.quote}"</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  post: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 12 },
  quote: { fontSize: 16 },
});
