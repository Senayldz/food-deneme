// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAW2HUMt1ihzk2y7t9Tdw_KK6SbxKRGgBc",
  authDomain: "food-demo-client.firebaseapp.com",
  projectId: "food-demo-client",
  storageBucket: "food-demo-client.appspot.com",
  messagingSenderId: "681093608281",
  appId: "1:681093608281:web:0f5da66ad76494f1de5248",
  measurementId: "G-RB5XMEDG24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app; // Default export
