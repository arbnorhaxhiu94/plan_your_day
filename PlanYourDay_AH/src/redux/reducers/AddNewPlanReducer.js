import AsyncStorage from '@react-native-async-storage/async-storage'
import { user_id } from "../../globals/set_get_user_id"
import { addNewPlanErrorAction, addNewPlanRequestAction, addNewPlanSuccessAction } from "../actions/AddNewPlanAction"
import firestore from '@react-native-firebase/firestore';

const initialState = {
    loading: false,
    success: false, 
    error: null
}

export const AddNewPlanReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_NEW_PLAN_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'ADD_NEW_PLAN_SUCCESS':
            return {
                ...state,
                loading: false,
                success: action.data
            }
        case 'ADD_NEW_PLAN_ERROR':
            return {
                ...state,
                loading: false,
                error: action.e
            }
        default:
            return {
                ...state
            }
    }
}

export const addNewPlan = (date, tasks) => {
    console.log(typeof(date))
    return async function (dispatch) {
        dispatch(addNewPlanRequestAction())
        console.log('request to add')
        await firestore()
            .collection('plans')
            .doc(user_id+date)
            .set({
                user_id: user_id,
                date: date,
                tasks: tasks
            })
            .then((data) => {
                console.log('Add Plan Firebase ='+data)
                dispatch(addNewPlanSuccessAction(true))
            })
            .catch((e) => {
                console.log(e)
                dispatch(addNewPlanErrorAction(e))
            })
    }
}