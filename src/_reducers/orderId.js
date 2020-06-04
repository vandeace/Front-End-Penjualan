import { GET_ORDER_ID } from "../_store/action-types";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ORDER_ID}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ORDER_ID}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
      };
    case `${GET_ORDER_ID}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducerUser;
