import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/index";
import NavBar from "./Nav/index";
import Footer from "./Footer/index";
import WhatsAppButton from "./WhatsAppButton";
import CallButton from "./CallButton";
import axios from "axios";
import { useEffect } from "react";
import { addBrands } from "../Store/Brands";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await axios.get(
        "http://localhost:3000/product/getProducts",
        {}
      );
      if (products.status === 200) {
        const brands = products?.data.response?.map((item) => item.brand);
        const uniqueBrands = [...new Set(brands)];
        dispatch(addBrands(uniqueBrands));
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Header />
      <NavBar />
      <div className="w-full mb-20 ">
        <Outlet />
      </div>
      <Footer className="mt-20" />

      {/* WhatsApp and Call buttons */}
      <div className="fixed bottom-12 z-50 flex flex-col gap-2 sm:hidden md:hidden">
        <WhatsAppButton />
        <CallButton />
      </div>
    </div>
  );
};

export default Layout;
