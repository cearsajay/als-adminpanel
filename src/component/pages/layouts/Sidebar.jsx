import React, { useState } from 'react';
// import { useSelector } from "react-redux";
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faLaptop, faTags, faUniversity, faUserCog, faUsers, faUserTag, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
    const { sidebarToggle, sideActive } = props;

    const { SubMenu } = Menu;
    const rootSubmenuKeys = ['sub1', 'sub2'];
    const [openKeys, setOpenKeys] = useState(['']);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <>
            <div id="sidebar" className="app-sidebar">
                <div className="app-sidebar-content" data-scrollbar="true" data-height="100%">
                    <Menu openKeys={openKeys} onOpenChange={onOpenChange} mode="inline" className={`${sideActive ? 'ant-menu-inline-collapsed' : ''} `}>
                        {localStorage.getItem('permissions').includes('dashboard_view') ?
                            <Menu.Item key="1">
                                <NavLink exact to={"/"} className="menu-link"><FontAwesomeIcon icon={faLaptop} /> Dashboard</NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('user_view') ?

                            <Menu.Item key="2">
                                <NavLink to={"/user/list"} className="menu-link"><FontAwesomeIcon icon={faUsers} /> User List</NavLink>
                            </Menu.Item>
                            : ''}
                        {/* {localStorage.getItem('permissions').includes('bank_view') ?

                            <Menu.Item key="3">
                                <NavLink to={"/bank/list"} className="menu-link">
                                    <FontAwesomeIcon icon={faUniversity} /> Bank List
                                </NavLink>
                            </Menu.Item>
                            : ''} */}
                        {localStorage.getItem('permissions').includes('bank_view') ?

                            <Menu.Item key="3">
                                <NavLink to={"/logs/list"} className="menu-link">
                                    <FontAwesomeIcon icon={faUniversity} /> Log List
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('setting_view') ?
                            <Menu.Item key="4">
                                <NavLink to={"/admin/setting"} className="menu-link">
                                    <FontAwesomeIcon icon={faUserCog} /> Admin Settings
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('app-setting_view') ?
                            <Menu.Item key="5">
                                <NavLink to={"/admin/app-setting"} className="menu-link">
                                    <FontAwesomeIcon icon={faUserCog} /> Admin fee Settings
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('transaction_view') ?
                            <Menu.Item key="6">
                                <NavLink to={"/transaction"} className="menu-link">
                                    <FontAwesomeIcon icon={faHistory} /> Transaction
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('subadmin_view') ?
                            <Menu.Item key="7">
                                <NavLink to={"/subadmin/list"} className="menu-link">
                                    <FontAwesomeIcon icon={faUserTie} /> Sub Admin
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('role_view') ?
                            <Menu.Item key="8">
                                <NavLink to={"/role/list"} className="menu-link">
                                    <FontAwesomeIcon icon={faTags} /> Roles
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('support_view') ?
                            <Menu.Item key="9">
                                <NavLink to={"/support/list"} className="menu-link">
                                    <FontAwesomeIcon icon={faTags} /> Support
                                </NavLink>
                            </Menu.Item>
                            : ''}
                        {localStorage.getItem('permissions').includes('feed_back_type_view') ?
                            <Menu.Item key="10">
                                <NavLink to={"/feed_back_type/list"} className="menu-link">
                                    <FontAwesomeIcon icon={faTags} /> Feed Back Type
                                </NavLink>
                            </Menu.Item>
                            : ''}
                    </Menu>
                </div>
                <button className="app-sidebar-mobile-backdrop" onClick={sidebarToggle} data-dismiss="sidebar-mobile"></button>
            </div>
        </>
    );
}

export default Sidebar;