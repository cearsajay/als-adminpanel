import React, { useEffect } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
const Create = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.get_fee_setting, config)
            .then((response) => {
                let data = response.data.data;
                setValue('service_charge', data[0].value);
                setValue('admin_fee', data[1].value);
                setValue('payment_process_fee', data[2].value);
                setValue('admin_fee_min', data[3].value);
                setValue('admin_fee_max', data[4].value);
                setValue('admin_fee_amount', data[5].value);
                setValue('admin_fee_discount', data[6].value);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    useEffect(() => {
        isError(errors);
    });

    const onSubmit = (data) => {
        const config = configHeaderAxios();
        axios
            .post(process.env.REACT_APP_BASE_URL + url.store_fee_setting, JSON.stringify(data), config)
            .then((response) => {
                successResponse(response);
            })
            .catch((error) => {
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
                        <Breadcrumb.Item active> Admin fee Settings</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header"> Admin fee Settings </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="form-label" htmlFor="service_charge">Service Charge</label>
                                    <input type="number"
                                        className="form-control"
                                        id="service_charge"
                                        placeholder="Admin Service Charge"
                                        {...register('service_charge', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee">Admin Fee</label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee"
                                        placeholder="Admin Fee"
                                        {...register('admin_fee', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="payment_process_fee"> Payment Process Fee </label>
                                    <input type="number"
                                        className="form-control"
                                        id="payment_process_fee"
                                        placeholder="Admin  Payment Process Fee "
                                        {...register('payment_process_fee', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_min"> Admin Fee Minimum </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_min"
                                        placeholder="Admin  Admin Fee Minimum "
                                        {...register('admin_fee_min', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_max"> Admin Fee Mamimum </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_max"
                                        placeholder="Admin  Admin Fee Mamimum "
                                        {...register('admin_fee_max', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_amount"> Admin Fee Amount </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_amount"
                                        placeholder="Admin  Admin Fee Amount "
                                        {...register('admin_fee_amount', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_discount"> Admin Fee Discount </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_discount"
                                        placeholder="Admin  Admin Fee Discount "
                                        {...register('admin_fee_discount', { required: true })}
                                    />
                                </div>


                                <div className="form-group">
                                    <div className="form-action-btn">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="reset" className="btn btn-secondary">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Create;
