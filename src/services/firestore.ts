import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhCnG3rfFrNmXfyH1djppC8hh2wR5MibM",
    authDomain: "in-time-app-79c70.firebaseapp.com",
    projectId: "in-time-app-79c70",
    storageBucket: "in-time-app-79c70.firebasestorage.app",
    messagingSenderId: "342279931154",
    appId: "1:342279931154:web:d67c8f5a98d76f07f45fcb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const getDatabase = async () => {
    console.log('my database: ', db)
}