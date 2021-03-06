import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
import Http from '../../security/Http';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt, faTrashAlt, faToggleOn, faToggleOff, faKey, faStreetView, faList, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios, customStylesDataTable } from "../../helpers/response";
import { useHistory } from 'react-router';
import KycDummy from '../../../assets/img/kyc.png';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Moment from 'moment';
import Select from 'react-select'

const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    const [back, setBack] = useState(KycDummy);
    const [front, setFront] = useState(KycDummy);
    const history = useHistory();
    let currentFilterText = '';
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [selectType, setType] = useState([1, 2]);
    const [kycSelectType, setKycStatus] = useState([0, 1, 2, 3]);

    const statusOptions = [
        { value: 0, label: 'Blocked' },
        { value: 1, label: 'Active' },
    ]
    const kycStatusOptions = [
        { value: 0, label: 'Pending' },
        { value: 2, label: 'Uploaded' },
        { value: 1, label: 'Verified' },
        { value: 3, label: 'Rejected' },
    ]

    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC', search = filterText, type = selectType, kycStatus = kycSelectType) => {
        const config = configHeaderAxios();
        let reqDD = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${search}&type=${type}&kyc_status=${kycStatus}`;
        Http
            .get(process.env.REACT_APP_BASE_URL + url.user_get + reqDD, config)
            .then((response) => {
                setDataTableData(response.data.data.rows);
                setTotalRows(response.data.data.count);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const editButtonClick = (id) => {
        history.push({
            pathname: '/user/create',
            search: '?id=' + id
        });
    };
    const transactionListButtonClick = (id) => {
        history.push({
            pathname: '/user/transaction',
            search: '?id=' + id
        });
    };
    const walletHistoryListButtonClick = (id) => {
        history.push({
            pathname: '/user/wallet-transaction',
            search: '?id=' + id
        });
    };
    const changeStatusButtonClick = (id) => {
        const obj = {
            id: id,
        };
        const config = configHeaderAxios();
        Http
            .post(process.env.REACT_APP_BASE_URL + url.user_change_status, obj, config)
            .then((response) => {
                getData();
                successResponse(response);
            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    };
    const KycButtonClick = async (id) => {

        const { value: formValues } = await Swal.fire({
            title: 'Kyc ',
            customClass: {
                container: 'balance-modal',
            },
            html:
                `
                <div class="text-left">
                    <label>kyc Status</label>
                    <select name="status" id="status" class="form-control mb-4">
                        <option disabled Selected>Select</option>
                        <option value="1">Approve</option>
                        <option value="3">Reject</option>
                    </select>
                    <label>Reason</label>
                    <input id="reason" type="text" class="form-control mb-4"></ br>
                    <label>Pin</label>
                    <input id="pin" type="text" class="form-control"></ br>
                </div>
                `,
            focusConfirm: false,
        })
        if (formValues) {
            const config = configHeaderAxios();
            const data = {};
            var reason = document.getElementById('reason').value;
            var pin = document.getElementById('pin').value;
            var status = document.getElementById('status').value;
            data['id'] = id;
            data['reason'] = reason;
            data['pin'] = pin;
            data['status'] = status;
            if (!reason) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Enter Any Reason',
                })
                return false;
            }

            if (!status) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Select Any Status of Kyc!',
                })
                return false;
            }
            if (!pin) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter your pin!',
                })
                return false;
            }
            Http
                .post(process.env.REACT_APP_BASE_URL + url.user_kyc, JSON.stringify(data), config)
                .then((response) => {
                    getData();
                    successResponse(response);
                })
                .catch((error) => {
                    if (error.response) {
                        errorResponse(error);
                    }
                });
        }
    };
    const balanceButtonClick = async (data) => {

        const { value: formValues } = await Swal.fire({
            title: 'Balance',
            customClass: {
                container: 'balance-modal',
            },
            html:
                `
                <div class="text-left">
                <label>Balance Status</label>
                <select name="status" id="status" class="form-control mb-4">
                    <option   disabled Selected>Select</option>
                    <option value="1">Add Balance </option>
                    <option value="2">Deduct Balance </option>
                </select>
                <label>Wallet Amount</label>
                <input id="wallet_amount" type="text" class="form-control mb-4"  disabled value=${data.wallet_amount}></ br>
                <label>Amount</label>
                <input id="amount" type="number" class="form-control" min=1 max=${data.wallet_amount}></ br>
                </div>
                `,
            focusConfirm: false,
        })
        if (formValues) {
            const config = configHeaderAxios();
            const dataSend = {};
            var id = data.id;
            var wallet_amount = document.getElementById('amount').value;
            var status = document.getElementById('status').value;
            dataSend['id'] = id;
            dataSend['wallet_amount'] = wallet_amount;
            dataSend['status'] = status;
            if (!wallet_amount) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Enter Valid Amount',
                })
                return false;
            }


            if ((Number(status) == 2) && (wallet_amount > data.wallet_amount)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Enter Valid Deduct Amount',
                })
                return false;
            }

            if (isNaN(status)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Select Any Status!',
                })
                return false;
            }

            Http
                .post(process.env.REACT_APP_BASE_URL + url.user_Balance, JSON.stringify(dataSend), config)
                .then((response) => {
                    getData();
                    successResponse(response);
                })
                .catch((error) => {
                    if (error.response) {
                        errorResponse(error);
                    }
                });
        }
    };
    const KycDisplayButtonClick = (id, front, back) => {
        if (back !== '') {
            setBack(back);
        }
        if (front !== '') {
            setFront(front);
        }
        setShow(true);
    };
    const deleteButtonClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                let obj = `?id=${id}`;
                const config = configHeaderAxios();
                Http
                    .del(process.env.REACT_APP_BASE_URL + url.user_delete + obj, config)
                    .then((response) => {
                        getData();
                        successResponse(response);
                    })
                    .catch((error) => {
                        if (error.response) {
                            errorResponse(error);
                        }
                    });
            }
        })
    };
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
            getData(page, perPage, column.sortField, sortDirection, filterText);
            setLoading(false);
        }, 100);
    };
    const handlePageChange = page => {
        setPage(page);
        getData(page);
    };

    const selectKycOptionType = (e) => {
        setKycStatus(e.value);
        getData(page, perPage, 'id', 'DESC', filterText, selectType, e.value);
    };
    const selectOptionType = (e) => {
        setType(e.value);
        getData(page, perPage, 'id', 'DESC', filterText, e.value, kycSelectType);
    };


    const customStyles = customStylesDataTable();

    const FilterComponent = (
        <>
            <div className="d-flex mx-2">
                <input type="text"
                    className="form-control"
                    id="search"
                    placeholder="filter by keywords"
                    value={filterText}
                    onChange={(event) => handleChange2(event)}
                />
            </div>
            <div className="table-select-filter mx-2">
                <Select options={kycStatusOptions} onChange={selectKycOptionType} className="form-select-filter" />
            </div>
            <div className="table-select-filter mx-2">
                <Select options={statusOptions} onChange={selectOptionType} className="form-select-filter" />
            </div>

        </>
    );

    const columns = useMemo(
        () => [

            {
                name: 'Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => row.email,
                sortable: true,
            },
            {
                name: 'Date of Joining',
                selector: row => Moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
                sortable: true,
            },
            {
                name: 'Phone No',
                selector: row => row.phone_no,
                sortable: true,
            },
            {
                name: 'Balance',
                selector: row => row.wallet_amount,
                sortable: true,
            },
            {
                name: 'Kyc Status',
                width: '110px',
                selector: row =>
                    <>
                        {(() => {
                            if (row.kyc_status === 0) {
                                return (
                                    <span className={`btn-sm  btn-success`}>
                                        {
                                            "Pending"
                                        }
                                    </span>
                                )
                            } else if (row.kyc_status === 1) {
                                return (
                                    <span className={`btn-sm  btn-success`}>
                                        {
                                            "Approved"
                                        }
                                    </span>
                                )
                            } else if (row.kyc_status === 2) {
                                return (
                                    <span className={`btn-sm  btn-success`}>
                                        {
                                            "Uploaded"
                                        }
                                    </span>
                                )
                            } else if (row.kyc_status === 3) {
                                return (
                                    <span className={`btn-sm  btn-danger`}>
                                        {
                                            "Rejected"
                                        }
                                    </span>
                                )
                            } else {

                            }
                        })()}

                    </>,
                sortable: false,
            },
            {
                name: 'Status',
                width: '90px',
                selector: row => <>
                    <span className={`btn-sm  ${row.status === 1 ? "btn-success" : "btn-danger"}`}>
                        {
                            row.status === 1 ? "Active" : "De-Active"
                        }
                    </span>

                </>,
                sortable: false,
            },
            {
                name: 'Action',
                minWidth: '300px',
                selector: row =>

                    <div className='table-action-btn'>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Edit
                                </Tooltip>
                            }
                        >
                            <button className="btn btn-primary ml-2"
                                onClick={(id) => { editButtonClick(row.id) }}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger

                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Transaction
                                </Tooltip>
                            }
                        >
                            <button className="btn btn-primary ml-2"
                                onClick={(id) => { transactionListButtonClick(row.id) }}>
                                <FontAwesomeIcon icon={faList} />
                            </button>

                        </OverlayTrigger>
                        {(row.kyc_status === 1) ?
                            <>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-inner`}>
                                            Balance
                                        </Tooltip>
                                    }
                                >
                                    <button className="btn btn-primary ml-2"
                                        onClick={(id) => { balanceButtonClick(row) }}>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                    </button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-inner`}>
                                            Wallet History
                                        </Tooltip>
                                    }
                                >
                                    <button className="btn btn-primary ml-2"
                                        onClick={(id) => { walletHistoryListButtonClick(row.id) }}>
                                        <FontAwesomeIcon icon={faList} />
                                    </button>
                                </OverlayTrigger>
                            </>
                            : ''
                        }
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Delete
                                </Tooltip>
                            }
                        >
                            <button className="btn btn-danger ml-2"
                                onClick={(id) => { deleteButtonClick(row.id) }} >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </OverlayTrigger>
                        {row.kyc_status != 0 ? <>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-inner`}>
                                        Kyc Status
                                    </Tooltip>
                                }
                            >
                                <button className="btn btn-primary ml-2"
                                    onClick={(id) => { KycButtonClick(row.id) }} >
                                    <FontAwesomeIcon icon={faKey} />
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-inner`}>
                                        Kyc Display
                                    </Tooltip>
                                }
                            >
                                <button className="btn btn-primary ml-2"
                                    onClick={(id) => { KycDisplayButtonClick(row.id, row.kyc_front, row.kyc_back) }} >
                                    <FontAwesomeIcon icon={faStreetView} />
                                </button>
                            </OverlayTrigger>

                        </> : ''}

                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Change Status
                                </Tooltip>
                            }
                        >

                            <button className="btn btn-warning ml-2"
                                onClick={(id) => { changeStatusButtonClick(row.id) }} >
                                {
                                    row.status === 1 ? <FontAwesomeIcon icon={faToggleOff} /> : <FontAwesomeIcon icon={faToggleOn} />
                                }
                            </button>
                        </OverlayTrigger>
                    </div>
                ,
            },
        ],
        [],
    );

    const actions = (
        <Link to="/user/create" className="menu-link">
            <button className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} /> Add User
            </button>
        </Link>
    );

    const handleChange2 = (event) => {
        currentFilterText = event.target.value;
        setFilterText(currentFilterText);
        getData(page);
    }


    return (
        <>
            {show ? <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kyc Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='kyc_img_row d-flex'>
                        <div className='kyc_img mr-3'>
                            <label>Kyc Front Image</label>
                            <a href={front} target="_blank">
                                <img src={front} className='img-fluid' alt='Kyc front' />
                            </a>
                        </div>
                        <div className='kyc_img'>
                            <label>Kyc Back Image</label>
                            <a href={back} target="_blank">
                                <img src={back} className='img-fluid' alt='Kyc back' />
                            </a>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
                : null}

            <div className='transaction-list-table text-overflow-inherit'>
                <DataTable
                    actions={actions}
                    subHeader
                    subHeaderComponent={FilterComponent}
                    title="User List"
                    columns={columns}
                    customStyles={customStyles}
                    keyField="id"
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
