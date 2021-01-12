const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp();

exports.newMessageNotification = functions.database.ref('/chats/{chatID}/messages/{messageID}/{recipientID}').onWrite(

    async (change,context) => {
        if (!change.after.val()) {
                return console.log('message deleted');
        }


        const chatId = context.params.chatID
        const messageId = context.params.messageID
        const recipientId = context.params.recipientID
        const recipientType = recipientId.split('%')[0];
        const recipientKey = recipientId.split('%')[1];

        let path;
        if (recipientType === 'USER') {
            path = `users/${recipientKey}`
        } else if (recipientType === 'PAGE') {
            path = `pages/${recipientKey}`
        }

        const getDeviceTokensPromise = admin.database()
            .ref(path + '/notificationToken').once('value');

        const results = await Promise.all([getDeviceTokensPromise])

        const tokenSnapShot = results[0]

        console.log('tokenSnapShot', tokenSnapShot)

        if (!tokenSnapShot.hasChildren()) {
                return console.log('There are no notification tokens available')
        }


        console.log(`recipient info (raw) -> ${recipientId}`)
        console.log(`recipientType --> ${recipientId.split('%')[0]}`)
        console.log(`recipientKey ---> ${recipientId.split('%')[1]}`)
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
