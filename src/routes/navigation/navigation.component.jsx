import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

const Navigation = () => {
    return (
        <Fragment> {/* contains entire page */}
            <div className="navigation">
                {/* Link essentially works as an anchor tag but it has extra functionality connected to react. It is also very clear where it points to and how it gets there */}
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                </div>

            </div>
            <Outlet />
        </Fragment >
    );
};

export default Navigation

