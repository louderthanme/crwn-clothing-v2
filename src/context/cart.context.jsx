import { createContext, useState } from 'react';

// Create the user context with default values
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { }
});

// UserProvider component with user state management
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState();
    const value = { isCartOpen, setIsCartOpen };



    return (
        // Provide the user context value to the wrapped components
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
