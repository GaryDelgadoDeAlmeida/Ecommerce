import React from "react";
import { Route, Routes } from "react-router-dom";

// Anonymous
import Home from "./Anonymous/Home";
import Product from "./Anonymous/Product";
import ProductSingle from "./Anonymous/ProductSingle";
import Login from "./Anonymous/Login";
import Register from "./Anonymous/Register";

// User
import UserHome from "./User/Home";
import UserProfile from "./User/Profile";

// Admin
import AdminHome from "./Admin/Home";
import AdminProfile from "./Admin/Profile";
import AdminProduct from "./Admin/Product";
import AdminOrder from "./Admin/Order";
import AdminOrderDetail from "./Admin/OrderDetail";

// Common
import NotFound from "./NotFound";

export default function RouteConfig() {

    return (
        <Routes>
            {/* Anonymous */}
            <Route path={"/"} element={<Home />} />
            <Route path={"/product"} element={<Product />} />
            <Route path={"/product/:productID"} element={<ProductSingle />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            
            {/* User */}
            <Route path={"/user"} element={<UserHome />} />
            <Route path={"/user/profile"} element={<UserProfile />} />

            {/* Admin */}
            <Route path={"/admin"} element={<AdminHome />} />
            <Route path={"/admin/profile"} element={<AdminProfile />} />
            <Route path={"/admin/product"} element={<AdminProduct />} />
            <Route path={"/admin/order"} element={<AdminOrder />} />
            <Route path={"/admin/order/:orderID"} element={<AdminOrderDetail />} />

            {/* Common */}
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    )
}