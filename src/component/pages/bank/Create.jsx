import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Http from '../../security/Http';
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse,  isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import dummy from '../../../assets/img/dummyImg.png';

import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Create = () => {
    let history = useHistory();
    const [icon, setIcon] = useState(dummy);
    const [fileName, setFileName] = useState("");
    const [id, setId] = useState('');
    const [btnloader, setbtnloader] = useState(false);

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();
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
       Http
            .get(process.env.REACT_APP_BASE_URL + url.bank_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setValue('name',data.name);
                setId(data.id);
                if(data.icon !== ''){
                    setIcon(data.icon);
                }
                setValue('icon',data.icon);
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
        formData.append("type", 3);//bank
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

        data['icon'] = fileName;
        data['id'] = id;
        const config = configHeaderAxios();
       Http
            .post(process.env.REACT_APP_BASE_URL + url.bank_store, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                history.push('/bank/list');
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
                        <Breadcrumb.Item active>Bank { (id) ? "Edit" : "Add" }</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Bank { (id) ? "Edit" : "Add" } </h1>
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
                                        placeholder="Bank Name"
                                        {...register('name',  { required: true } )}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="icon">Icon</label>
                                    <input
                                        {...register('icon',  (!icon) ? { required: true } : '') }
                                        type="file"
                                        className="form-control"
                                        id="icon"
                                        name="icon"
                                        placeholder="icon"
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
