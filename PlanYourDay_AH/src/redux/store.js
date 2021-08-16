import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AddNewPlanReducer } from './reducers/AddNewPlanReducer';
import { EditPlanReducer } from './reducers/EditPlanReducer';
import { GetMyPlansReducer } from './reducers/MyPlansReducer';

// Note: this API requires redux@>=3.1.0

const rootReducer = combineReducers({
    getMyPlansReducer: GetMyPlansReducer,
    addNewPlanReducer: AddNewPlanReducer,
    editPlanReducer: EditPlanReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store