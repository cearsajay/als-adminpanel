import React, { useEffect, useState } from 'react';
import Http from '../../security/Http';
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Create = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm();

    const [btnloader, setbtnloader] = useState(false);

    const fetchData = () => {
        const config = configHeaderAxios();
       Http
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
                setValue('wallet_to_wallet', data[7].value);
                setValue('refer_transaction_min_amount', data[8].value);
                setValue('refer_amount_reciver', data[9].value);
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

    useEffect(() => {
        fetchData();
    }, [])
    const onSubmit = (data) => {
        setbtnloader(true);

        const config = configHeaderAxios();
       Http
            .post(process.env.REACT_APP_BASE_URL + url.store_fee_setting, JSON.stringify(data), config)
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
                                    <label className="form-label flex-label flex-label" htmlFor="service_charge">Service Charge

                                        <small className="form-text text-muted">A service charge is a fee collected to pay for services.</small>
                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">%</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="service_charge"
                                        placeholder="Service Charge"
                                        {...register('service_charge', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="admin_fee">Admin Fee

                                        <small className="form-text text-muted">An admin fee is an important component of the cost.</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">%</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee"

                                        placeholder="Admin Fee"
                                        {...register('admin_fee', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }

                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="payment_process_fee"> Payment Process Fee
                                        <small className="form-text text-muted"> fee charged by payment processors to process a particular credit card transaction .</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">%</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="payment_process_fee"

                                        placeholder="Payment Process Fee "
                                        {...register('payment_process_fee', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="wallet_to_wallet"> wallet to Wallet Fee
                                        <small className="form-text text-muted"> fee charged by wallet to wallet to process a particular.</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">%</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="wallet_to_wallet"

                                        placeholder="wallet to wallet Fee "
                                        {...register('wallet_to_wallet', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="admin_fee_min">Fee Minimum
                                        <small className="form-text text-muted"> Employer to remit @ 0.5 of contributions (subject a minimum) .</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_min"

                                        placeholder="Fee Minimum "
                                        {...register('admin_fee_min', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="admin_fee_max">Fee Maximum
                                        <small className="form-text text-muted"> Employer to remit @ 0.5 of contributions (subject a miximum) .</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_max"

                                        placeholder="Fee Maximum "
                                        {...register('admin_fee_max', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="admin_fee_amount">Fee Amount
                                        <small className="form-text text-muted">The admin fee is the fee you pay.</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_amount"

                                        placeholder="Fee Amount "
                                        {...register('admin_fee_amount', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="admin_fee_discount">Fee Discount
                                        <small className="form-text text-muted">Admin Fees On Discounted Price .</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div></label>
                                    <input type="number"
                                        className="form-control"
                                        id="admin_fee_discount"

                                        placeholder="Fee Discount "
                                        {...register('admin_fee_discount', {
                                            required: true, min: {
                                                value: 0,
                                            },
                                            max: {
                                                value: 100,
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="refer_transaction_min_amount">Refer Transaction Min Amount
                                        <small className="form-text text-muted">The Refer Transaction Min Amount.</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="refer_transaction_min_amount"

                                        placeholder="Fee Amount "
                                        {...register('refer_transaction_min_amount', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            // max: {
                                            //     value: 100,
                                            // }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label flex-label" htmlFor="refer_amount_reciver">Refer Amount Reciver
                                        <small className="form-text text-muted">The That Reciver to New User.</small>

                                        <div className="input-group-append ml-2">
                                            <span className="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                    </label>
                                    <input type="number"
                                        className="form-control"
                                        id="refer_amount_reciver"

                                        placeholder="Fee Amount "
                                        {...register('refer_amount_reciver', {
                                            required: true,
                                            min: {
                                                value: 0,
                                            },
                                            // max: {
                                            //     value: 100,
                                            // }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12">
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

export default Create;
