import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAkBez1vD0HnrHsMGB2SskVCnC1KUf-EAw",
    authDomain: "saving-loyalty.firebaseapp.com",
    databaseURL: "https://saving-loyalty-default-rtdb.firebaseio.com",
    projectId: "saving-loyalty",
    storageBucket: "saving-loyalty.appspot.com",
    messagingSenderId: "13348699698",
    appId: "1:13348699698:web:f98487640445a62054c62b",
}

const firebaseApp = initializeApp(FIREBASE_CONFIG)

export const authentication = getAuth(firebaseApp)
