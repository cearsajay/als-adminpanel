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

const Create = () => {
    let history = useHistory();
    const [fileName, setFileName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [id, setId] = useState('');
    const [phoneNo, setMobilePhoneNo] = useState('');
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const {
        register,
        setValue,
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
            .get(process.env.REACT_APP_BASE_URL + url.subadmin_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setId(data.id);
                setValue('name', data.name);
                setValue('email', data.email);
                setValue('fileName', data.profile_pic);
                setIcon(data.profile_pic);
                setValue('id', data.id);
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
        formData.append("type", 1);//bank
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

    const onSubmit = (data) => {
        data['profile_pic'] = fileName;
        data['id'] = id;
        const config = configHeaderAxios();
        axios
            .post(process.env.REACT_APP_BASE_URL + url.subadmin_store, JSON.stringify(data), config)
            .then((response) => {
                successResponse(response);
                history.push('/subadmin/list');
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
                        <Breadcrumb.Item active>Sub Admin {(id) ? "Edit" : "Create"}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Sub Admin {(id) ? "Edit" : "Create"} </h1>
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
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="User email"
                                        {...register('email', { required: true })}
                                    />
                                </div>

                                {
                                    id ?  // if has image
                                        ''          // return My image tag 
                                        :
                                        <>
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
                                        </>

                                }




                                <div className="form-group">
                                    <label className="form-label" htmlFor="profile_pic">Profile Pic</label>
                                    <input
                                        {...register('profile_pic',(!icon) ? { required: true } : '') }
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
