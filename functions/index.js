const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp();

exports.pushMessageNotification = functions.database.ref('/chats/{chatID}/messages/{messageID}').onWrite(

    async (change,context) => {
        if (!change.after.val()) {
                return console.log('message deleted');
        }

        const chatId = context.params.chatID
        const messageId = context.params.messageID
        console.log(`new message in chat (id) ${chatId} - message (id) ${messageId}`)
        const message = change.after.val()

        const senderName = message.userName;
        const senderKey = message.userKey;
        const senderType = message.userType;
        const recipientKey = message.recipientKey;
        const recipientType = message.recipientType;

        let tokenPath;
        if (recipientType === 'USER') {
            tokenPath = `users/${recipientKey}/notificationToken`
        } else if (recipientType === 'PAGE') {
            tokenPath = `pages/${recipientKey}/notificationToken`
        }

        let token;
        admin.database()
            .ref(tokenPath).on('value', (snapshot) => {
                    token = Object.keys(snapshot.val())[0]

                    if (token) {
                        const payload = {
                            notification: {
                                title: 'You have a new message!',
                                body: `${senderName} sent you a message`,
                            }
                        }

                        admin.messaging().sendToDevice(token,payload)
                            .then(response => {
                                console.log(response);
                                console.log('SUCCESSFULLY SENT MESSAGE')
                            })
                            .catch(error => {
                                console.log(error);
                                console.log('FAILED TO SEND MESSAGE')
                            })
                    }
        }, (error) => {
                    console.log('read failed ->>', error.code)
            });

    }

)



exports.writeToNewMessages = functions.database.ref('/chats/{chatID}/messages/{messageID}').onWrite(

    async (change,context) => {
        if (!change.after.val()) {
            return console.log('message deleted');
        }

        const chatId = context.params.chatID
        const messageId = context.params.messageID
        console.log(`new message in chat (id) ${chatId} - message (id) ${messageId}`)
        const message = change.after.val()

        const senderName = message.userName;
        const senderKey = message.userKey;
        const senderType = message.userType;
        const recipientKey = message.recipientKey;
        const recipientType = message.recipientType;
        console.log('SENDER-NAME', senderName);
        console.log('SENDER-KEY', senderKey);

        let recipientPath;
        if (recipientType === 'USER') {
            recipientPath = `users/${recipientKey}/newMessages/${senderKey}`
        } else if (recipientType === 'PAGE') {
            recipientPath = `pages/${recipientKey}/newMessages/${senderKey}`
        }

        console.log('RECIPIENT PATH -> ', recipientPath);
        const payload = {
            senderKey: senderKey,
            senderName: senderName,
            chatKey: chatId,
            message: {...message}
        }
        console.log('PAYLOAD => ', payload)

        admin.database().ref(recipientPath).set(payload)
            .then(response => {
                console.log('SUCCESS - wrote notification', response);
            })
            .catch(error => {
                console.log('FAILED to write notification', error);
            })
    }




)





