import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTCNTmF0pvl3kA46yE00oUVD84QxxGcrc",
  authDomain: "e-speaking.firebaseapp.com",
  projectId: "e-speaking",
  storageBucket: "e-speaking.appspot.com",
  messagingSenderId: "831682381926",
  appId: "1:831682381926:web:f6144b67ae123c945cc5a7",
  measurementId: "G-5NF50TKYGB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)