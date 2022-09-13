import { products } from "../../products";

export default [
  {
    url: "/productList",
    method: "get",
    response: () => {
      return products;
    },
  },
];
