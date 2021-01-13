const functions = require("firebase-functions");
const admin = require('firebase-admin')

admin.initializeApp();

exports.onNewMessage = functions.database.ref('/chats/{chatID}/messages/{messageID}').onWrite(

    async (change,context) => {
        if (!change.after.val()) {
                return console.log('message deleted');
        }

        const chatId = context.params.chatID
        const messageId = context.params.messageID
        console.log(`new message in chat (id) ${chatId} - message (id) ${messageId}`)
        const message = change.after.val()

        console.log('message', message);
        const senderName = message.userName;
        const senderKey = message.userKey;
        const senderType = message.userType;
        const recipientKey = message.recipientKey;
        const recipientType = message.recipientType;
        console.log('message.userName', senderName);
        console.log('message.userKey', senderKey);
        console.log('message.userType', senderType);
        console.log('message.recipientKey', recipientKey);
        console.log('message.recipientType', recipientType);

        let tokenPath;
        if (recipientType === 'USER') {
            tokenPath = `users/${recipientKey}/notificationToken`
        } else if (recipientType === 'PAGE') {
            tokenPath = `pages/${recipientKey}/notificationToken`
        }
        console.log('TOKEN PATH ->> ', tokenPath)

        const payload = {
            notification: {
                title: 'You have a new message!',
                body: `${senderName} sent you a message`,
            }
        }

        let token;
        admin.database()
            .ref(tokenPath).on('value', (snapshot) => {
                    console.log('notificationToken ->> ', snapshot.val());
                    token = Object.keys(snapshot.val())[0]
                    console.log('Object.keys(snapshot.val())', Object.keys(snapshot.val()))
                    console.log('Object.keys(snapshot.val())[0]', Object.keys(snapshot.val())[0])
                    if (token) {
                        console.log(token)
                        admin.messaging().sendToDevice(token, payload)
                            .then(response => {
                                console.log(response);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
        }, (error) => {
                    console.log('read failed ->>', error.code)
            });

    }

)


