import { combineReducers } from 'redux';
import CategoryReducer from 'store/reducers/Category';
import IncomeReducer from 'store/reducers/Income';
import ExpenseReducer from 'store/reducers/Expense';

const rootReducer = combineReducers({
	Category: CategoryReducer,
	Income: IncomeReducer,
	Expense: ExpenseReducer,
});

export default rootReducer;

