const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// const app = initializeApp({
//     apiKey: "AIzaSyCjIQhiSQBCIMcS4JWtX0T9pTZeijXx9N8",
//   authDomain: "beebox-79004.firebaseapp.com",
//   projectId: "beebox-79004",
//   storageBucket: "beebox-79004.appspot.com",
//   messagingSenderId: "70214489153",
//   appId: "1:70214489153:web:b49e94b45ae935762be2c0"
// })
const app = initializeApp({
  apiKey: "AIzaSyCphnd0vD2oRcdr-W-fqBNs9iyk6Xd6czk",
  authDomain: "beebox-82624.firebaseapp.com",
  projectId: "beebox-82624",
  storageBucket: "beebox-82624.appspot.com",
  messagingSenderId: "357997859257",
  appId: "1:357997859257:web:a7e3e98c12f70cc3fc2668"
});
const db = getFirestore(app);

module.exports = db;
