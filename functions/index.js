const functions = require("firebase-functions");
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp(functions.config().firebase);

const database = admin.database().ref('/items');

exports.addItem = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
        console.log(req.body)
        const item = req.body.item
        database.push({ item });
        let items = [];
        return database.on('value', (snapshot) => {
            snapshot.forEach((item) => {
                items.push({
                    id: item.key,
                    items: item.val().item
                });
            });
            res.status(200).json(items)
        }, (error) => {
            res.status(error.code).json({
                message: `Something went wrong. ${error.message}`
            })
        })
    })
})