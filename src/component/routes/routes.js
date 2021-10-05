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
import AdminSetting from "../pages/setting/Create";
import AppSetting from "../pages/appsetting/Create";
import Transaction from "../pages/transaction/Index";

const routes = [
    {
        path: '/admin/app-setting',
        exact: true,
        auth: false,
        component: () => <Main title="App Setting"><AppSetting /></Main>,
    },
    {
        path: '/transaction',
        exact: true,
        auth: false,
        component: () => <Main title="App Setting"><Transaction /></Main>,
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
        component: () => <Main title="Home"><UserIndex /></Main>,
    },
    {
        path: '/user/create',
        auth: false,
        component: () => <Main title="Home"><UserCreate /></Main>,
    },
    {
        path: '/bank/list',
        exact: true,
        auth: false,
        component: () => <Main title="Home"><BankIndex /></Main>,
    },
    {
        path: '/bank/create',
        auth: false,
        component: () => <Main title="Home"><BankCreate /></Main>,
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
        component: () => <Main title="Home"><Profile /></Main>,
    },
    {
        path: '/change-password',
        exact: true,
        auth: false,
        component: () => <Main title="Home"><ChangePassword /></Main>,
    },
    {
        path: '/',
        exact: true,
        auth: true,
        component: () => <Main title="Home"><DashBoard /></Main>,
    },
    {
        path: '/users',
        exact: true,
        auth: false,
        component: () => <Main title="Home"><Users /></Main>,
    }
  ];

  export default routes;