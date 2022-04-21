import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
import Http from '../../security/Http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios, customStylesDataTable } from "../../helpers/response";
import { useHistory } from 'react-router';

const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const history = useHistory();
    const [filterText, setFilterText] = useState('');

    let currentFilterText = '';
    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC') => {
        const config = configHeaderAxios();
        let reqDD = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
       Http
            .get(process.env.REACT_APP_BASE_URL + url.feed_back_get + reqDD, config)
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
    const supportButtonClick = (id) => {
        history.push({
            pathname: '/support/create',
            search: '?id=' + id
        });
    };
    const customStyles = customStylesDataTable();
    const columns = useMemo(
        () => [

            {
                name: 'User Name',
                // width: '120px',
                selector: row => (row.send_user) ? row.send_user.name : '',
                sortable: true,
            },
            {
                name: 'Ticket No',
                width: '150px',
                selector: row => "#" + row.ticket_id,
                sortable: true,
            },
            {
                name: 'Message',
                width: '250px',
                selector: row => row.message,
                sortable: true,
            },
            {
                name: 'Feed back Type',
                // width: '90px',
                selector: row => (row.feed_back_type) ? row.feed_back_type.name : '',
                sortable: true,
            },
            {
                name: 'Contact Information',
                // width: '200px',
                selector: row => row.contact_information,
                sortable: true,
            },
            {
                name: 'Status',
                width: '110px',
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
                minWidth: '40px',
                selector: row =>
                    <div className='table-action-btn'>
                        <OverlayTrigger

                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-inner`}>
                                    Manage Support
                                </Tooltip>
                            }
                        >
                            <button className="btn btn-primary ml-2" onClick={(id) => { supportButtonClick(row.id) }}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>

                        </OverlayTrigger>

                    </div>,
            },
        ],
        [],
    );

    const FilterComponent = (
        <>
            <div className="d-flex">
                <input type="text"
                    className="form-control"
                    id="search"
                    placeholder="filter by keywords"
                    value={filterText}
                    onChange={(event) => handleChange2(event)}
                />
            </div>
        </>
    );
    const handleChange2 = (event) => {
        currentFilterText = event.target.value;
        setFilterText(currentFilterText);
        getData(page);
    }

    return (
        <>
            <DataTable
                subHeader
                subHeaderComponent={FilterComponent}
                title="Support List"
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
