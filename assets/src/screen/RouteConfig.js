import React from "react";
import { Route, Routes } from "react-router-dom";

// Anonymous
import Home from "./Anonymous/Home";
import News from "./Anonymous/News";
import About from "./Anonymous/About";
import Category from "./Anonymous/Category";
import CategorySingle from "./Anonymous/CategorySingle";
import Product from "./Anonymous/Product";
import ProductSingle from "./Anonymous/ProductSingle";
import BestSeller from "./Anonymous/BestSeller";
import Help from "./Anonymous/Help";
import Privacy from "./Anonymous/Privacy";
import ConditionalTerms from "./Anonymous/ConditionalTerms";
import Cookie from "./Anonymous/Cookie";
import ShoppingCart from "./Anonymous/ShoppingCart";
import Login from "./Anonymous/Login";
import Register from "./Anonymous/Register";

// User
import UserHome from "./User/Home";
import UserOrder from "./User/Order";
import UserOrderDetail from "./User/OrderDetail";

// Admin
import AdminHome from "./Admin/Home";
import AdminProfile from "./Admin/Profile";
import AdminUser from "./Admin/User";
import AdminCategory from "./Admin/Category";
import AdminCategoryCreate from "./Admin/CategoryCreate";
import AdminBrand from "./Admin/Brand";
import AdminBrandCreate from "./Admin/BrandCreate";
import AdminBrandDetail from "./Admin/BrandDetail";
import AdminProduct from "./Admin/Product";
import AdminProductCreate from "./Admin/ProductCreate";
import AdminOrder from "./Admin/Order";
import AdminOrderDetail from "./Admin/OrderDetail";
import AdminSetting from "./Admin/Setting";

// Common
import NotFound from "./NotFound";

export default function RouteConfig() {

    return (
        <Routes>
            {/* Anonymous */}
            <Route path={"/"} element={<Home />} />
            <Route path={"/news"} element={<News />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/categories"} element={<Category />} />
            <Route path={"/category/:categoryID"} element={<CategorySingle />} />
            <Route path={"/products"} element={<Product />} />
            <Route path={"/product/:productID"} element={<ProductSingle />} />
            <Route path={"/best-seller"} element={<BestSeller />} />
            <Route path={"/help"} element={<Help />} />
            <Route path={"/policy-and-privacy"} element={<Privacy />} />
            <Route path={"/terms-and-condition"} element={<ConditionalTerms />} />
            <Route path={"/cookie"} element={<Cookie />} />
            <Route path={"/shopping-cart"} element={<ShoppingCart />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            
            {/* User */}
            <Route path={"/user"} element={<UserHome />} />
            <Route path={"/user/orders"} element={<UserOrder />} />
            <Route path={"/user/order/:orderID"} element={<UserOrderDetail />} />

            {/* Admin */}
            <Route path={"/admin"} element={<AdminHome />} />
            <Route path={"/admin/users"} element={<AdminUser />} />
            <Route path={"/admin/profile"} element={<AdminProfile />} />
            <Route path={"/admin/categories"} element={<AdminCategory />} />
            <Route path={"/admin/category/create"} element={<AdminCategoryCreate />} />
            <Route path={"/admin/brands"} element={<AdminBrand />} />
            <Route path={"/admin/brand/create"} element={<AdminBrandCreate />} />
            <Route path={"/admin/brand/:brandID"} element={<AdminBrandDetail />} />
            <Route path={"/admin/products"} element={<AdminProduct />} />
            <Route path={"/admin/product/create"} element={<AdminProductCreate />} />
            <Route path={"/admin/orders"} element={<AdminOrder />} />
            <Route path={"/admin/order/:orderID"} element={<AdminOrderDetail />} />
            <Route path={"/admin/settings"} element={<AdminSetting />} />

            {/* Common */}
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    )
}