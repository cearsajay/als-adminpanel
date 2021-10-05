import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
// import tableDataItems from '../constants/sampleDesserts';
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt, faTrashAlt, faToggleOn, faToggleOff, faKey, faStreetView } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios } from "../../helpers/response";
import { useHistory } from 'react-router';




const Index = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    const [id,setId] = useState('');
    const [back,setBack] = useState('');
    const [front,setFront] = useState('');
    const history = useHistory();
    let currentFilterText = '';

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'ASC') => {
        const config = configHeaderAxios();
        let reqDD = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        axios
            .get(url.base_url + url.user_get + reqDD, config)
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
    }, [selectedRows]);

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
            .post(url.base_url + url.user_change_status, obj, config)
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
            data['id'] = id;
            data['reason'] = reason;
            data['status'] = status;

            if (reason !== null && reason !== '' && reason != null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Enter Any Reason',
                })
            }

            if (status !== null && status !== 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Select Any Status of Kyc!',
                })
            }
            axios
                .post(url.base_url + url.user_kyc, JSON.stringify(data), config)
                .then((response) => {
                })
                .catch((error) => {
                    if (error.response) {
                        errorResponse(error);
                    }
                });
        }
    };






    
    const KycDisplayButtonClick = (id, front, back) => {
        console.log(id);
        console.log(front);
        console.log(back);
        setBack(back);
        setFront(front);
        setShow(true);

        // return (
        //     <Modal>
        //         <Modal.Header closeButton>
        //             <Modal.Title>Modal heading</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            
        //         <Modal.Footer>
        //             <Button variant="secondary" onClick={handleClose}>
        //                 Close
        //             </Button>
        //             <Button variant="primary" onClick={handleClose}>
        //                 Save Changes
        //             </Button>
        //         </Modal.Footer>
        //     </Modal>
            
        // )

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
                    .delete(url.base_url + url.user_delete + obj, config)
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
                minWidth: 200,
                selector: row =>
                    <>
                        <button className="btn btn-primary ml-2" onClick={(id) => { editButtonClick(row.id) }}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button className="btn btn-danger ml-2" onClick={(id) => { deleteButtonClick(row.id) }} >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button className="btn btn-primary ml-2" onClick={(id) => { KycButtonClick(row.id) }} >
                            <FontAwesomeIcon icon={faKey} />
                        </button>
                        <button className="btn btn-primary ml-2" onClick={(id) => { KycDisplayButtonClick(row.id, row.kyc_front, row.kyc_back) }} >
                            <FontAwesomeIcon icon={faStreetView} />
                        </button>

                        <button className="btn btn-warning ml-2" onClick={(id) => { changeStatusButtonClick(row.id) }} >
                            {
                                row.status == 1 ? <FontAwesomeIcon icon={faToggleOff} /> : <FontAwesomeIcon icon={faToggleOn} />
                            }
                        </button>
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

    return (
        <>
        {show ? <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={back}/><img src={front}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            :null}
          
            
           <DataTable
                actions={actions}
                subHeader
                subHeaderComponent={FilterComponent}
                title="User List"
                columns={columns}
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
