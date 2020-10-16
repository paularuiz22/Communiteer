function index() {

    const docRef = db.collection('jobs').doc('walkPaula');

    await docRef.set({
        'volunteer': '',
        'requestor': 'paularuiz22',
        'startTime': '15:00',
        'endTime': '16:00',
        'date': '10/25/2020',
        'description': 'Please walk my dog. She is well-behaved and gentle.'
    }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
     });

    const gardenClaraRef = db.collection('jobs').doc('gardenClara');

    await gardenClaraRef.set({
        'volunteer': '',
        'requestor': 'claraGkennedy',
        'startTime': '10:00',
        'endTime': '12:00',
        'date': '10/21/2020',
        'description': 'Please mow my grass and weed the flower beds.'
    });

    const snapshot = await db.collection('jobs').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });

    const testVolRef = db.collection('volunteers').doc('test1');

    await testVolRef.set({
        'username': 'test-user-1',
        'password': '0000',
        'firstName': 'Halburt',
        'lastName': 'Helmut',
    });

}
export default index;