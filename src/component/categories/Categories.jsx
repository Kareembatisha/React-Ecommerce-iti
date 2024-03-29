import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import Categorie from "./Categorie";
import SubCategories from "../SubCategories/SubCategories";
import SubCategorie from "../SubCategories/SubCategorie";
import { Helmet } from "react-helmet";
export default function Categories() {
  function getCategories() {
    let categories = axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return categories;
  }
  let { data, isLoading } = useQuery("getCategories", getCategories, {
    cacheTime: 3000,
    refetchInterval: 5000,
  });
  console.log("data", data);
  console.log("data", data?.data.data);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" content="Categories" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      { }
      <div className="container my-5 ">
        <div className="row">
          {data?.data.data.map((item) => {
            return <Categorie item={item} key={item._id}></Categorie>;
          })}
        </div>
        { }
      </div>
      { }
    </>
  );
}
