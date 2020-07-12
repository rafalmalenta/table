import Company from "../models/Company"
const defaul={
    fetched:null as boolean,   
    companies:null as Array<Company>
}
export default function CompaniesReducer(state = {...defaul, fetched: false,fetching: false},action) {
    switch (action.type) {
        case "FETCH_COMPANIES_SUCCEED":{           
            return { ...state,
                fetching: false,
                fetched: true,
                companies: action.payload,
            }
        }
        case "FETCH_COMPANIES_STARTED":{
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        }
        case "FETCH_COMPANIES_FAILED":{
            return {
                ...state,
                fetching: false,
                fetched: false,
            }
        }
    }
    return state
}

