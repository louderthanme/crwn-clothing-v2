import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

// import SHOP_DATA from '../shop_data.js'

// Create the user context with default values
export const CategoriesContext = createContext({
    categoriesMap: {},
    setProduct: () => null,
});

// UserProvider component with user state management
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {  //when using async methods inside a useEffect I ahve to wrap it in an async function anyway.
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    }, [])


    const value = { categoriesMap };

    // the code below should be run only when I want to update the database.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    return (
        // Provide the user context value to the wrapped components
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};
