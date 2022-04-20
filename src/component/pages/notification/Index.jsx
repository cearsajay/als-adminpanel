import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
import Http from '../../security/Http';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt, faTrashAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, successResponse, configHeaderAxios, customStylesDataTable } from "../../helpers/response";
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
       Http
            .get(process.env.REACT_APP_BASE_URL + url.notification_admin_get + reqDD, config)
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
            pathname: '/notification/create',
            search: '?id=' + id
        });
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


    const customStyles = customStylesDataTable();

    const columns = useMemo(
        () => [{
                name: 'Title',
                selector: row => row.title,
                sortable: true,
            },],
        [],
    );

    const actions = (
        <Link to="/notification/create" className="menu-link">
            <button className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} /> Add Notification
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
                    placeholder="filter by keywords"
                    value={filterText}
                    onChange={(event) => handleChange2(event)}
                />
            </div>
        </>
    );

    return (
        <>
            <DataTable
                actions={actions}
                subHeader
                subHeaderComponent={FilterComponent}
                title="Notification List"
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
