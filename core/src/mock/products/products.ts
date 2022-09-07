import { products } from "../../products";

export default [
  {
    url: "/products",
    method: "get",
    response: () => {
      return products;
    },
  },
];
