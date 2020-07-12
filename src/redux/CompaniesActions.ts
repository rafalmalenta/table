import axios, {AxiosResponse} from "axios";


export function fetchCompanies() {
    return function (dispatch) {
        dispatch({type: "FETCH_DETAILS_STARTED",})
        const baseEndPoint: string = "https://recruitment.hal.skygate.io";      
        axios.get(`${baseEndPoint}/companies`)
            .then((response: AxiosResponse<any>) => {
                //console.log(response.data);
                response.data.map((c)=>{
                    console.log(c)
                })
                dispatch({type: "FETCH_COMPANIES_SUCCEED", payload: {...response.data, }});
                //console.log(response.data);
            })
            .catch(error => {
                dispatch({type: "FETCH_COMPANIES_FAILED"})
            })
    }
}   

