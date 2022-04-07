import DataTable from 'react-data-table-component';
import React, { useMemo, useState,  useEffect } from 'react';
import axios from "axios";
import '../../../custome.css';
import url from "../../../Development.json";
import { errorResponse, configHeaderAxios , customStylesDataTable } from "../../helpers/response";
const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    let currentFilterText = '';

    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC') => {
        const config = configHeaderAxios();
        let dataSend = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}`;
        axios
            .get(process.env.REACT_APP_BASE_URL + url.transaction_get + dataSend, config)
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
    const customStyles = customStylesDataTable();


    const columns = useMemo(
        () => [
            {
                name: 'Serial No.',
                width: '90px',
                cell: (row, index) => index + 1  //RDT provides index by default
            },
            {
                name: 'Type',
                selector: row => <>
                    <span className={`btn-sm  ${row.type === 0 ? "btn-warning" : row.type === 1 ? "btn-success" : row.type === 2 ? "btn-success" : row.type === 3 ? "btn-success"  : row.type === 4 ? "btn-success"  : "" }`}>
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
                            " "
                        }
                    </span>
                </>,
                sortable: false,
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
        </>
    );
}

export default Index;
