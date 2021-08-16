export const getMyPlansRequestAction = () => {
    return {
        type: 'GET_MY_PLANS_REQUEST'
    }
}

export const getMyPlansSuccessAction = (data) => {
    return {
        type: 'GET_MY_PLANS_SUCCESS',
        data: data
    }
}

export const getMyPlansErrorAction = (e) => {
    return {
        type: 'GET_MY_PLANS_ERROR',
        error: e
    }
}