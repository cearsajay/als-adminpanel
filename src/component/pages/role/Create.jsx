import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import { errorResponse, successResponse, isError, configHeaderAxios   } from "../../helpers/response";
import { Breadcrumb, Form, Check } from 'react-bootstrap';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Create = () => {
    let history = useHistory();
    const [id, setId] = useState('');
    const [btnloader, setbtnloader] = useState(false);
    const [permissionsGet, setPermissionsGet] = useState([]);
    const [selectPermissions, setSelectPermissions] = useState([]);
    
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();
    useEffect(() => {
        PermissionsData();
        let query = new URLSearchParams(history.location.search);
        let id = query.get('id')
        if (id) {
            fetchData(id);
        }
    }, [])
    const PermissionsData = () => {
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.permissions_get, config)
            .then((response) => {
                let data = response.data.data.rows;
                setPermissionsGet(data);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    const fetchData = (id) => {
        let idpass = `?id=${id}`;
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.role_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setValue('name', data.name);
                setSelectPermissions(JSON.parse(data.permission_name));
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
            .post(process.env.REACT_APP_BASE_URL + url.role_store, JSON.stringify(data), config)
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                history.push('/role/list');
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
                        <Breadcrumb.Item active>Role {(id) ? "Edit" : "Add"}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Role {(id) ? "Edit" : "Add"} </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">Name</label>

                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        {...register('name',  { required: true } )}
                                    />
                                </div>
                                <div className='checkboxgroup-scroll'>
                                    <ul>
                                        {selectPermissions.length > 0 ?  permissionsGet.map((elem, indx) => {
                                            // let checkotnot = (selectPermissions.length > 0 && selectPermissions.includes(elem.name)) ? true : false;
                                            
                                            return (
                                                <li className="mb-3" key={indx}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={`permission_name_` + indx}
                                                        label={elem.module}
                                                        defaultValue={elem.name}
                                                        defaultChecked={selectPermissions.includes(elem.name) ? true : false}
                                                        {...register('permission_name', (!id) ? { required: true } : '')}
                                                    />
                                                </li>
                                            )
                                        }): ''}
                                        


                                    </ul>
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
