import axios, {AxiosResponse} from "axios";
import Company from "../models/Company";
import fetchLoop from "../Service/fetchLoop";
import {bubbleSort} from "../Service/bubbleSort";

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
                fetchLoop(companiesArray)
                    .then(()=>{
                        dispatch({type: "FETCH_COMPANIES_SUCCEED", payload: {...companiesArray }});
                })
                    .catch(error => dispatch({type: "FETCH_COMPANIES_FAILED"}))

            })
            .catch(error => {
                dispatch({type: "FETCH_COMPANIES_FAILED"})
            })
    }
}

