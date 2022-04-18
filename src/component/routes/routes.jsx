import React from "react";

import Main from "../pages/layouts/Main";
// ======================================================================================/=
// ======================================================================================/=

// ======================================================================================/=
// ======================================================================================/=

import Login from "../pages/admin/Login";
import DashBoard from "../pages/admin/DashBoard";
import CommingSoon from "../pages/ComingSoon";
import Logout from "../pages/admin/Logout";
import Profile from "../pages/admin/Profile";
import ChangePassword from "../pages/admin/ChangePassword";
import ChangePin from "../pages/admin/ChangePin";
import BankIndex from "../pages/bank/Index";
import BankCreate from "../pages/bank/Create";
import LogsIndex from "../pages/logs/Index";
import FeedBackTypeIndex from "../pages/feedbacktype/Index";
import FeedBackTypeCreate from "../pages/feedbacktype/Create";
import SupportIndex from "../pages/support/Index";
import SupportCreate from "../pages/support/Create";
import RoleIndex from "../pages/role/Index";
import RoleCreate from "../pages/role/Create";
import UserIndex from "../pages/user/Index";
import UserTransaction from "../pages/user/Transaction";
import UserWalletTransaction from "../pages/user/WalletTransaction";
import UserCreate from "../pages/user/Create";
import SubAdminIndex from "../pages/subadmin/Index";
import SubAdminCreate from "../pages/subadmin/Create";
import NotificationIndex from "../pages/notification/Index";
import NotificationCreate from "../pages/notification/Create";
import AdminSetting from "../pages/setting/Create";
import AppSetting from "../pages/appsetting/Create";
import Transaction from "../pages/transaction/Index";
import PageNotFound from "../pages/NotFound";
import PermissionsNotAccess from "../pages/PermissionsNotAccess";
const routes = [
    {
        path: '/admin/app-setting',
        exact: true,
        auth: true,
        permission: 'app-setting_view',
        component: () => <Main title="App Setting"><AppSetting /></Main>,
    },
    {
        path: '/transaction',
        exact: true,
        auth: true,
        permission: 'transaction_view',
        component: () => <Main title="Transaction"><Transaction /></Main>,
    },
    {
        path: '/admin/setting',
        exact: true,
        auth: true,
        permission: 'setting_view',
        component: () => <Main title="Setting"><AdminSetting /></Main>,
    },
    {
        path: '/user/list',
        exact: true,
        auth: true,
        permission: 'user_view',
        component: () => <Main title="User List"><UserIndex /></Main>,
    },
    {
        path: '/user/create',
        auth: true,
        exact: true,
        permission: 'user_store',
        component: () => <Main title="User Create"><UserCreate /></Main>,
    },
    {
        path: '/user/transaction',
        auth: true,
        exact: true,
        permission: '',
        component: () => <Main title="User Transaction"><UserTransaction /></Main>,
    },
    {
        path: '/user/wallet-transaction',
        auth: true,
        exact: true,
        permission: '',
        component: () => <Main title="User Wallet Transaction"><UserWalletTransaction /></Main>,
    },
    {
        path: '/subadmin/list',
        exact: true,
        auth: true,
        permission: 'subadmin_view',
        component: () => <Main title="Sub Admin List"><SubAdminIndex /></Main>,
    },
    {
        path: '/subadmin/create',
        exact: true,
        auth: true,
        permission: 'subadmin_store',
        component: () => <Main title="Sub Admin Create"><SubAdminCreate /></Main>,
    },
    {
        path: '/support/list',
        exact: true,
        auth: true,
        permission: 'support_view',
        component: () => <Main title="Supoort List"><SupportIndex /></Main>,
    },
    {
        path: '/support/create',
        exact: true,
        auth: true,
        permission: 'support_store',
        component: () => <Main title="Support Create"><SupportCreate /></Main>,
    },
    {
        path: '/feed_back_type/list',
        exact: true,
        auth: true,
        permission: 'feed_back_type_view',
        component: () => <Main title="Feed Back Type List"><FeedBackTypeIndex /></Main>,
    },
    {
        path: '/feed_back_type/create',
        exact: true,
        auth: true,
        permission: 'feed_back_type_store',
        component: () => <Main title="Feed Back Type Create"><FeedBackTypeCreate /></Main>,
    },
    {
        path: '/bank/list',
        exact: true,
        auth: true,
        permission: 'bank_view',
        component: () => <Main title="Bank List"><BankIndex /></Main>,
    },
    {
        path: '/bank/create',
        exact: true,
        auth: true,
        permission: 'bank_store',
        component: () => <Main title="Bank Create"><BankCreate /></Main>,
    },
    {
        path: '/Logs/list',
        exact: true,
        auth: true,
        permission: 'bank_view',
        component: () => <Main title="Logs List"><LogsIndex /></Main>,
    },
    {
        path: '/role/list',
        exact: true,
        auth: true,
        permission: 'role_view',
        component: () => <Main title="Roles List"><RoleIndex /></Main>,
    },
    {
        path: '/role/create',
        exact: true,
        auth: true,
        permission: 'role_store',

        component: () => <Main title="Roles Create"><RoleCreate /></Main>,
    },
    {
        path: '/notification/list',
        exact: true,
        auth: true,
        permission: 'role_view',
        component: () => <Main title="Notification List"><NotificationIndex /></Main>,
    },
    {
        path: '/notification/create',
        exact: true,
        auth: true,
        permission: 'role_store',
        component: () => <Main title="Notification Create"><NotificationCreate /></Main>,
    },
    {
        path: '/logout',
        exact: true,
        auth: true,
        permission: '',
        component: () => <Logout />,
    },
    {
        path: '/securitysiteaccess/login',
        exact: true,
        auth: false,
        permission: '',
        component: () => <Login />,
    },
    {
        path: '/profile',
        exact: true,
        auth: true,
        permission: '',
        component: () => <Main title="Profile"><Profile /></Main>,
    },
    {
        path: '/change-password',
        exact: true,
        auth: true,
        permission: '',
        component: () => <Main title="Change Password"><ChangePassword /></Main>,
    },
    {
        path: '/change-pin',
        exact: true,
        auth: true,
        permission: '',
        component: () => <Main title="Change Pin"><ChangePin /></Main>,
    },
    {
        path: '/dashBoard',
        exact: true,
        auth: true,
        permission: 'dashboard_view',
        component: () => <Main title="Home"><DashBoard /></Main>,
    },
    {
        path: '/permissions_not_access',
        exact: false,
        auth: false,
        component: () => <PermissionsNotAccess />,
    },
    // {
    //     path: '/donottouchStupid',
    //     exact: true,
    //     permission: '',
    //     component: () => <CommingSoon />,
    // },    
    {
        path: '/',
        exact: false,
        component: () => <CommingSoon />,
    },    
    {
        path: '*',
        exact: true,
        component: () => <PageNotFound />,
    }
];

export default routes;