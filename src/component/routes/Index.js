import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import routes from "./routes.jsx";
require('dotenv').config()

const AuthRoute = (props) => {
    const isLogin = localStorage.getItem("access_token") || false;
    const render = isLogin ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/login",
            }}
        />
    );

    return render;
};
const Routes = () => (
    <Router basename={`${process.env.REACT_APP_BASE_NAME}/`}>
        {/* <Switch> */}
            {routes.map((route, i) => {
                if (route.auth) {
                    return <AuthRoute key={route.path} {...route} />;
                } else {
                    return <Route key={route.path} {...route} />;
                }
            })}
        {/* </Switch> */}
    </Router>
);

export default Routes;
