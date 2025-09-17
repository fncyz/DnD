import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../auth/authContext";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AuthGate>
        <Slot /> {/* This renders all pages automatically */}
      </AuthGate>
    </AuthProvider>
  );
}

// AuthGate ensures only logged-in users can access protected pages
function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // redirect to login if not authenticated
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#21cc8d" />
      </View>
    );
  }

  return children;
}
