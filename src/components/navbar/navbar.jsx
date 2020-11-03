import React from 'react';
import StyledNavbar from './navbar.style';
import StyledContainer from '../container/container.style';
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
    return (
        <StyledNavbar className="navbar navbar-expand-lg navbar-dark bg-dark">
            <StyledContainer>
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/customers/new">
                            Add Customer
                    </NavLink>
                    </div>
                </div>
            </StyledContainer>
        </StyledNavbar>
    );
};

export default NavBar;