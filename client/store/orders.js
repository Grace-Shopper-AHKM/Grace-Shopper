import axios from 'axios';
import history from '../history'

export function addOrder(order) {
    return function thunk(dispatch) {
      return axios.post('/api/orders/add-order', order)
        .then(history.push('/books'))
        .catch(console.error);
    }
  }
