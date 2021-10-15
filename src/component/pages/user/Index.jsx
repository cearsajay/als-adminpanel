import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt, faTrashAlt, faToggleOn, faToggleOff, faKey, faStreetView } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios } from "../../helpers/response";
import { useHistory } from 'react-router';
import KycDummy from '../../../assets/img/kyc.png';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'ASC') => {
        const config = configHeaderAxios();
        let reqDD = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        axios
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
            search1: { "id": id },
            search: '?id=' + id
        });
    };
    const changeStatusButtonClick = (id) => {
        const obj = {
            id: id,
        };
        const config = configHeaderAxios();
        axios
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
            html:
                `
                <label>kyc Status</label>
                <select name="status" id="status" class="form-control">
                    <option disabled Selected>Select</option>
                    <option value="3">Reject</option>
                    <option value="1">Approve</option>
                </select>
                <label>Reason</label>
                <input id="reason" type="text" class="form-control"></ br>`,
            focusConfirm: false,
        })
        if (formValues) {
            const config = configHeaderAxios();
            const data = {};


            var reason = document.getElementById('reason').value;
            var status = document.getElementById('status').selectedIndex;
            // console.log(document.getElementById('status').selectedIndex);
            data['id'] = id;
            data['reason'] = reason;
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
            axios
                .post(process.env.REACT_APP_BASE_URL + url.user_kyc, JSON.stringify(data), config)
                .then((response) => {
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
        if(back != ''){
            setBack(back);
        }
        if(front != ''){
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
                axios
                    .delete(process.env.REACT_APP_BASE_URL + url.user_delete + obj, config)
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
            getData(page, perPage, column.sortField, sortDirection);
            setLoading(false);
        }, 100);
    };
    const handlePageChange = page => {
        setPage(page);
        getData(page);
    };

    const customStyles = {
        headCells: {
            style: {
                '&:last-child': {
                    justifyContent: "center"
                },
            },
        },
    }

    const FilterComponent = (
        <>
            <div className="d-flex">
                <input type="text"
                    className="form-control"
                    id="search"
                    placeholder="Filter By Name"
                    value={filterText}
                    onChange={(event) => handleChange2(event)}
                />
            </div>
        </>
    );

    const columns = useMemo(
        () => [
            {
                name: 'Serial No.',
                cell: (row, index) => index + 1  //RDT provides index by default

            },
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
                name: 'Date Of Birth',
                selector: row => row.date_of_birth,
                sortable: true,
            },
            {
                name: 'Phone No',
                selector: row => row.phone_no,
                sortable: true,
            },
            {
                name: 'Action',
                minWidth: '300px',
                className: 'justify-content-center',
                selector: row =>
                    <>
                        <OverlayTrigger

                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Edit
                                </Tooltip>
                            }
                        >
                            <button className="btn btn-primary ml-2" onClick={(id) => { editButtonClick(row.id) }}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>

                        </OverlayTrigger>
                        <OverlayTrigger

                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Delete
                                </Tooltip>
                            }
                        >
                            <button className="btn btn-danger ml-2" onClick={(id) => { deleteButtonClick(row.id) }} >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Kyc Status
                                </Tooltip>
                            }
                        >

                            <button className="btn btn-primary ml-2" onClick={(id) => { KycButtonClick(row.id) }} >
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


                            <button className="btn btn-primary ml-2" onClick={(id) => { KycDisplayButtonClick(row.id, row.kyc_front, row.kyc_back) }} >
                                <FontAwesomeIcon icon={faStreetView} />
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Change Status
                                </Tooltip>
                            }
                        >

                            <button className="btn btn-warning ml-2" onClick={(id) => { changeStatusButtonClick(row.id) }} >
                                {
                                    row.status === 1 ? <FontAwesomeIcon icon={faToggleOff} /> : <FontAwesomeIcon icon={faToggleOn} />
                                }
                            </button>
                        </OverlayTrigger>
                    </>,
            },
        ],
        [],
    );

    const actions = (
        <Link to="/user/create" className="menu-link">
            <button className="btn btn-success">
                <FontAwesomeIcon icon={faPlus} />
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
                            <img src={front} className='img-fluid' alt='Kyc front' />
                        </div>
                        <div className='kyc_img'>
                            <label>Kyc Back Image</label>
                            <img src={back} className='img-fluid' alt='Kyc back' />
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
                : null}


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
        </>
    );
}

export default Index;
