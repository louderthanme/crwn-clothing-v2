import { createContext, useState, useEffect } from 'react';
import PRODUCTS from '../shop_data.json'

// Create the user context with default values
export const ProductsContext = createContext({
    products: [],
    "id": null,
    "name": null,
    "imageUrl": null,
    "price": null,
    setProduct: () => null,
});

// UserProvider component with user state management
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    useEffect(() => {

    }, [])

    return (
        // Provide the user context value to the wrapped components
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};
