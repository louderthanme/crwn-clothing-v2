import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNKqXQUHGTw-ez_4cL-T6ejirrYeYEDcI",
    authDomain: "clothing-store-572ee.firebaseapp.com",
    projectId: "clothing-store-572ee",
    storageBucket: "clothing-store-572ee.appspot.com",
    messagingSenderId: "700146097333",
    appId: "1:700146097333:web:a69084e45693e59b50f2fc"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Google authentication provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Authentication instance
export const auth = getAuth();

// Sign in with Google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Firestore database instance
export const db = getFirestore();

// Add a collection and documents to Firestore using batch writes
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    // Iterate over each object and create a new document reference
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object); // Set the data for the document
    });

    await batch.commit(); // Commit the batch write
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef) // this is a snapshottable object now

    const querySnapshot = await getDocs(q); //going to firestore to get snapshot, hence await
    //querySnapshot.docs //array of individual docs inside, snapshots are the actual data. We wanna reduce over it

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;

    }, {}); //this last empty object is in itself the initial value for the reduce method. Reducing everything from the snapshops into a usuable object here 

    return categoryMap;
}

// Create a user document in Firestore based on user authentication data
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    // Get the document reference for the user
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (e) {
            console.log('error creating user', e.message);
        }
    }

    return userDocRef;
};

// Create a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Sign-in completed.');
  
    return userCredential;
  };

// Sign out the currently authenticated user
export const signOutUser = async () => await signOut(auth);

// Add an auth state change listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
