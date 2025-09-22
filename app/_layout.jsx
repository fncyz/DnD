import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../auth/authContext";
import { useEffect } from "react";
import { View, ActivityIndicator, Platform, StyleSheet } from "react-native";

function RootNavigator() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // redirect to login if not logged in
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b3506fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      {Platform.OS === 'web' && (
        <style dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; }
            html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
            #root { width: 100%; min-height: 100vh; overflow-x: hidden; }
            body { overflow-x: hidden; }
            .container { max-width: 100%; overflow-x: hidden; }
            p, div, span, text { word-wrap: break-word; overflow-wrap: break-word; }
            input, textarea { max-width: 100%; box-sizing: border-box; }
            button { max-width: 100%; white-space: normal; }
          `
        }} />
      )}
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      marginHorizontal: 'auto',
      width: '100%',
      minHeight: '100vh',
      overflowX: 'hidden',
    }),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      marginHorizontal: 'auto',
      width: '100%',
      minHeight: '100vh',
      overflowX: 'hidden',
    }),
  },
});
