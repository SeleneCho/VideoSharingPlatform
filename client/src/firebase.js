import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANwxuWTE-Kd1agoM0iK75ROXxBQkUk_jo",
  authDomain: "video-share-app-c58d2.firebaseapp.com",
  projectId: "video-share-app-c58d2",
  storageBucket: "video-share-app-c58d2.appspot.com",
  messagingSenderId: "379610325224",
  appId: "1:379610325224:web:b936cef57e647567c5695d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
