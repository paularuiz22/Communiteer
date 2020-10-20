/*
import * as firebase from 'firebase';
import jobTypes from "./jobTypes";
import db from "./config";

function index() {

    // Get a reference to the database service
    var database = db;
    var volunteers = database.child("volunteers");
    var jobs = database.child("jobs");
    var requestors = database.child("requestors");

    volunteers.push({
        "username": "paularuiz22",
        "firstName": "Paula",
        "lastName": "Ruiz",
        "email": "paularuiz22@gmail.com"
    });

    requestors.push({
        "username": "grandmaLiz",
        "firstName": "Elizabeth",
        "lastName": "Bashaw",
        "email": "grandmaLiz41@gmail.com"
    });

    jobs.push({
        "title": "Walk My Dog",
        "type": jobTypes.TECHNOLOGY,
        "time": "3pm - 5pm",
        "date": "Sempter 23, 2020",
        "requestor": "grandmaLiz",
        "volunteer": "paularuiz22"
    });
}

export default index;

//export function writeUserData()

*/
