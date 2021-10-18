import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';
import dummy from '../../../assets/img/dummy.jpg';

const Profile = () => {
    const [fileName, setFileName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [btnloader, setbtnloader] = useState(false);
    const [id, setId] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        isError(errors);
    });
    const onFileChange = (e) => {
        onFileUpload(e.target.files[0]);
    };
    const onFileUpload = (image) => {
        const formData = new FormData();
        const config = configHeaderAxios();
        formData.append("type", 1);
        formData.append("avatar", image);
        let urlcall = process.env.REACT_APP_BASE_URL + url.image_upload;
        axios
            .post(urlcall, formData, config)
            .then((res) => {
                let data = res.data.data;
                if(data.img !== ''){
                    setIcon(data.img);
                }
                setFileName(data.filename);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };
    const fetchData = () => {
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.profile_get,  config)
            .then((response) => {
                var data = response.data.data;
                setId(data.id);
                setValue('name', data.name);
                setValue('email', data.email);
                setValue('fileName', data.profile_pic);
                if(data.profile_pic !==''){                    
                    setIcon(data.profile_pic);
                }
                setValue('id', data.id);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    const onSubmit = (data) => {
        setbtnloader(true);
        const config = configHeaderAxios();
        data['profile_pic'] = fileName;
        axios
            .post(process.env.REACT_APP_BASE_URL + url.profile_update, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                localStorage.setItem(
                    "admin_profile",
                    JSON.stringify(response.data.data)
                );
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
                        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Profile</h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="test"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        {...register('name', { required: true })}
                                    />

                                </div>
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
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        {...register('email', { required: true })}
                                    />
                                </div>
                                <ButtonSubmitReset btnloader={btnloader}/>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;
