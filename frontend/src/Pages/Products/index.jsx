import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { MdSearchOff } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "./Components/ProductCard";
import ProductsCount from "./Components/ProductsCount";
import Top from "./Components/Top";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(6); // Define how many items per page
  const [totalPages, setTotalPages] = useState(0); // To calculate total pages

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    setProducts([]);
    const search = location.search;
    const searchValue = search.split("=")[1];

    const fetchProducts = async () => {
      let response;
      if (params.brand) {
        response = `https://sinaih-health.vercel.app/product/getProducts?brand=${params.brand}`;
      } else if (searchValue) {
        response = `https://sinaih-health.vercel.app/product/searchproduct?search=${searchValue}`;
      } else {
        response = "https://sinaih-health.vercel.app/product/getProducts";
      }

      try {
        const result = await axios.get(response);
        if (result.status === 200) {
          setProducts(result.data.response);
          // Calculate the total number of pages
          const total = Math.ceil(result.data.response.length / itemsPerPage);
          setTotalPages(total);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params]);

  // Calculate products to display on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous and next buttons
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {products.length > 0 && (
        <div className=" min-h-screen p-4">
          <div className="">
            <Top />
          </div>
          <div className="">
            <ProductsCount ProductsCount={products.length} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-6">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
            >
              Prev
            </button>

            {/* Page Number Buttons */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } cursor-pointer`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {products.length === 0 && (
        <div className="w-full mt-12 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-4">
            <FaRegSadTear className="text-red-500" />
            <MdSearchOff className="text-red-500" />
          </div>
          <p className="text-lg sm:text-xl font-medium text-gray-700">
            No results found for{" "}
            <span className="text-blue-500">
              {location?.search?.split("=")[1]}
            </span>
          </p>
          <p className="text-sm sm:text-md mt-2 text-gray-500">
            Please try adjusting your search or filters.
          </p>
        </div>
      )}
    </>
  );
};

export default Index;
