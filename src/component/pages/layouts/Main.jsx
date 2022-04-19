import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import { Route } from 'react-router';
import { isLoginResponse } from "../../helpers/response";
import FaviconImg from '../../../assets/img/favicon.png';


const Main = ({ component: Component, title, ...rest }) => {
    const [sideActive, setSideActive] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    let history = useHistory();

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    }, [width]);



    const MINUTE_MS = 86400;
    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('admin_profile');
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
    const getFaviconEl = () => {
        return document.getElementById("favicon");
    }

    useEffect(() => {
        isLoginResponse(history);
        document.title = process.env.REACT_APP_APP_NAME + ' ' + title;
        const favicon = getFaviconEl(); // Accessing favicon element
        favicon.href = FaviconImg;

    }, [title]);

    const sidebarToggle = () => {
        sideActive ? setSideActive(false) : setSideActive(true)
    }

    return (
        <>
            <div id="app" className={`app ${sideActive ? width >= 992 ? 'app-sidebar-minified' : 'app-sidebar-mobile-toggled' : ''} `}>
                <Header sidebarToggle={sidebarToggle} />
                <Sidebar sidebarToggle={sidebarToggle} sideActive={sideActive} />

                <div id="content" className="app-content">
                    <Route {...rest} render={props => (
                        <Component {...props} />
                    )} />
                </div>
            </div>
        </>
    )

}
export default Main;