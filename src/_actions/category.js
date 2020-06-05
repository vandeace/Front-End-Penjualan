import { GET_CAT } from "../_store/action-types";
import axios from "axios";

export const getCategories = () => {
  return {
    type: GET_CAT,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/v1/categories`,
    }),
  };
};
