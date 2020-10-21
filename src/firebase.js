import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAOrcreYt99Sm5lthdeJZ2mlEQ7NxbjBDA",
  authDomain: "communiteer-2020fall.firebaseapp.com",
  databaseURL: "https://communiteer-2020fall.firebaseio.com",
  projectId: "communiteer-2020fall",
  storageBucket: "communiteer-2020fall.appspot.com",
  messagingSenderId: "1091732706602",
  appId: "1:1091732706602:web:5d56786be1011c7cb8fa53",
  measurementId: "G-ZK4DKJGRPT"
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
export default db;