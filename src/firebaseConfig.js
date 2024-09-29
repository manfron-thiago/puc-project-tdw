import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "puc-project-tdw.firebaseapp.com",
    projectId: "puc-project-tdw",
    storageBucket: "puc-project-tdw.appspot.com",
    messagingSenderId: "651134164882",
    appId: "1:651134164882:web:64357ea04534c187352b4b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
