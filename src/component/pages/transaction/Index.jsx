import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from 'react';
import Http from '../../security/Http';
import '../../../custome.css';
import url from "../../../Development.json";
import Select from 'react-select'

import { errorResponse, configHeaderAxios, customStylesDataTable } from "../../helpers/response";
const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectType, setType] = useState([1, 2, 3]);

    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    let currentFilterText = '';

    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC', type = selectType) => {
        const config = configHeaderAxios();
        let dataSend = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}&type=${type}`;
        Http
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
    const selectOptionType = (e) => {
        setType(e.value);
        getData(page, perPage, 'id', 'DESC', e.value);
    };

    const columns = useMemo(
        () => [

            {
                name: 'Type',
                selector: row => <>
                    {
                        <span className={`badge  
                                                           ${row.type === 0 ? "badge-warning" :
                                row.type === 1 ? "badge-success" :
                                    row.type === 2 ? "badge-success" :
                                        row.type === 3 ? "badge-success" :
                                            row.type === 4 ? "badge-success" :
                                                row.type === 5 ? "badge-success" :
                                                    row.type === 6 ? "badge-primary" :
                                                        row.type === 7 ? "badge-danger" :


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
                selector: row => Number(row.amount).toFixed(2),
                sortable: true,
            },
            {
                name: 'Received Amount',
                selector: row => Number(row.received_amount).toFixed(2),
                sortable: true,
            },
            {
                name: 'Admin Fees',
                selector: row => Number(row.admin_fees).toFixed(2),
                sortable: true,
            },
            {
                name: 'Payment Process Fee',
                selector: row => Number(row.payment_process_fee).toFixed(2),
                sortable: true,
            },
            {
                name: 'Service Charge',
                selector: row => Number(row.service_charge).toFixed(2),
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

    const options = [
        { value: [3, 4], label: 'Transfer' },
        { value: 2, label: 'Add Money' },
        { value: 1, label: 'Withdraw' }
    ]
    const FilterComponent = (
        <>
            <div className="d-flex">
                <input type="text"
                    className="form-control mr-2"
                    id="search"
                    placeholder="Filter By Name"
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
            <div className='transaction-list-table text-overflow-inherit'>
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
            </div>
        </>
    );
}

export default Index;
