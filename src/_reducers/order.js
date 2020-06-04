import { GET_ORDER } from "../_store/action-types";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ORDER}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_ORDER}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
      };
    case `${GET_ORDER}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case `SET_TOKEN`:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default reducerUser;
