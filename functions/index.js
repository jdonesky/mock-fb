const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

exports.sendMessageNotification = functions.database.ref('/chats/{chatID}/messages/{messageID}').onWrite(
    async (change,context) => {
        const chatId = context.params.chatID
        const messageId = context.params.messageID

        if (!change.after.val()) {
            return console.log('message deleted');
        }

        console.log(`new message in chat (id) ${chatId} - message (id) ${messageId}`)
        const message = change.after.val()
        console.log('message', message);
    }
)

// exports.sendMessageNotification = functions.database.ref('chats/{chatID}/messages/{messageID}').onWrite(event => {
//     if (event.data.previous.exists()) {
//         return;
//     }
//
//     admin.database().ref('chats').child(event.params.messageID).once('value').then(function(snap) {
//         const messageData = snap.val();
//
//         const topic = 'notifications_' + messageData.receiverKey;
//         const payload = {
//             notification: {
//                 title: "You got a new Message",
//                 body: messageData.content,
//             }
//         };
//
//         admin.messaging().sendToTopic(topic, payload)
//             .then(function(response) {
//                 console.log("Successfully sent message:", response);
//             })
//             .catch(function(error) {
//                 console.log("Error sending message:", error);
//             });
//     });
// });
//
