import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDNKqXQUHGTw-ez_4cL-T6ejirrYeYEDcI",
    authDomain: "clothing-store-572ee.firebaseapp.com",
    projectId: "clothing-store-572ee",
    storageBucket: "clothing-store-572ee.appspot.com",
    messagingSenderId: "700146097333",
    appId: "1:700146097333:web:a69084e45693e59b50f2fc"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();//needs new because it's essentially a class we get from google firebase authentication

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)