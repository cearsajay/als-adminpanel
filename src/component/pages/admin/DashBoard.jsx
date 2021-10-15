import { faHistory, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios } from "../../helpers/response";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {

    const [userCount, setUserCount] = useState('0');
    const [todayUserCount, setTodayUserCount] = useState('0');
    const [transactionCount, setTransactionCount] = useState('0');
    const [transactionList, setTransactionList] = useState([]);
    const [userList, setUserList] = useState([]);



    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const config = configHeaderAxios();
        axios
            .get(process.env.REACT_APP_BASE_URL + url.dashboard, config)
            .then((response) => {
                let data = response.data.data;
                setUserCount(data.userCount);
                setTodayUserCount(data.todayUserCount);
                setTransactionCount(data.transactionCount);
                setTransactionList(data.transactionList);
                setUserList(data.userList);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }

    return (
        <>
            <h1 className="page-header mb-3">
                Hi, {JSON.parse(localStorage.getItem('admin_profile')).name}. <small>here's what's happening with your store today.</small>
            </h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">Total Users</h5>
                                    <div>Store user account registration</div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h3 className="mb-1">{userCount}</h3>
                                </div>
                                <div className="width-50 height-50 bg-primary-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faUser} className='fa-lg text-primary' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">Total Transaction</h5>
                                    <div>Store Transaction</div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h3 className="mb-1">{transactionCount}</h3>
                                </div>
                                <div className="width-50 height-50 bg-primary-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faHistory} className='fa-lg text-primary' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">Today Total Users</h5>
                                    <div>Store user account registration</div>
                                </div>
                                <a href="#" data-toggle="dropdown" className="text-muted"><i className="fa fa-redo"></i></a>
                            </div>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h3 className="mb-1">{todayUserCount}</h3>
                                </div>
                                <div className="width-50 height-50 bg-primary-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faUser} className='fa-lg text-primary' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {transactionList.length > 0  ?
                <div className="row mb-4">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Transaction</h5>
                                        <div className="fs-13px">Latest transaction history</div>
                                    </div>
                                    <Link to="/transaction">
                                        See All
                                    </Link>
                                </div>
                                <div className="table-responsive mb-n2">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tr className="text-dark">
                                                <th className="pl-0">No</th>
                                                <th>To</th>
                                                <th>From</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transactionList.map((data, index) => {
                                                    return <tr key={index}>
                                                        <td>{++index}</td>
                                                        <td>{data.to_user_name}</td>
                                                        <td>{data.from_user_name}</td>
                                                        <td>{data.amount}</td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
            {userList.length > 0 ?
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Users</h5>
                                        <div className="fs-13px">Latest user history</div>
                                    </div>
                                    <Link to="/user/list">
                                        See All
                                    </Link>
                                </div>
                                <div className="table-responsive mb-n2">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <tr className="text-dark">
                                                <th className="pl-0">No</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Address</th>
                                                <th>Date Of Birth</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userList.map((data, index) => {
                                                    return <tr key={index}>
                                                        <td>{++index}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.address}</td>
                                                        <td>{data.date_of_birth}</td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}

export default Dashboard;