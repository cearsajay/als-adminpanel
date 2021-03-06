import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Http from '../../security/Http';
import { useForm } from "react-hook-form";
//  start custome url define
import url from "../../../Development.json";
import {
    errorResponse,
    successResponse,
    isError,
    configHeaderAxios,
} from "../../helpers/response";
import { Breadcrumb, Form, Check } from "react-bootstrap";
import ButtonSubmitReset from "../layouts/ButtonSubmitReset";

const Create = () => {
    let history = useHistory();
    const [id, setId] = useState('');
    const [roleid, setIdRole] = useState("");
    const [btnloader, setbtnloader] = useState(false);
    const [permissionsGet, setPermissionsGet] = useState([]);
    const [selectPermissions, setSelectPermissions] = useState([]);

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        PermissionsData();
        let query = new URLSearchParams(history.location.search);
        let id = query.get("id");
        if (id) {
            fetchData(id);
        }
    }, []);
    const PermissionsData = () => {
        const config = configHeaderAxios();
       Http
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
    };
    const fetchData = (id) => {
        let idpass = `?id=${id}`;
        const config = configHeaderAxios();
       Http
            .get(process.env.REACT_APP_BASE_URL + url.role_edit + idpass, config)
            .then((response) => {
                let data = response.data.data;
                setValue("name", data.name);
                setValue("permission_name", data.permission_name);
                setSelectPermissions(JSON.parse(data.permission_name));
                setId(data.id);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };
    useEffect(() => {
        isError(errors);
    });

    const onSubmit = (data) => {
        setbtnloader(true);
        data["id"] = id;
        const config = configHeaderAxios();
       Http
            .post(
                process.env.REACT_APP_BASE_URL + url.role_store,
                JSON.stringify(data),
                config
            )
            .then((response) => {
                setbtnloader(false);
                successResponse(response);
                history.push("/role/list");
            })
            .catch((error) => {
                setbtnloader(false);
                if (error.response) {
                    errorResponse(error);
                }
            });
    };

    const handleChangeRole = (e) => {
        setValue('permission_name', 0);
    }

    return (
        <>
            <div className="page-heading-part">
                <div className="page-heading-left">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Admin</Breadcrumb.Item>
                        <Breadcrumb.Item active>Role {id ? "Edit" : "Add"}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Role {id ? "Edit" : "Add"} </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        {...register("name", { required: true })}
                                    />
                                </div>
                                <div className="checkboxgroup-scroll">
                                    <ul>

                                        {selectPermissions.length > 1
                                            ?
                                             permissionsGet.map((elem, indx) => {
                                                return (
                                                    <li
                                                        className="mb-3"
                                                        key={indx}
                                                        data-permission={selectPermissions.includes(
                                                            elem.name
                                                        )}
                                                    >
                                                        {console.log(indx)}
                                                        {console.log(indx)}
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                className="custom-control-input"
                                                                type="checkbox"
                                                                name={`permission_name_` + indx}
                                                                id={`permission_name_` + indx}
                                                                onChange={e => handleChangeRole(e)}
                                                                defaultValue={elem.name}
                                                                defaultChecked={selectPermissions.includes(elem.name) ? true : false}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`permission_name_` + indx}
                                                            >
                                                                {elem.module}
                                                            </label>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                            :

                                            permissionsGet.map((elem, indx) => {
                                                return (
                                                    <li
                                                        className="mb-3"
                                                        key={indx}
                                                        
                                                    >
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                className="custom-control-input"
                                                                type="checkbox"
                                                                name={`permission_name_` + indx}
                                                                id={`permission_name_` + indx}
                                                                onChange={e => handleChangeRole(e)}
                                                                defaultValue={elem.name}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`permission_name_` + indx}
                                                            >
                                                                {elem.module}
                                                            </label>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }
                                           <input
                                        className="custom-control-input"
                                        type="hidden"
                                        name={`permission_name`}
                                        id={`permission_name`}
                                        {...register('permission_name', { required: true })}
                                    />
                                    </ul>
                                </div>
                                <ButtonSubmitReset
                                    btnloader={btnloader}
                                    onsubmitFun={() => {
                                        reset();
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Create;
