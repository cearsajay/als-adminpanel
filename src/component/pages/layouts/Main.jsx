import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import { Route } from 'react-router';
import { isLoginResponse } from "../../helpers/response";


const Main = ({ component: Component, ...rest }) => {
    const [sideActive, setSideActive] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    let history = useHistory();

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    }, [width]);

    const MINUTE_MS = 6000000;

    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('admin_profile');
            console.log('Logs every minute');
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    useEffect(() => {
        isLoginResponse(history);
    }, []);

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

                {/* <a href="#" data-click="scroll-top" className="btn-scroll-top fade"><i className="fa fa-arrow-up"></i></a> */}
            </div>
        </>
    )

}
export default Main;