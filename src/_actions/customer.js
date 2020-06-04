import { GET_CUST } from "../_store/action-types";
import axios from "axios";

export const getUsers = (token) => {
  return {
    type: GET_CUST,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/v1/customers`,
    }),
  };
};
