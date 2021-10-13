import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse } from "../../helpers/response";
import { withRouter } from "react-router-dom";
const Login = () => {
    let history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    useEffect(() => {
        const isLogin = localStorage.getItem("access_token") || false;

        if (isLogin) {
            history.push("/");
        }

    }, []);

    const onSubmit = (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
        };
        axios
            .post(process.env.REACT_APP_BASE_URL + url.login, JSON.stringify(data), config)
            .then((response) => {
                let data = response.data.data; 
                localStorage.setItem(
                    "access_token",
                    data.data.access_token
                );
                localStorage.setItem(
                    "admin_profile",
                    JSON.stringify(data.data)
                );
                localStorage.setItem(
                    "site_setting",
                    JSON.stringify(data.site_setting)
                );
                successResponse(response);
                history.push("/");
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    return (

        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <h4> Hello! let's get started</h4>
                                <h6 className="font-weight-light">Sign in to continue.</h6>
                                <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            id="email"
                                            placeholder="Email"
                                            {...register('email', { required: true })}

                                        />
                                        {errors.email && errors.email.type === "required" && (
                                            <p className="errorMsg">Email is required.</p>
                                        )}
                                        {errors.email && errors.email.type === "pattern" && (
                                            <p className="errorMsg">Email is not valid.</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <input type="password"
                                            className="form-control form-control-lg"
                                            id="password"
                                            name="password"
                                            placeholder="password"
                                            {...register('password', { required: true })}
                                        />
                                        {errors.password && errors.password.type === "required" && (
                                            <p className="errorMsg">password is required.</p>
                                        )}
                                    </div>

                                    <div className="mt-3">
                                        <button
                                            type="submit"
                                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                        >
                                            SIGN IN
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
