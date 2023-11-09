import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBPCMJ_C5cawTj92X_ND4RnLXn9zPYgQcQ",
  authDomain: "rozetka-c01e7.firebaseapp.com",
  projectId: "rozetka-c01e7",
  storageBucket: "rozetka-c01e7.appspot.com",
  messagingSenderId: "572536174438",
  appId: "1:572536174438:web:1aa4afce31b70b82723aa7",
  measurementId: "G-3J0QLNHJR3",
  databaseURL: "https://rozetka-c01e7-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
