import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

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
