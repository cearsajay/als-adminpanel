import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Pin = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        isError(errors);
    });
    const [btnloader, setbtnloader] = useState(false);

    const onSubmit = (data) => {
        setbtnloader(true);
        const config = configHeaderAxios();
        axios
            .post(process.env.REACT_APP_BASE_URL + url.change_pin, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
            })
            .catch((error) => {
                setbtnloader(false);
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    return (
        <>
            <div className="page-heading-part">
                <div className="page-heading-left">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Admin</Breadcrumb.Item>
                        <Breadcrumb.Item active>Change Pin</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Change Pin</h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="form-label" htmlFor="oldPin">Old Pin</label>
                                    <input type="password"
                                        className="form-control"
                                        id="oldPin"
                                        maxLength="4"
                                        minLength="4"
                                        placeholder="Old Pin"
                                        {...register('oldPin', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="pin">New pin</label>
                                    <input type="password"
                                        className="form-control"
                                        id="pin"
                                        maxLength="4"
                                        minLength="4"
                                        placeholder="New pin"                                        
                                        {...register('pin', {
                                            required: true,
                                            
                                        })}
                                    />
                                </div>

                                <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
                                    reset();
                                }} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Pin;
