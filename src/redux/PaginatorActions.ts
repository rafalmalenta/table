export default function changePage(page) {
    return function (dispatch) {
        dispatch({type: "CHANGE_PAGE",payload:page})
    }
}