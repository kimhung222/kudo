import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: 'AIzaSyCR8g8K9OdADIwsOrqoVgF3zQ1uwkkuTh0',
  authDomain: 'kudo-2022.firebaseapp.com',
  projectId: 'kudo-2022',
  storageBucket: 'kudo-2022.appspot.com',
  messagingSenderId: '260655903935',
  appId: '1:260655903935:web:2ab9abd9e1bb58359b420a',
  measurementId: 'G-BVHEETP04B',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

const messaging = getMessaging(app);

export const getToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'GENERATED_MESSAGING_KEY' }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });