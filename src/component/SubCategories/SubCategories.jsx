import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function SubCategories() {
  let x = useParams();
  function getSubCategories() {
    let Subcategories = axios
      .get(`https://ecommerce.routemisr.com/api/v1/subcategories/${x.myId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        return response.data;
      });

    return Subcategories;
  }

  let { data, isLoading } = useQuery("getSubCategories", getSubCategories, {
    cacheTime: 3000,
    refetchInterval: 5000,
  });
  const subCategories = data?.data;
  console.log("data", data);
  console.log("data", subCategories);

  if (isLoading) return <Loading />;

  return (
    <>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 g-4">
            <h1 className="text-main m-auto">Sub Categorie </h1>
            <div
              key={subCategories._id}
              className="card mb-2 shadow-sm rounded product my-5"
            >
              <div className="card-body">
                <h4 className="card-text  fw-bolder">{subCategories.name}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
