import { React, Component } from "react";
import userTypes from "./userType";
import db from "../../config.js"

export default function Users() {
    let userData = [
        {
            id: '1',
            username: 'paularuiz22',
            email: 'paularuiz22@gmail.com',
            firstName: 'Paula',
            lastName: 'Ruiz',
            streetAddress: '205 Beaver Creek Lane',
            city: 'Woodstock',
            state: 'GA',
            zipCode: 30189,
            userType: userTypes.VOLUNTEER
        },
        {
            id: '2',
            username: 'jessicaruizwoodstock',
            email: 'jessicaruizwoodstock@gmail.com',
            firstName: 'Jessica',
            lastName: 'Ruiz',
            streetAddress: '205 Beaver Creek Lane',
            city: 'Woodstock',
            state: 'GA',
            zipCode: 30189,
            userType: userTypes.REQUESTOR
        },

    ];
    userData.forEach((user) => {
        db.ref('/users').push({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            streetAddress: user.streetAddress,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            userType: user.userType
         });
    });
    //db.ref('/users').push({userData});
    return null;
}