export function changePage(page) {
    return function (dispatch) {
        dispatch({type: "CHANGE_PAGE",payload:page})
    }
}

export function changeWiev(recordsPerPage) {
    return function (dispatch) {
        dispatch({type: "CHANGE_VIEW",payload:recordsPerPage})
    }
}