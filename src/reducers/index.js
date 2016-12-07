import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  test(state = {}) {
  	return state;
  }
});

export default rootReducer;