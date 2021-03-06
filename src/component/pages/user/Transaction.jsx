import React, { useMemo, useState, useEffect } from 'react';
import { faDownload, faExchangeAlt, faHistory, faMoneyBill, faUpload, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import Http from '../../security/Http';
import '../../../custome.css';
import url from "../../../Development.json";
import { useHistory } from "react-router-dom";
import Select from 'react-select'
import Moment from 'moment';

import { errorResponse, configHeaderAxios, customStylesDataTable } from "../../helpers/response";
const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [id, setId] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    const [userCount, setUserCount] = useState('0.00');
    const [totalWithdraw, setTotalWithdraw] = useState('0.00');
    const [totalDeposit, setTotalDeposit] = useState('0.00');
    const [totalTransfer, setTotalTransfer] = useState('0.00');
    const [totalTransaction, setTotalTransaction] = useState('0.00');
    const [totalWalletAmount, setTotalWalletAmount] = useState('0.00');
    const [totalAdminFee, setTotalAdminFee] = useState('0.00');
    const [totalReceived, setTotalReceivedTransaction] = useState('0.00');
    const [totalSent, setTotalSentTransaction] = useState('0.00');
    const [totalRefer, setTotalRefer] = useState('0.00');
    const [totalReferLockAmount, setTotalReferLockAmount] = useState('0.00');
    const [name, setName] = useState('***');
    const [selectType, setType] = useState([1, 2, 3]);

    let currentFilterText = '';
    let history = useHistory();
    const options = [
        { value: [3, 4], label: 'Sent' },
        { value: 2, label: 'Received' },
        { value: 1, label: 'Withdraw' }
    ]

    useEffect(() => {
        let query = new URLSearchParams(history.location.search);
        let id = query.get('id')
        if (id) {
            setId(id);
            getData(1, 10, 'id', 'DESC', id);
        }
        else {
            getData();
        }
    }, [])

    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC', userId = id, type = selectType) => {
        const config = configHeaderAxios();
        let dataSend = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}&id=${userId}&type=${type}`;
        Http
            .get(process.env.REACT_APP_BASE_URL + url.user_transaction + dataSend, config)
            .then((response) => {
                setDataTableData(response.data.data.data.rows);
                setTotalRows(response.data.data.data.count);
                setLoading(false);
                setTotalWithdraw(response.data.data.total_withdraw);
                setTotalDeposit(response.data.data.total_deposit);
                setTotalTransfer(response.data.data.total_transfer);
                setTotalTransaction(response.data.data.total_transation);
                setTotalReceivedTransaction(response.data.data.total_received);
                setTotalSentTransaction(response.data.data.total_sent);
                setTotalAdminFee(response.data.data.total_admin_fee);
                setTotalRefer(response.data.data.total_refer);
                setTotalWalletAmount(Number(Number(response.data.data.user.wallet_amount) + Number(response.data.data.user.refer_amount_reciver_lock_amount)).toFixed(2));

                setName(response.data.data.user.name);
                setTotalReferLockAmount(response.data.data.user.refer_amount_reciver_lock_amount);

            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setPage(page);
        setLoading(true);
        setPerPage(newPerPage);
        getData(page, newPerPage);
        setLoading(false);
    };
    const handleSort = (column, sortDirection) => {
        setLoading(true);
        setTimeout(() => {
            getData(page, perPage, column.sortField, sortDirection);
            setLoading(false);
        }, 100);
    };
    const selectOptionType = (e) => {
        setType(e.value);
        getData(page, perPage, 'id', 'DESC', id, e.value);
    };
    const handlePageChange = page => {
        setPage(page);
        getData(page);
    };
    const customStyles = customStylesDataTable();


    const columns = useMemo(
        () => [

            {
                name: 'Type',
                selector: row => <>
                    {
                        <span className={`btn-sm  
                                                           ${row.type === 0 ? "btn-warning" :
                                row.type === 1 ? "btn-success" :
                                    row.type === 2 ? "btn-success" :
                                        row.type === 3 ? "btn-success" :
                                            row.type === 4 ? "btn-success" :
                                                row.type === 5 ? "btn-success" :
                                                    row.type === 6 ? "btn-primary" :
                                                        row.type === 7 ? "btn-danger" :


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
                </>,
                sortable: false,
            },
            {
                name: 'Date',
                selector: row => Moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status === 0
                    ? <span className={`btn-sm btn-info`}>Pending</span>
                    :
                    row.status === 1
                        ? <span className={`btn-sm btn-primary`}>Success</span>
                        :
                        row.status === 2
                            ? <span className={`btn-sm btn-danger`}>Failed</span>
                            : row.status === 4
                                ? <span className={`btn-sm btn-danger`}>Failed</span>
                                : '',

                sortable: true,
            },
            {
                name: 'To User',
                selector: row => row.to_user_name,
                sortable: true,
            },
            {
                name: 'From User',
                selector: row => row.from_user_name,
                sortable: true,
            },
            {
                name: 'Amount',
                selector: row => row.amount,
                sortable: true,
            },
            {
                name: 'Received Amount',
                selector: row => row.received_amount,
                sortable: true,
            },
            {
                name: 'Admin Fees',
                selector: row => row.admin_fees,
                sortable: true,
            },
            {
                name: 'Payment Process Fee',
                selector: row => row.payment_process_fee,
                sortable: true,
            },
            {
                name: 'Service Charge',
                selector: row => row.service_charge,
                sortable: true,
            },
            {
                name: 'Transfer Reference Id',
                selector: row => row.transfer_reference_id,
                sortable: true,
            },
        ],
        [],
    );

    const handleChange2 = (event) => {
        currentFilterText = event.target.value;
        setFilterText(currentFilterText);
        getData(page);
    }
    const FilterComponent = (
        <>
            <div className="d-flex">
                <input type="text"
                    className="form-control mr-2"
                    id="search"
                    placeholder="filter by keywords"
                    value={filterText}
                    onChange={(event) => handleChange2(event)}
                />
                <div className="table-select-filter">
                    <Select options={options} onChange={selectOptionType} className="form-select-filter" />
                </div>
            </div>

        </>
    );

    return (
        <>
            <h2 className='transaction-user-name'>User Name :- <span>{name}</span></h2>
            <div className='transaction-card-part mb-4 pb-0'>
                <div className="row">

                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-2">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Total Deposit </h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalDeposit}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faUpload} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-3">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Total Refer </h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalRefer}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faUpload} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-6">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Total Received</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalReceived}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faExchangeAlt} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-1">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Total Withdarw</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalWithdraw}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faDownload} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-4">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Total Sent</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalSent}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faExchangeAlt} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-5">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Admin Fee Amount</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalAdminFee}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faMoneyBill} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-7">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Total Transaction</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalTransaction}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faExchangeAlt} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-9">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Wallet Amount</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalWalletAmount}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faMoneyBill} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-dashboard card mb-3 bg-gradient-10">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">Reward Lock Amount</h5>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h2 className="mb-1"> $ {totalReferLockAmount}</h2>
                                    </div>
                                    <div className="width-50 height-50 bg-white-transparent-2 rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faMoneyBill} className='fa-lg text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='transaction-list-table text-overflow-inherit'>
                <DataTable
                    subHeader
                    subHeaderComponent={FilterComponent}
                    title="User Transaction List"
                    columns={columns}
                    keyField="id"
                    customStyles={customStyles}
                    data={dataTableData}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    sortServer
                    onSort={handleSort}
                    responsive
                />
            </div>
        </>
    );
}

export default Index;
