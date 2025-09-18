import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../auth/authContext";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function DriveTabLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // redirect if logged out
      router.replace("/");
    }
  }, [user, loading]);

  if (loading) {
    // while checking auth state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#924b4bff" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#924b4bff",
        tabBarInactiveTintColor: "#d08b8bff",
        tabBarStyle: {
          backgroundColor: "#fffefeff",
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myFeed"
        options={{
          title: "My Feed",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create Post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
