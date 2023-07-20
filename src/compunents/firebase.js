

import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDtYnEGyjhmUMrCjvyyYvSkr0IqsT1uGK4",
    authDomain: "moivereview-153d0.firebaseapp.com",
    projectId: "moivereview-153d0",
    storageBucket: "moivereview-153d0.appspot.com",
    messagingSenderId: "198541692281",
    appId: "1:198541692281:web:f0724cbbcb5433f359f3a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const movieRef=collection(db,"movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export const reviewRef=collection(db,"reviews");
export const userRef=collection(db,"users");
export default app;