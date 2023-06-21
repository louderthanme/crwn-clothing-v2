import { createContext, useState, useEffect } from 'react';
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

import SHOP_DATA from '../shop_data.js'

// Create the user context with default values
export const ProductsContext = createContext({
    products: [],
    setProduct: () => null,
});

// UserProvider component with user state management
export const ProductsProvider = ({ children }) => {
    const [products] = useState([]);
    const value = { products };

    // the code below should be run only when I want to update the database.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    return (
        // Provide the user context value to the wrapped components
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};
