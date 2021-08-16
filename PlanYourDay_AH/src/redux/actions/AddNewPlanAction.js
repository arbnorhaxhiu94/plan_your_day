export const addNewPlanRequestAction = () => {
    return {
        type: 'ADD_NEW_PLAN_REQUEST'
    }
}

export const addNewPlanSuccessAction = (success) => {
    return {
        type: 'ADD_NEW_PLAN_SUCCESS',
        success: success
    }
}

export const addNewPlanErrorAction = (e) => {
    return {
        type: 'ADD_NEW_PLAN_ERROR',
        error: e
    }
}