import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { ENV_CONFIG } from "./env.config.js";

// Firebase credentials are loaded from env.config.js (gitignored)
// See js/env.config.example.js for the template
const app = initializeApp(ENV_CONFIG);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { collection, getDocs, doc, setDoc, deleteDoc, ref, uploadString, getDownloadURL };

