import DataTable from 'react-data-table-component';
import React, { useMemo, useState,  useEffect } from 'react';
// import tableDataItems from '../constants/sampleDesserts';
import axios from "axios";
// import Swal from 'sweetalert2';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faPencilAlt, faTrashAlt, faToggleOn, faToggleOff, faSearch } from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom';

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
    const history = useHistory();
    let currentFilterText = '';


    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'ASC') => {
        const config = configHeaderAxios();
        let dataSend = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        axios
            .get(url.base_url + url.transaction_get + dataSend, config)
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
            <DataTable
                subHeader
                subHeaderComponent={FilterComponent}
                title="Transaction List"
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
