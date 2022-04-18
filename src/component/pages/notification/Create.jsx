import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Http from '../../security/Http';
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
// import "react-datepicker/dist/react-datepicker.css";
// import 'react-phone-input-2/lib/style.css'
import dummy from '../../../assets/img/dummy.jpg';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Create = () => {
    let history = useHistory();
    const [fileName, setFileName] = useState('');
    const [icon, setIcon] = useState(dummy);
    const [id, setId] = useState('');
    const [role, setRole] = useState('');

    const [btnloader, setbtnloader] = useState(false);
    let itemList = [];
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        reset,
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
            .get(process.env.REACT_APP_BASE_URL + url.notification_admin_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setId(data.id);
                setValue('name', data.name);
                setValue('email', data.email);
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

    const onSubmit = (data) => {
        setbtnloader(true);
        data['id'] = id;
        const config = configHeaderAxios();
        Http
            .post(process.env.REACT_APP_BASE_URL + url.notification_admin_store, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                history.push('/notification/list');
            })
            .catch((error) => {
                setbtnloader(false);
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    const handleChangetype = (event) => {
        setValue('type', event.target.value)
    }

    return (
        <>
            <div className="page-heading-part">
                <div className="page-heading-left">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Admin</Breadcrumb.Item>
                        <Breadcrumb.Item active>Notication {(id) ? "Edit" : "Send"}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Notication {(id) ? "Edit" : "Send"} </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">

                            <div className="form-group">
                                    <label className="form-label" htmlFor="type">Type</label>
                                    <select className="form-control" id="type" onChange={handleChangetype}
                                    >
                                        <option disabled selected>
                                            Please Select Type
                                        </option>
                                        <option key={"1"} value={3} > All User </option>
                                        <option key={"15"} value={0} > Unverified User </option>
                                        <option key={"16"} value={1} > Verified User  </option>

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="title">Title</label>
                                    <input type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Title"
                                        {...register('title', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Message</label>
                                    <input type="text"
                                        className="form-control"
                                        id="message"
                                        placeholder="Message"
                                        {...register('message', { required: true })}
                                    />
                                </div>


                                <div className="form-group">
                                    <input type="hidden"
                                        id="type"
                                        {...register('type', { required: true })}
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
