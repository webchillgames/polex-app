import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0zTuLnI61X5uWxVcm8OvAEnu4lXA4Ld4",
  authDomain: "polex-app.firebaseapp.com",
  projectId: "polex-app",
  storageBucket: "polex-app.appspot.com",
  messagingSenderId: "508604988696",
  appId: "1:508604988696:web:070bbf2fd55443690c726d",
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const fbDatabase = getDatabase();
export const fbRef = ref;
