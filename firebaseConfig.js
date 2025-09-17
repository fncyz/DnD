import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

// Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
