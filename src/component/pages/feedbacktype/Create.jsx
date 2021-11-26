import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse,  isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Create = () => {
    let history = useHistory();
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
        axios
            .get(process.env.REACT_APP_BASE_URL + url.feed_back_type_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setValue('name',data.name);
                setId(data.id);                
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
        setbtnloader(true);
        data['id'] = id;
        const config = configHeaderAxios();
        axios
            .post(process.env.REACT_APP_BASE_URL + url.feed_back_type_store, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                history.push('/feed_back_type/list');
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
                        <Breadcrumb.Item active>Feed Back Type { (id) ? "Edit" : "Add" }</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Feed Back Type { (id) ? "Edit" : "Add" } </h1>
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
                                        placeholder="Feed Back Type Name"
                                        {...register('name',  { required: true } )}
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
