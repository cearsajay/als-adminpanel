import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import dummy from '../../../assets/img/dummy.jpg';



const Create = () => {
    let history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [db_backup_email_id, setDbBackupEmail] = useState('');

    const [fileName, setFileName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [id, setId] = useState('');
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
            .get(url.base_url + url.get_setting, config)
            .then((response) => {
                let data = response.data.data;
                setName(data[0].value);
                setEmail(data[1].value);
                setIcon(url.base_url + 'uploads/logo/' + data[3].value);
                setDbBackupEmail(data[2].value);
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
        formData.append("type",2);//admin Logo
        formData.append("avatar", image);
        let urlcall = url.base_url + url.image_upload;
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
        data['image'] = fileName;
        const config = configHeaderAxios();
        axios
            .post(url.base_url + url.store_setting, JSON.stringify(data), config)
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
                        <Breadcrumb.Item active>Admin Settings</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Admin Settings </h1>
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
                                        placeholder="Admin Name"
                                        defaultValue={name}
                                        {...register('name', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Admin Email"
                                        defaultValue={email}
                                        {...register('email', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="db_backup_email_id">Db Backup Email </label>
                                    <input type="email"
                                        className="form-control"
                                        id="db_backup_email_id"
                                        placeholder="Admin Backup Email"
                                        defaultValue={db_backup_email_id}
                                        {...register('db_backup_email_id', { required: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="image">Logo</label>
                                    <input
                                        {...register('image', (!icon) ? { required: true } : '') }
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        placeholder="image"
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
