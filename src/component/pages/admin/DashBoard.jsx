import { faHistory, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Http from '../../security/Http';
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
       Http
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
                    <div className="card-dashboard card mb-3 bg-gradient-2">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">Total Users</h5>
                                    <p>Store user account registration</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h2 className="mb-1">{userCount}</h2>
                                </div>
                                <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faUser} className='fa-lg text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-dashboard card mb-3 bg-gradient-4">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">Total Transaction</h5>
                                    <p>Store Transaction</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h2 className="mb-1">{transactionCount}</h2>
                                </div>
                                <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faHistory} className='fa-lg text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-dashboard card mb-3 bg-gradient-3">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">Today Total Users</h5>
                                    <p>Store user account registration</p>
                                </div>
                                <a href="#" data-toggle="dropdown" className="text-muted"><i className="fa fa-redo"></i></a>
                            </div>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h2 className="mb-1">{todayUserCount}</h2>
                                </div>
                                <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faUser} className='fa-lg text-white' />
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
                                    <div className='card-heading-right'>
                                        <Link to="/transaction" class="btn btn-primary">View More</Link>
                                    </div>
                                </div>
                                <div className="table-responsive mb-n2">
                                    <table className="table table-borderles mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th>No.</th>
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
                                    <div className='card-heading-right'>
                                        <Link to="/user/list" class="btn btn-primary">View More</Link>
                                    </div>
                                </div>
                                <div className="table-responsive mb-n2">
                                    <table className="table table-borderles mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th>No.</th>
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