import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse,  isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import dummy from '../../../assets/img/dummy.jpg';


const Create = () => {
    let history = useHistory();

    // const [name, setName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [fileName, setFileName] = useState("");
    const [id, setId] = useState('');
    const {
        register,
        setValue,
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
        axios
            .get(url.base_url + url.bank_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setValue('name',data.name);
                setId(data.id);
                setValue('icon',data.icon);
                // setId(data.id);
                // setName(data.name);
                // setIcon(data.icon);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    useEffect(() => {
        // console.log(errors);
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
        data['icon'] = fileName;
        data['id'] = id;
        const config = configHeaderAxios();
        axios
            .post(url.base_url + url.bank_store, JSON.stringify(data), config)
            .then((response) => {
                successResponse(response);
                history.push('/bank/list');
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
                                        {...register('name', (!id) ? { required: true } : '')}
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
