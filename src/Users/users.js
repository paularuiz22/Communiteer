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
            userType: userTypes.VOLUNTEER,
            trustedUsers: {
                'qcaliendo3':true
            },
            password: 'test1'
        },
        {
            id: '4',
            username: 'elenaEruiz',
            email: 'elenaeruiz@gmail.com',
            firstName: 'Elena',
            lastName: 'Ruiz',
            streetAddress: '205 Beaver Creek Lane',
            city: 'Woodstock',
            state: 'GA',
            zipCode: 30189,
            userType: userTypes.VOLUNTEER,
            trustedUsers: ['lizBashaw'],
            password: 'test2'
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
            userType: userTypes.REQUESTOR,
            trustedUsers: ['paularuiz22'],
            password: 'test3'
        },
        {
            id: '3',
            username: 'lizBashaw',
            email: 'lizbashaw@gmail.com',
            firstName: 'Elizabeth',
            lastName: 'Bashaw',
            streetAddress: '47 North Ridge Lane',
            city: 'Asheville',
            state: 'NC',
            zipCode: 28791,
            userType: userTypes.REQUESTOR,
            trustedUsers: {
                'paularuiz22':true
            },
            password: 'test4'
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
            userType: user.userType,
            trustedUsers: user.trustedUsers
         });
    });
    //db.ref('/users').push({userData});
    return null;
}