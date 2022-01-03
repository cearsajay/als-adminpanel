import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import dummy from '../../../assets/img/dummy.jpg';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';
const Create = () => {
    let history = useHistory();
    const [fileName, setFileName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [id, setId] = useState('');
    const [phoneNo, setMobilePhoneNo] = useState('');
    const current = new Date();
    const date = '01-01-2005';
    // const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
    // const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const [btnloader, setbtnloader] = useState(false);

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    useEffect(() => {
        let query = new URLSearchParams(history.location.search);
        let id = query.get('id')
        if (id) {
            fetchData(id);
        }
    }, [])

    const fetchData = (id) => {
        let idpass = `?id=${id}`;
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.user_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setId(data.id);
                setValue('name', data.name);
                setValue('email', data.email);
                setValue('address', data.address);
                setValue('wallet_amount', data.wallet_amount);
                setValue('fileName', data.fileName);
                if (data.profile_pic !== '') {
                    setIcon(data.profile_pic);
                }
                setValue('country_code', data.country_code);
                setValue('phone_no', data.phone_no);
                setValue('id', data.id);
                setValue('date_of_birth', data.date_of_birth);
                setValue('refer_to', data.refer_to);
                setValue('refer_code', data.refer_code);
                setMobilePhoneNo(data.country_code + data.phone_no);
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
    const onFileChange = (e) => {
        onFileUpload(e.target.files[0]);
    };
    const onFileUpload = (image) => {
        const formData = new FormData();
        const config = configHeaderAxios();
        formData.append("type", 4);//user Profile
        formData.append("avatar", image);
        let urlcall = process.env.REACT_APP_BASE_URL + url.image_upload;
        axios
            .post(urlcall, formData, config)
            .then((res) => {
                let data = res.data.data;
                setIcon(data.img);
                setFileName(data.filename);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };


    const handleChangeMobileNo = (phone_no, code) => {
        const string = phone_no;
        let StringPhone = string.replace(code.dialCode, '');
        setValue('country_code', code.dialCode)
        setValue('phone_no', StringPhone)
    }

    const onSubmit = (data) => {
        setbtnloader(true);
        data['profile_pic'] = fileName;
        data['id'] = id;
        const config = configHeaderAxios();
        axios
            .post(process.env.REACT_APP_BASE_URL + url.user_store, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                history.push('/user/list');
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
                        <Breadcrumb.Item active>User {(id) ? "Edit" : "Create"}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">User {(id) ? "Edit" : "Create"} </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="User Name"
                                        {...register('name', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="address">Address</label>
                                    <input type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="User address"
                                        {...register('address', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="form-label" htmlFor="date_of_birth">Date Of Birth</label>


                                    <input type="date"
                                        className="form-control"
                                        id="date_of_birth"
                                        max={date}
                                        min="1950-01-01"
                                        max="2005-01-01"
                                        placeholder="User date_of_birth"
                                        {...register('date_of_birth', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="country_code">Country Code</label>


                                    {phoneNo && phoneNo !== '' ?
                                        <>
                                            <PhoneInput
                                                id="phone_no"
                                                name="phone_no"
                                                value={phoneNo}
                                                onChange={handleChangeMobileNo}
                                            />
                                        </>
                                        :
                                        <PhoneInput
                                            className="form-control"
                                            country={'in'}
                                            id="phone_no"
                                            name="phone_no"
                                            onChange={handleChangeMobileNo}

                                        />
                                    }


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">

                                    <input type="hidden"
                                        id="phone_no"
                                        {...register('phone_no', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="hidden"
                                        id="country_code"
                                        {...register('country_code', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="wallet_amount">Wallet Amount</label>
                                    <input type="text"
                                        className="form-control"
                                        id="wallet_amount"
                                        placeholder="User Wallet Amount"
                                        {...register('wallet_amount', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="refer_to">Refer To</label>
                                    <input type="text"
                                        className="form-control"
                                        id="refer_to"
                                        placeholder="User Refer To"
                                        {...register('refer_to', { required: false })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="User email"
                                        {...register('email', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                {
                                    id ? '' :
                                        <>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <input type="password"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="User Password"
                                                        {...register('password', {
                                                            required: true,
                                                            minLength: {
                                                                value: 6,
                                                            },
                                                            maxLength: {
                                                                value: 15,
                                                            }
                                                        }
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="password_repeat">Repeat Password</label>
                                                    <input type="password"
                                                        className="form-control"
                                                        id="password_repeat"
                                                        placeholder="User Password"
                                                        {...register('password_repeat', {
                                                            validate: value =>
                                                                value === password.current || "Passwords do NOT match! ",
                                                            minLength: {
                                                                value: 6,
                                                            },
                                                            maxLength: {
                                                                value: 15,
                                                            }
                                                        }
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                }
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="profile_pic">Profile Pic</label>
                                    <input
                                        {...register('profile_pic', (!icon) ? { required: true } : '')}
                                        type="file"
                                        className="form-control"
                                        id="profile_pic"
                                        name="profile_pic"
                                        placeholder="profile_pic"
                                        onChange={onFileChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <img
                                        src={icon}
                                        alt={icon} width="100" height="100"
                                        className="imgBox"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <ButtonSubmitReset btnloader={btnloader} onsubmitFun={() => {
                                    reset();
                                }} />
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}

export default Create;
