import { createContext, useState, useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// Create the user context with default values
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// UserProvider component with user state management
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // signOutUser();  //sign out from the get go so out auth object stops tracking that im signed in

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)//which is being tracked by firebase on the auth singleton. It will store null when a user signs out
        })
        return unsubscribe // when it mounts it stops listening
    }, [])

    return (
        // Provide the user context value to the wrapped components
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
