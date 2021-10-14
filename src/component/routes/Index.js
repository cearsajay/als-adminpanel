import React from "react";
import {
    HashRouter  as Router,
    Route,
    Redirect,
    Switch
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
    <Router>
        <Switch>
            {routes.map((route, i) => {
                if (route.auth) {
                    return <AuthRoute key={route.path} {...route} />;
                } else {
                    return <Route key={route.path} {...route} />;
                }
            })}
        </Switch>
    </Router>
);

export default Routes;
