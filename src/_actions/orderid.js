import { GET_ORDER_ID } from "../_store/action-types";
import axios from "axios";

export const getOrderId = (id) => {
  return {
    type: GET_ORDER_ID,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/v1/transaction/${id}`,
    }),
  };
};
