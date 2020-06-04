import {createStore,combineReducers,applyMiddleware} from 'redux'
import {logger,promise} from './middleware'
import reducerCust from '../_reducers/customer'
import reducerStock from '../_reducers/storage'
import reducerOrder from '../_reducers/order'
import reducerOrderId from '../_reducers/orderId'

const rootReducer = combineReducers({
    customer : reducerCust,
    stock : reducerStock,
    order : reducerOrder,
    orderId : reducerOrderId
})

const store = createStore(rootReducer, applyMiddleware(logger,promise))

export default store