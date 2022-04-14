import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {Table as TableModal } from "reactstrap";
import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse,configHeaderAxios, customStylesDataTable } from "../../helpers/response";
import { useHistory } from 'react-router';
import { Modal} from 'antd';

const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [visiblee, setVisiblee] = useState(false);
    const [modalText, setModalText] = useState();
    const [responseModalText, setResponseModalText] = useState();
    const [viewModalText, setviewModalText] = useState();
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    const history = useHistory();
    let currentFilterText = '';
    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC') => {
        const config = configHeaderAxios();
        let reqDD = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        axios
            .get(process.env.REACT_APP_BASE_URL + url.log_get + reqDD, config)
            .then((response) => {
                console.log(response)
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
    const showAddressModal = (row) => {
        let TableModaldata = (
                    <div>
                        <TableModal striped bordered hover>
                            <tbody>
                                <tr>
                                    <th>request_data</th>
                                    <td>{row.request_data}</td>
                                </tr>
                            </tbody>
                        </TableModal>
                        <br></br>
                    </div>
        )
        setModalText(TableModaldata);
        setVisible(true);
    };
    const showModal = (row) => {
        let data = (
                    <div>
                        <TableModal striped bordered hover className="cr-table" >
                            <tbody>
                                <tr>
                                    <th>response_data</th>
                                    <td>{row.response_data}</td>
                                </tr>
                            </tbody>
                        </TableModal>
                        <br></br>
                    </div>
        )
        setResponseModalText(data);
        setVisiblee(true);
    };
    const viewShowModal = (row) => {
        console.log(row)
        let data = (
                    <div>
                        <TableModal striped bordered hover className="cr-table" >
                            <tbody>
                                <tr>
                                    <th>Client IP</th>
                                    <td>{row.clientIP}</td>
                                </tr>
                                <tr>
                                    <th>Response Data</th>
                                    <td>{row.response_data}</td>
                                </tr>
                                <tr>
                                    <th>Host</th>
                                    <td>{row.host}</td>
                                </tr>
                                <tr>
                                    <th>End Point</th>
                                    <td>{row.endpoint}</td>
                                </tr>
                            </tbody>
                        </TableModal>
                        <br></br>
                    </div>
        )
        setviewModalText(data);
        setVisiblee(true);
    };
    const handleCancel = () => {
        setVisible(false);
        setVisiblee(false);
    };
    
    useEffect(() => {
        getData();
    }, []);
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
                name: 'Client IP',
                selector: row => row.clientIP,
                sortable: true,
            },
            {
                name: 'End point',
                selector: row => row.endpoint,
                sortable: true,
            },
            {
                name: 'Host',
                selector: row => row.host,
                sortable: true,
            },
            {
                name: 'Request Data',
                sortable: true,
                selector: row =>
                    <>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Request Data
                                </Tooltip>
                            }
                        >
                            {
                                (row.request_data === null)  ?
                                    <button className="btn btn-secondary ml-2" disabled>
                                    <FontAwesomeIcon icon={faEye} />  </button> : <button className="btn btn-secondary ml-2" onClick={(e) => showAddressModal(row)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                            }
                        </OverlayTrigger>
                    </>

            },
            {
                name: 'Response Data',
                sortable: true,
                selector: row =>
                    <>
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Response Data
                                </Tooltip>
                            }
                        >
                            {
                                (row.response_data === null)  ?
                                    <button className="btn btn-secondary ml-2" disabled>
                                    <FontAwesomeIcon icon={faEye} />  </button> : <button className="btn btn-secondary ml-2" onClick={(e) => showModal(row)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                            }
                        </OverlayTrigger>
                    </>

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
                                    View
                                </Tooltip>
                            }
                        >

                            <button className="btn btn-primary ml-2" onClick={(e) => { viewShowModal(row) }}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </OverlayTrigger>
                    </>,
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
            <Modal title="Request Detail" centered footer={''} visible={visible} onCancel={handleCancel}>
                <div className='customeraddress-scroll'>
                    {modalText}
                </div>
            </Modal>
            <Modal title="Response Detail" centered footer={''} visible={visiblee} onCancel={handleCancel}>
                <div className='customeraddress-scroll'>
                    {responseModalText}
                </div>
            </Modal>
            <Modal title="Log Detail" centered footer={''} visible={visiblee} onCancel={handleCancel}>
                <div className='customeraddress-scroll'>
                    {viewModalText}
                </div>
            </Modal>
            <DataTable
                subHeader
                subHeaderComponent={FilterComponent}
                title="Log List"
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
