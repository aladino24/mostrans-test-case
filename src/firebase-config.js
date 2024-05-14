import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCg6-1gxwa8a6xeB53gkV8tT2pxRjLSbo0",
    authDomain: "mostrans-test.firebaseapp.com",
    projectId: "mostrans-test",
    storageBucket: "mostrans-test.appspot.com",
    messagingSenderId: "126320024836",
    appId: "1:126320024836:web:9bc24b3a80fcc975878451"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}
