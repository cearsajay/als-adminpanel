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
                                {/* <a href="#" data-toggle="dropdown" className="text-muted"><i className="fa fa-redo"></i></a> */}
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
            {transactionList.length > 0 ?
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
                                        <Link to="/transaction" className="btn btn-primary">View More</Link>
                                    </div>
                                </div>
                                <div className="table-responsive mb-n2">
                                    <table className="table table-bordered table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>To User</th>
                                                <th>From User</th>
                                                <th>Amount</th>
                                                <th>Received Amount</th>
                                                <th>Admin Fees</th>
                                                <th>Payment Process Fee</th>
                                                <th>Service Charge</th>
                                                <th>Transfer Reference Id</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transactionList.map((row, index) => {
                                                    return <tr key={index}>
                                                        <td>
                                                            {
                                                                <span className={`badge text-nowrap 
                                                                    ${row.type === 0 ? "badge-warning" :
                                                                        row.type === 1 ? "badge-success" :
                                                                            row.type === 2 ? "badge-success" :
                                                                                row.type === 3 ? "badge-success" :
                                                                                    row.type === 4 ? "badge-success" :
                                                                                        row.type === 5 ? "badge-success" :
                                                                                            row.type === 6 ? "badge-primary" :
                                                                                                row.type === 7 ? "badge-danger" :


                                                                                                    ""}`}>
                                                                    {
                                                                        row.type === 0
                                                                            ? "Default"
                                                                            :
                                                                            row.type === 1
                                                                                ? "Withdraw"
                                                                                :
                                                                                row.type === 2
                                                                                    ? "Add Money"
                                                                                    :
                                                                                    row.type === 3
                                                                                        ? "Transfer"
                                                                                        :
                                                                                        row.type === 4
                                                                                            ? "Req-Accpeted"
                                                                                            :
                                                                                            row.type === 5
                                                                                                ? "=="
                                                                                                :
                                                                                                row.type === 6
                                                                                                    ? "Admin Added"
                                                                                                    :
                                                                                                    row.type === 7
                                                                                                        ? "Admin Deducted"
                                                                                                        :

                                                                                                        " "
                                                                    }
                                                                </span>
                                                            }
                                                        </td>
                                                        <td>{row.to_user_name}</td>
                                                        <td>{row.from_user_name}</td>
                                                        <td>{Number(row.amount).toFixed(2)}</td>
                                                        <td>{Number(row.received_amount).toFixed(2)}</td>
                                                        <td>{Number(row.admin_fees).toFixed(2)}</td>
                                                        <td>{Number(row.payment_process_fee).toFixed(2)}</td>
                                                        <td>{Number(row.service_charge).toFixed(2)}</td>
                                                        <td>{row.transfer_reference_id}</td>

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
                                        <Link to="/user/list" className="btn btn-primary">View More</Link>
                                    </div>
                                </div>
                                <div className="table-responsive mb-n2">
                                    <table className="table table-bordered table-striped mb-0">
                                        <thead>
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