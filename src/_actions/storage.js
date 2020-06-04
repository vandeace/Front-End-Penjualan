import { GET_PRODUCT } from "../_store/action-types";
import axios from "axios";

export const getStocks = () => {
  return {
    type: GET_PRODUCT,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/v1/products`,
    }),
  };
};
