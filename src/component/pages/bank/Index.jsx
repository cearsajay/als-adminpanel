import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
// import tableDataItems from '../constants/sampleDesserts';
import axios from "axios";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt, faTrashAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios ,customStylesDataTable } from "../../helpers/response";
import { useHistory } from 'react-router';
import dummy from '../../../assets/img/dummyImg.png';

const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    const history = useHistory();
    let currentFilterText = '';


    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC') => {
        const config = configHeaderAxios();
        let reqDD = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        axios
            .get(process.env.REACT_APP_BASE_URL + url.bank_get + reqDD, config)
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
            pathname: '/bank/create',
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
            .post(process.env.REACT_APP_BASE_URL + url.bank_change_status, obj, config)
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
                    .delete(process.env.REACT_APP_BASE_URL + url.bank_delete + obj, config)
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
                name: 'Serial No',
                width: '90px',
                cell: (row, index) => index + 1  //RDT provides index by default
            },
            {
                name: 'Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Icon',
                selector: row => <>
                    {row.icon !== '' ?
                        <img src={row.icon} alt={row.name} className="imageTableDataTable" />
                        : <img src={dummy} className='imageTableDataTable' alt='No Image Found' />}
                </>,
                sortable: false,
            },
            {
                name: 'Status',
                selector: row => <>
                    <span className={`btn btn-sm  ${row.status === 1 ?  "btn-success" : "btn-danger" }`}>
                        {
                            row.status === 1 ? "Active" : "De-Active"
                        }
                    </span>

                </>,
                sortable: false,
            },
            {
                name: 'Action',
                minWidth: 200,
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
        <Link to="/bank/create" className="menu-link">
            <button className="btn btn-success">
                <FontAwesomeIcon icon={faPlus} /> Add Bank
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

    const customStyles = customStylesDataTable();


    return (
        <>
            <DataTable
                actions={actions}
                subHeader
                subHeaderComponent={FilterComponent}
                title="Bank List"
                columns={columns}
                keyField="id"
                data={dataTableData}
                progressPending={loading}
                customStyles={customStyles}
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
