import AsyncStorage from '@react-native-async-storage/async-storage'
import { user_id } from "../../globals/set_get_user_id"
import firestore from '@react-native-firebase/firestore';
import { editPlanErrorAction, editPlanRequestAction, editPlanSuccessAction } from '../actions/EditPlanAction';

const initialState = {
    loading: false,
    success: false, 
    error: null
}

export const EditPlanReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'EDIT_PLAN_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'EDIT_PLAN_SUCCESS':
            return {
                ...state,
                loading: false,
                success: action.data
            }
        case 'EDIT_PLAN_ERROR':
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

export const editPlan = (date, tasks) => {
    console.log(typeof(date))
    return async function (dispatch) {
        dispatch(editPlanRequestAction())
        console.log('request to edit')
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
                dispatch(editPlanSuccessAction(true))
            })
            .catch((e) => {
                console.log(e)
                dispatch(editPlanErrorAction(e))
            })
    }
}