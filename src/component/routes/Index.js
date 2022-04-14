import React from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import routes from "./routes.jsx";
require('dotenv').config()
const AuthRoute = (props) => {
    const isLogin = localStorage.getItem("access_token") || false;
    const render = isLogin ? (
        <>
            {(localStorage.getItem('permissions') && localStorage.getItem('permissions').length > 0 && localStorage.getItem('permissions').includes(props.permission)) ? <Route {...props} /> : <Redirect
                to={{
                    pathname: "/permissions_not_access",
                }}
            />}
        </>
    ) : (
        <Redirect
            to={{
                pathname: "/",
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
