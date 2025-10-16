import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfqJCfNsj6H4hL9W80yGwJyduwzSu8HiE",
  authDomain: "d-nd-5ce62.firebaseapp.com",
  projectId: "d-nd-5ce62",
  storageBucket: "d-nd-5ce62.appspot.com",
  messagingSenderId: "448345881932",
  appId: "1:448345881932:web:897f86c765d059ab5b63e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore & Auth
export const db = getFirestore(app);
export { auth };
export default app;
