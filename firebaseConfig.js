import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHbC1xL7XCGGx-dRrywKyFWxlF3XpOcCg",
  authDomain: "marsvin-3042a.firebaseapp.com",
  projectId: "marsvin-3042a",
  storageBucket: "marsvin-3042a.appspot.com",
  messagingSenderId: "246546268338",
  appId: "1:246546268338:web:af8f55c12980a5a3bc09ab",
  measurementId: "G-JD35L4VPB4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);