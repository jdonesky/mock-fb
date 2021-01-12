const functions = require("firebase-functions");
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp(functions.config().firebase);

exports.sendMessageNotification = functions.database.ref('conversations/{conversationID}/messages/{messageID}').onWrite(event => {
    if (event.data.previous.exists()) {
        return;
    }

    admin.database().ref('messages').child(event.params.messageID).once('value').then(function(snap) {
        const messageData = snap.val();

        const topic = 'notifications_' + messageData.receiverKey;
        const payload = {
            notification: {
                title: "You got a new Message",
                body: messageData.content,
            }
        };

        admin.messaging().sendToTopic(topic, payload)
            .then(function(response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
                console.log("Error sending message:", error);
            });
    });
});

