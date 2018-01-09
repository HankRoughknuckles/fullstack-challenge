import { DETAILS_MODAL } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case DETAILS_MODAL:
      return action.payload;
    default:
      return state;
  }
}
