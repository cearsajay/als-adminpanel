import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('aaaa');
    const [fileName, setFileName] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        isError(errors);
        fetchData();
    }, []);
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
                setProfilePic(data.img);
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
            .post(process.env.REACT_APP_BASE_URL + url.profile_get, [], config)
            .then((response) => {
                var data = response.data.data;
                setName(data.name);
                setEmail(data.email);
                setProfilePic(data.profile_pic);
                setFileName(data.fileName);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    const onSubmit = (data) => {
        const config = configHeaderAxios();
        data['profile_pic'] = fileName;
        axios
            .post(process.env.REACT_APP_BASE_URL + url.profile_update, JSON.stringify(data), config)
            .then((response) => {
                console.log(response);
                successResponse(response);
                localStorage.setItem(
                    "admin_profile",
                    JSON.stringify(response.data.data)
                );
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
                        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Profile</h1>
                </div>
                {/* <div className="page-heading-action">
                    <Link to="" className="btn btn-primary"> <FontAwesomeIcon icon={faPlusCircle} className="fa-fw mr-1" />Add</Link>
                </div> */}
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
                                        defaultValue={name}
                                        {...register('name', { required: true })}
                                    />

                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="profile_pic">Profile Pic</label>
                                    <input
                                        {...register('profile_pic', { required: true })}
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
                                        src={profilePic}
                                        alt={profilePic} width="100" height="100"
                                        className="imgBox"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        defaultValue={email}
                                        placeholder="Email"
                                        {...register('email', { required: true })}
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

export default Profile;
