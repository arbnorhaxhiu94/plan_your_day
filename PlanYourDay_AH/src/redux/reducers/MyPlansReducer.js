import { getMyPlansErrorAction, getMyPlansRequestAction, getMyPlansSuccessAction } from "../actions/MyPlansAction"
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
import { user_id } from "../../globals/set_get_user_id";

const initialState = {
    loading: false,
    data: null, 
    error: null
}

export const GetMyPlansReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MY_PLANS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_MY_PLANS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case 'GET_MY_PLANS_ERROR':
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

export const getMyPlans = () => {
    return async function (dispatch) {
        dispatch(getMyPlansRequestAction())
        console.log('request')

        await firestore()
            .collection('plans')
            .where('user_id', '==', user_id)
            .get()
            .then((data) => {
                let plans = []
                // console.log('Data = '+data.forEach)
                data.forEach((item) => {
                    plans.push(item.data())
                    console.log(typeof(item.data()))
                })
                if (data.empty) {
                    dispatch(getMyPlansSuccessAction([]))
                } else {
                    dispatch(getMyPlansSuccessAction(plans))
                }
            })
            .catch((e) => {
                console.log(e)
                dispatch(getMyPlansErrorAction(e))
            })
    }
}