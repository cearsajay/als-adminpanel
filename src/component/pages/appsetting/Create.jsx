import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';



const Create = () => {
    const [service_charge, setServiceCharge] = useState('');
    const [admin_fee, setAdminFee] = useState('');
    const [payment_process_fee, setPaymentProcessFee] = useState('');
    const [admin_fee_min, setAdminFeeMin] = useState('');
    const [admin_fee_max, setAdminFeeMax] = useState('');
    const [admin_fee_amount, setAdminFeesAmount] = useState('');
    const [admin_fee_discount, setAdminFeesDiscount] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        const config = configHeaderAxios();
        axios
            .get(url.base_url + url.get_fee_setting, config)
            .then((response) => {
                let data = response.data.data;
                setServiceCharge(data[0].value);
                setAdminFee(data[1].value);
                setPaymentProcessFee(data[2].value);
                setAdminFeeMin(data[3].value);
                setAdminFeeMax(data[4].value);
                setAdminFeesAmount(data[5].value);
                setAdminFeesDiscount(data[6].value);
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
            .post(url.base_url + url.store_fee_setting, JSON.stringify(data), config)
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
                                    <input type="text"
                                        className="form-control"
                                        id="service_charge"
                                        placeholder="Admin Service Charge"
                                        defaultValue={service_charge}
                                        {...register('service_charge', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee">Admin Fee</label>
                                    <input type="text"
                                        className="form-control"
                                        id="admin_fee"
                                        placeholder="Admin Fee"
                                        defaultValue={admin_fee}
                                        {...register('admin_fee', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="payment_process_fee"> Payment Process Fee </label>
                                    <input type="text"
                                        className="form-control"
                                        id="payment_process_fee"
                                        placeholder="Admin  Payment Process Fee "
                                        defaultValue={payment_process_fee}
                                        {...register('payment_process_fee', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_min"> Admin Fee Minimum </label>
                                    <input type="text"
                                        className="form-control"
                                        id="admin_fee_min"
                                        placeholder="Admin  Admin Fee Minimum "
                                        defaultValue={admin_fee_min}
                                        {...register('admin_fee_min', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_max"> Admin Fee Mamimum </label>
                                    <input type="text"
                                        className="form-control"
                                        id="admin_fee_max"
                                        placeholder="Admin  Admin Fee Mamimum "
                                        defaultValue={admin_fee_max}
                                        {...register('admin_fee_max', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_amount"> Admin Fee Amount </label>
                                    <input type="text"
                                        className="form-control"
                                        id="admin_fee_amount"
                                        placeholder="Admin  Admin Fee Amount "
                                        defaultValue={admin_fee_amount}
                                        {...register('admin_fee_amount', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin_fee_discount"> Admin Fee Discount </label>
                                    <input type="text"
                                        className="form-control"
                                        id="admin_fee_discount"
                                        placeholder="Admin  Admin Fee Discount "
                                        defaultValue={admin_fee_discount}
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
