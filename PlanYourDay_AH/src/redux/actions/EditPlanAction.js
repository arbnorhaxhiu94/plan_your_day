export const editPlanRequestAction = () => {
    return {
        type: 'EDIT_PLAN_REQUEST'
    }
}

export const editPlanSuccessAction = (success) => {
    return {
        type: 'EDIT_PLAN_SUCCESS',
        success: success
    }
}

export const editPlanErrorAction = (e) => {
    return {
        type: 'EDIT_PLAN_ERROR',
        error: e
    }
}