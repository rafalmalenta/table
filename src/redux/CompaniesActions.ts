import axios, {AxiosResponse} from "axios";
import Company from "../models/Company";
import fetchIncome from "../Service/fetchIncome";
import promiseLoop from "../Service/promiseLoop";
export function fetchCompanies() {
    return function (dispatch) {
        dispatch({type: "FETCH_DETAILS_STARTED",})
        const baseEndPoint: string = "https://recruitment.hal.skygate.io";
        let companiesArray: Company[]  = [];
        axios.get(`${baseEndPoint}/companies`)
            .then((response: AxiosResponse<any>) => {
                companiesArray = response.data.map((company)=>
                     new Company(company.name,company.id, company.city)
                )
                promiseLoop(companiesArray).then(()=>{
                    dispatch({type: "FETCH_COMPANIES_SUCCEED", payload: {...companiesArray }});
                })

            })
            .catch(error => {
                dispatch({type: "FETCH_COMPANIES_FAILED"})
            })
    }
}   

