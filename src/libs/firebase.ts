import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCR8g8K9OdADIwsOrqoVgF3zQ1uwkkuTh0',
  authDomain: 'kudo-2022.firebaseapp.com',
  databaseURL: 'https://kudo-2022-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'kudo-2022',
  storageBucket: 'kudo-2022.appspot.com',
  messagingSenderId: '260655903935',
  appId: '1:260655903935:web:2ab9abd9e1bb58359b420a',
  measurementId: 'G-BVHEETP04B'
};

export const reg_token =
  'fp_Wu9BCP3HEhhoL59A8Hr:APA91bEl5y9Dkdhk4Ul_sz9NYPflh7jxN8yOLNHlCrkpcaDg03OzP_k3R19GCFt9TdvCWQvPCdph9i4Yb2j5n_3qST7pmLEyb4I1ZAY-s7cgxUGwV3rKeu-89Oe75yz22wS1P6ybhkYc';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const realtimeDB = getDatabase(app);
