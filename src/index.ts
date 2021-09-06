import { App } from './App';

try {
  new App()
    .start()
    .catch(handleError);
} catch (e) {
  handleError(e);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});
function handleError(e: any) {
  console.log(e);
  process.exit(1);
}
// const serviceAccount: ServiceAccount = require("./config/firebaseAccountKey.json")

// const deviceTest: string = 'euSULWQlQymIRTfAXNmoB-:APA91bEwY06Yk9TQaRJZJ025omZP2nEJoSO8kdP-CwNw_-bnV3BaYdNDXrHJ0r2mkNGaa0b7Ei1ZjnDA3rfkCZXaWwZLx-TroqirZdYN4xrRgkhdva_tQ7dRytBca6Sli2GFhhi3I7x8'
// var payload = {
//     notification: {
//       title: "Test firebase",
//       body: "Test message2"
//     },
//     data: {
//         title: "Test firebase",
//       body: "Test message2"
//     }
//   };

// var ok: boolean = false;
// var options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24
// };

// if (ok) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });

//   admin.messaging().sendToDevice(deviceTest, payload, options)
//   .then(function(response) {
//     console.log("Successfully sent message:", response);
//   })
//   .catch(function(error) {
//     console.log("Error sending message:", error);
//   });
// }
