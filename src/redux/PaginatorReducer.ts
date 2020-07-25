
const defaul={
    recordsPerPage:10 as number,
    page:1 as number,
}
export default function PaginatorReducer(state = {...defaul },action) {
    switch (action.type) {
        case "CHANGE_PAGE":{
            return {
                ...state,
                page: action.payload,
            }
        }
        case "CHANGE_VIEW":{
            return {
                ...state,
                recordsPerPage: action.payload
            }
        }
    }
    return state
}

