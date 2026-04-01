import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// NOTE: Firebase Web API keys are intentionally public — they identify the project.
// Security is enforced by Firebase Security Rules (firestore.rules / storage.rules),
// NOT by keeping this key secret. See: https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: "AIzaSyBDorLn2ZyOj5WBxBvaQSxK-Sn8vtfVhVY",
  authDomain: "thakurji-bouquet-shop.firebaseapp.com",
  projectId: "thakurji-bouquet-shop",
  storageBucket: "thakurji-bouquet-shop.firebasestorage.app",
  messagingSenderId: "571310987547",
  appId: "1:571310987547:web:ba5c2e33e77ecef3c1dbbe"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { collection, getDocs, doc, setDoc, deleteDoc, ref, uploadString, getDownloadURL };

