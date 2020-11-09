import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAOrcreYt99Sm5lthdeJZ2mlEQ7NxbjBDA",
    authDomain: "communiteer-2020fall.firebaseapp.com",
    databaseURL: "https://communiteer-2020fall.firebaseio.com/",
    storageBucket: "communiteer-2020fall.appspot.com"
};
const app = firebase.initializeApp(config);
const db = app.database();
export { db };
