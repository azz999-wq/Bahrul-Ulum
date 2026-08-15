import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpRE_tUyT1fjL88PN0bZ5emS3S4Hn64_s",
  authDomain: "bahrul-ulum-web.firebaseapp.com",
  projectId: "bahrul-ulum-web",
  storageBucket: "bahrul-ulum-web.firebasestorage.app",
  messagingSenderId: "378515606416",
  appId: "1:378515606416:web:95f56f222bd566aef6c115",
  measurementId: "G-9G8T5RR5W6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}