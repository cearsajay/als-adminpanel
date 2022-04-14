import React, { useMemo, useState, useEffect } from 'react';
import { faDownload, faExchangeAlt, faHistory, faMoneyBill, faUpload, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import Http from '../../security/Http';
import '../../../custome.css';
import url from "../../../Development.json";
import { useHistory } from "react-router-dom";
import Moment from 'moment';

import { errorResponse, configHeaderAxios, customStylesDataTable } from "../../helpers/response";
const Index = () => {
    const [dataTableData, setDataTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [id, setId] = useState('');

    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [filterText, setFilterText] = useState('');
    const [userCount, setUserCount] = useState('0');
    const [totalWithdraw, setTotalWithdraw] = useState('0');
    const [totalDeposit, setTotalDeposit] = useState('0');
    const [totalTransfer, setTotalTransfer] = useState('0');
    const [totalTransaction, setTotalTransaction] = useState('0');
    const [totalWalletAmount, setTotalWalletAmount] = useState('0');
    const [totalAdminFee, setTotalAdminFee] = useState('0');
    const [name, setName] = useState('***');

    let currentFilterText = '';
    let history = useHistory();

    useEffect(() => {
        let query = new URLSearchParams(history.location.search);
        let id = query.get('id')
        if (id) {
            setId(id);
            getData(1, 10, 'id', 'DESC', id);
        }
        else {
            getData();
        }
    }, [])

    const getData = async (page = 1, perPage = 10, sortField = 'id', sortDirection = 'DESC', userId = id) => {
        const config = configHeaderAxios();
        let dataSend = `?page=${page}&per_page=${perPage}&delay=1&sort_direction=${sortDirection}&sort_field=${sortField}&search=${currentFilterText}&id=${userId}`;
        Http
            .get(process.env.REACT_APP_BASE_URL + url.user_wallet_transaction + dataSend, config)
            .then((response) => {
                setDataTableData(response.data.data.rows);
                setTotalRows(response.data.data.count);
                setLoading(false);

                setName(response.data.data.rows[0].user_name);

            })
            .catch((error) => {
                if (error.response) {
                    errorResponse(error);
                }
            });
    }

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
                name: 'Account ID',
                selector: row => row.user_id,
                sortable: true,
            },
            {
                name: 'Amount',
                selector: row => row.amount,
                sortable: true,
            },
            {
                name: 'After Amount',
                selector: row => row.final_amount,
                sortable: true,
            },
            {
                name: 'Type',
                selector: row =>
                    <>

                        {(() => {
                            if (row.type === 1) {
                                return (
                                    <span className={`btn-sm  btn-primary `}>
                                        {
                                            "Add"
                                        }
                                    </span>
                                )
                            } else if (row.kyc_status === 1) {
                                return (
                                    <span className={`btn-sm  btn-danger`}>
                                        {
                                            "Deduct"
                                        }
                                    </span>
                                )
                            } else {
                                return (
                                    <span className={`btn-sm  btn-danger`}>
                                        {
                                            "dddd"
                                        }
                                    </span>
                                )
                            }
                        })()}

                    </>,

                sortable: true,
            },
            {
                name: 'DateTime',
                selector: row =>  Moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
                sortable: true,
            },
            {
                name: 'By Which Subadmin',
                selector: row => row.admin_name,
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
            <h2>
                User Name :- {name}
            </h2>

            <div className='transaction-list-table text-overflow-inherit'>
                <DataTable
                    subHeader
                    subHeaderComponent={FilterComponent}
                    title="User Wallet Transaction List"
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
