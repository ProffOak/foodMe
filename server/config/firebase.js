const admin = require('firebase-admin');

const serviceAccount = require("../foodme-199118-firebase-adminsdk-ylnbc-757f52db6b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://foodme-199118.firebaseio.com"
});


module.exports = admin;