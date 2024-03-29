import firebase from "firebase/compat"
import dotenv from "dotenv"

dotenv.config()
const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId:process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId:process.env.REACT_APP_FIREBASE_APPID,
};

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase;