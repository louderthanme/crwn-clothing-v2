import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment> {/* Contains the entire page */}
            <div className="navigation">
                {/* Link essentially works as an anchor tag but it has extra functionality connected to React. It is also very clear where it points to and how it gets there */}
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                                SIGN IN
                            </Link>
                        )
                    }
                    <Link className="nav-link" to="/checkout">
                        `CHECKOUT`
                    </Link>
                    <CartIcon />

                    {/* Conditionally render the CartDropdown component based on the isCartOpen value */}
                    {isCartOpen && <CartDropdown />}
                </div>
            </div>

            <Outlet /> {/* Renders child routes */}
        </Fragment>
    );
};

export default Navigation;
