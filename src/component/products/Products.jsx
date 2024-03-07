import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

import { Helmet } from "react-helmet";
export default function Products() {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const getProducts = async (page = currentPage) => {
    const productsPerPage = 12; // Set the desired number of products per page
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${productsPerPage}`
    );
  };


  const { data, isLoading } = useQuery(
    ["getProducts", currentPage],
    () => getProducts(currentPage),
    {
      cacheTime: 3000,
      refetchInterval: 5000,
    }
  );
  const filteredData = data?.data.data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loading />;


  const productsPerPage = 10;
  const totalPages = Math.ceil(data?.data.totalPages / productsPerPage) || 5;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" content="products" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <nav className="navbar ">
          <div className="container-fluid">
            <input
              className="form-control me-2 "
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            { }
          </div>
        </nav>
        <div className="row">
          {(searchQuery ? filteredData : data?.data.data).map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation  ">
        <ul className="pagination m-auto justify-content-center my-5">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page + 1}
              className={`page-item ${currentPage === page + 1 ? "active" : ""
                }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
