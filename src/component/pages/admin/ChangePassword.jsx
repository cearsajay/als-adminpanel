import React, { useEffect ,useState} from 'react';
import Http from '../../security/Http';
import { useForm } from "react-hook-form";
import url from "../../../Development.json";
import { errorResponse, successResponse,  isError, configHeaderAxios } from "../../helpers/response";
import { Breadcrumb } from 'react-bootstrap';
import ButtonSubmitReset from '../layouts/ButtonSubmitReset';

const Profile = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        isError(errors);
    });
    const [btnloader, setbtnloader] = useState(false);

    const onSubmit = (data) => {
        setbtnloader(true);
        const config = configHeaderAxios();
       Http
            .post(process.env.REACT_APP_BASE_URL + url.change_password, JSON.stringify(data), config)
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
    return (
        <>
            <div className="page-heading-part">
                <div className="page-heading-left">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Admin</Breadcrumb.Item>
                        <Breadcrumb.Item active>Change Password</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="page-header">Change Password</h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body pb-2">
                    <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                               
                                <div className="form-group">
                                    <label className="form-label" htmlFor="oldPassword">Old Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="oldPassword"
                                        placeholder="Old Password"
                                        {...register('oldPassword', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">New Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="New Password"
                                        {...register('password', { required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password_confirmation">Confirm Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password_confirmation"
                                        placeholder="New Password"
                                        {...register('password_confirmation', { required: true })}
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

export default Profile;
