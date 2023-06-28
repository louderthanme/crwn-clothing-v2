import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { UserProvider } from './context/user.context';
import { CategoriesProvider } from './context/categories.context';
import { CartProvider } from './context/cart.context';

import './index.scss';

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside the root element
root.render(
  // Enable strict mode for additional checks and warnings during development
  <React.StrictMode>
    {/* Enable client-side routing using the HTML5 history API */}
    <BrowserRouter>
      {/* Wrap the application with the UserProvider to provide user-related data and functions */}
      <UserProvider>

        {/* Wrap the application with the ProductProvider to provide product-data and functions, being the children of the userprovider allows the product to access info from users.  */}
        <CategoriesProvider>

          {/* The main component representing the entire application */}
          <CartProvider>
            <App />

          </CartProvider>


        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Report web vitals and performance metrics
reportWebVitals();


