import { GET_ORDER } from "../_store/action-types";
import axios from "axios";

export const getOrders = () => {
  return {
    type: GET_ORDER,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/v1/transactions`,
    }),
  };
};
