import React, { useState } from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    const { sidebarToggle, sideActive } = props;
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
                    <Menu openKeys={openKeys} onOpenChange={onOpenChange} defaultSelectedKeys={['1']} mode="inline" className={`${sideActive ? 'ant-menu-inline-collapsed' : ''} `}>
                        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faLaptop} />}>
                            Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faUsers} />}>
                            <Link to="/user/list" className="menu-link">
                                User List
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faUsers} />}>
                            <Link to="/bank/list" className="menu-link">
                                Bank List
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<FontAwesomeIcon icon={faUsers} />}>
                            <Link to="/admin/setting" className="menu-link">
                                Admin Settings
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<FontAwesomeIcon icon={faUsers} />}>
                            <Link to="/admin/app-setting" className="menu-link">
                                Admin fee Settings
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<FontAwesomeIcon icon={faUsers} />}>
                            <Link to="/transaction" className="menu-link">
                                Transaction
                            </Link>
                        </Menu.Item>

                    </Menu>
                </div>

                <button className="app-sidebar-mobile-backdrop" onClick={sidebarToggle} data-dismiss="sidebar-mobile"></button>
            </div>
        </>
    );
}

export default Sidebar;