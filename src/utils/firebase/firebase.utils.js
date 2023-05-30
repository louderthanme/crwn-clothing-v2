import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore, // to initialize
    doc, // needed for actual doc instance
    getDoc, //getting docs data
    setDoc //setting docs data
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDNKqXQUHGTw-ez_4cL-T6ejirrYeYEDcI",
    authDomain: "clothing-store-572ee.firebaseapp.com",
    projectId: "clothing-store-572ee",
    storageBucket: "clothing-store-572ee.appspot.com",
    messagingSenderId: "700146097333",
    appId: "1:700146097333:web:a69084e45693e59b50f2fc"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();//needs new because it's essentially a class we get from google firebase authentication
googleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore() // Initializing database

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)  //database, collectionName, uid to connect it to the response we get from signInWithGooglePopup(); in our sign in page.
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); // to know when they signed in.
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (e) {
            console.log('error creating user', e.message)
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)