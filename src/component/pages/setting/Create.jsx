import React, { useEffect, useState } from 'react';
import Http from '../../security/Http';
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import dummy from '../../../assets/img/dummy.jpg';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Create = () => {
    const [fileName, setFileName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [btnloader, setbtnloader] = useState(false);
    const [underMainte, setUnderMainte] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        const config = configHeaderAxios();
       Http
            .get(process.env.REACT_APP_BASE_URL + url.get_setting, config)
            .then((response) => {
                let data = response.data.data;
                data.map((option) => {
                    setValue(option.key, option.value);
                    if (option.key === 'is_under_maintenance') {
                        setUnderMainte(option.value);
                    }
                })
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
        formData.append("type", 2);//admin Logo
        formData.append("avatar", image);
        let urlcall = process.env.REACT_APP_BASE_URL + url.image_upload;
       Http
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
        setbtnloader(true);

        data['image'] = fileName;
        const config = configHeaderAxios();
       Http
            .post(process.env.REACT_APP_BASE_URL + url.store_setting, JSON.stringify(data), config)
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
    const handleChangeRole = (event) => {
        setValue('is_under_maintenance', event.target.value)
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
                                            placeholder="Name"
                                            {...register('name', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            {...register('email', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">

                                        <label className="form-label" htmlFor="is_under_maintenance">Under Maintenances</label>
                                        <select className="form-control" id="is_under_maintenance" onChange={handleChangeRole}
                                        >
                                            <option value="0" selected={underMainte === '0' ? true : false} >
                                                OFF
                                            </option>
                                            <option value="1" selected={underMainte === '1' ? true : false} >
                                                ON
                                            </option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="db_backup_email_id">Db Backup Email </label>
                                        <input type="email"
                                            className="form-control"
                                            id="db_backup_email_id"
                                            placeholder="Admin Backup Email"
                                            {...register('db_backup_email_id', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="latest_ios">Latest Ios version</label>
                                        <input type="text"
                                            className="form-control"
                                            id="latest_ios"
                                            placeholder="latest ios"
                                            {...register('latest_ios', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="latest_android">Latest android version</label>
                                        <input type="text"
                                            className="form-control"
                                            id="latest_android"
                                            placeholder="latest android"
                                            {...register('latest_android', { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="image">Logo</label>
                                        <input
                                            {...register('image', (!icon) ? { required: true } : '')}
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
                                </div>

                                <div className="col-12">
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
