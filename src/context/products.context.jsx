import { createContext, useState, useEffect } from 'react';
import PRODUCTS from '../shop_data.json'

// Create the user context with default values
export const ProductsContext = createContext({
    products: [],
    setProduct: () => null,
});

// UserProvider component with user state management
export const ProductsProvider = ({ children }) => {
    const [products] = useState(PRODUCTS);
    const value = { products };

    useEffect(() => {

    }, [])

    return (
        // Provide the user context value to the wrapped components
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};
