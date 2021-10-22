import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/img/logo.png';

import User from '../../../assets/img/user/profile.jpg';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faWrench, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Header = (props) => {
    const { sidebarToggle } = props;

    const [name, setName] = useState(User);
    const [profile, setProfile] = useState(User);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('admin_profile'))) {
            setName(JSON.parse(localStorage.getItem('admin_profile')).name);
        }

        if (JSON.parse(localStorage.getItem('admin_profile'))) {
            setProfile(JSON.parse(localStorage.getItem('admin_profile')).profile_pic);
        }
    }, [])


    return (
        <>
            <div id="header" className="app-header">
                <div className="mobile-toggler">
                    <button type="button" className="menu-toggler" data-toggle="sidebar-minify" onClick={sidebarToggle}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>

                <div className="brand">
                    <div className="desktop-toggler">
                        <button type="button" className="menu-toggler" data-toggle="sidebar-minify" onClick={sidebarToggle}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>
                    </div>
                    <Link to={"/"} className="brand-logo">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </div>

                <div className="menu">
                    <Dropdown className="menu-item">
                        <Dropdown.Toggle id="dropdown-profile-button" className="menu-link">
                            <div className="menu-img user-profile-img online">
                                <img src={profile} alt="" className="w-100 h-100 rounded-circle" />
                            </div>
                            <div className="menu-text">{name}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu menuAlign="right" className="mr-lg-3">
                            {localStorage.getItem('permissions').includes('subadmin_profile') ?
                                <Link to={"/profile"} className="dropdown-item d-flex align-items-center">
                                    <FontAwesomeIcon icon={faUserCircle} className="fa-fw mr-2 text-gray-400 f-s-16" /> Edit Profile
                                </Link>
                                : ''}
                            {localStorage.getItem('permissions').includes('subadmin_change_password') ?
                                <Link to={"/change-password"} className="dropdown-item d-flex align-items-center">
                                    <FontAwesomeIcon icon={faWrench} className="fa-fw mr-2 text-gray-400 f-s-16" /> Change Password
                                </Link>
                                : ''}
                            <div className="dropdown-divider"></div>
                            {localStorage.getItem('permissions').includes('subadmin_logout') ?
                                <Link to={"/logout"} className="dropdown-item d-flex align-items-center">
                                    <FontAwesomeIcon icon={faToggleOff} className="fa-fw mr-2 text-gray-400 f-s-16" /> Log Out
                                </Link>
                                : ''}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    )

}
export default Header;