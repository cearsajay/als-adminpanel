import React  from "react";

import Main from "../pages/layouts/Main";
// ======================================================================================/=
// ======================================================================================/=

// ======================================================================================/=
// ======================================================================================/=

import Login from "../pages/admin/Login";
import DashBoard from "../pages/admin/DashBoard";
import Logout from "../pages/admin/Logout";
import Profile from "../pages/admin/Profile";
import ChangePassword from "../pages/admin/ChangePassword";
import Users from "../pages/user/Index";
import BankIndex from "../pages/bank/Index";
import BankCreate from "../pages/bank/Create";
import UserIndex from "../pages/user/Index";
import UserCreate from "../pages/user/Create";
import SubAdminIndex from "../pages/subadmin/Index";
import SubAdminCreate from "../pages/subadmin/Create";
import AdminSetting from "../pages/setting/Create";
import AppSetting from "../pages/appsetting/Create";
import Transaction from "../pages/transaction/Index";
import PageNotFound from "../pages/NotFound";

const routes = [
    {
        path: '/admin/app-setting',
        exact: true,
        auth: false,
        title:"App Setting",
        component: () => <Main title="App Setting"><AppSetting /></Main>,
    },
    {
        path: '/transaction',
        exact: true,
        auth: false,
        component: () => <Main title="Transaction"><Transaction /></Main>,
    },
    {
        path: '/admin/setting',
        exact: true,
        auth: false,
        component: () => <Main title="Setting"><AdminSetting /></Main>,
    },
    {
        path: '/user/list',
        exact: true,
        auth: false,
        component: () => <Main title="User List"><UserIndex /></Main>,
    },
    {
        path: '/user/create',
        auth: false,
        component: () => <Main title="User Create"><UserCreate /></Main>,
    },
    {
        path: '/subadmin/list',
        exact: true,
        auth: false,
        component: () => <Main title="Sub Admin List"><SubAdminIndex /></Main>,
    },
    {
        path: '/subadmin/create',
        auth: false,
        component: () => <Main title="Sub Admin Create"><SubAdminCreate /></Main>,
    },
    {
        path: '/bank/list',
        exact: true,
        auth: false,
        component: () => <Main title="Banl List"><BankIndex /></Main>,
    },
    {
        path: '/bank/create',
        auth: false,
        component: () => <Main title="Banl Create"><BankCreate /></Main>,
    },
    {
        path: '/logout',
        exact: true,
        auth: true,
        component: () => <Logout/>,
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: () =><Login />,
    },
    {
        path: '/profile',
        exact: true,
        auth: false,
        component: () => <Main title="Profile"><Profile /></Main>,
    },
    {
        path: '/change-password',
        exact: true,
        auth: false,
        component: () => <Main title="Change Password"><ChangePassword /></Main>,
    },
    {
        path: '/users',
        exact: true,
        auth: false,
        component: () => <Main title="Users"><Users /></Main>,
    },
    {
        path: '/dashBoard',
        exact: true,
        auth: true,
        component: () => <Main title="Home"><DashBoard /></Main>,
    },
    {
        path: '/',
        exact: true,
        auth: true,
        component: () => <Main title="Home"><DashBoard /></Main>,
    },
    // {
    //     path: '*',
    //     exact: true,
    //     component: () => <PageNotFound />,
    // }
  ];

  export default routes;