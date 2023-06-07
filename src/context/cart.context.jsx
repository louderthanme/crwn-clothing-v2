import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if (existingCartItem) {
        return cartItems.map(
            (cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
            // Remove the item from cartItems when quantity reaches 0
            return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
        } else {
            return cartItems.map((cartItem) =>
                cartItem.id === productToRemove.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }
    }

    return cartItems;
};

const deleteCartItem = (cartItems, productToDelete) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDelete.id
    );
    if (existingCartItem) {
        return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
    }
};



// Create the user context with default values
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cardCount: 0
});

// UserProvider component with user state management
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState();
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }


    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, deleteItemFromCart };


    return (
        // Provide the user context value to the wrapped components
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
