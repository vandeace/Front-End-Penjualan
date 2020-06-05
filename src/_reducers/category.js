import { GET_CAT } from "../_store/action-types";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CAT}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_CAT}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
      };
    case `${GET_CAT}_REJECTED`:
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
