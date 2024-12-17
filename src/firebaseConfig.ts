import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyC9_S7JeR9Rp7PsHOfficJe1bKp2RDygjs",
  
    authDomain: "dishly-2eea1.firebaseapp.com",
  
    projectId: "dishly-2eea1",
  
    storageBucket: "dishly-2eea1.firebasestorage.appspot.com",
  
    messagingSenderId: "927555228519",
  
    appId: "1:927555228519:web:711baa5deb403a678215c2"
  
  };
  

  
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);


export { auth,db };