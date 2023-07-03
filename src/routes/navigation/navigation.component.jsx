import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment> {/* Contains the entire page */}

            <NavigationContainer>

                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks >
                
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span'onClick={signOutUser}>
                                SIGN OUT
                                </NavLink>
                        ) : (
                            <NavLink  to="/auth">
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <NavLink  to="/checkout">
                        `CHECKOUT`
                    </NavLink>
                    <CartIcon />

                    {/* Conditionally render the CartDropdown component based on the isCartOpen value */}
                    {isCartOpen && <CartDropdown />}
                </NavLinks>
            </NavigationContainer>

            <Outlet /> {/* Renders child routes */}
        </Fragment>
    );
};

export default Navigation;
