import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";

import Brand from "./Brand";
import { Helmet } from "react-helmet";
export default function Brands() {
  function getBrands() {
    let Brands = axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return Brands;
  }
  let { data, isLoading } = useQuery("getBrands", getBrands, {
    cacheTime: 3000,
    refetchInterval: 5000,
  });
  console.log("data", data);
  console.log("data", data?.data.data);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" content="brands" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      { }
      <div className="container my-5 ">
        <div className="row">
          {data?.data.data.map((item) => {
            return <Brand item={item} key={item._id}></Brand>;
          })}
        </div>
      </div>
      { }
    </>
  );
}
