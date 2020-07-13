import * as React from "react";
import { useEffect } from 'react';
import {fetchCompanies} from "../redux/CompaniesActions";
import {sortCompanies} from "../redux/CompaniesActions";
import Table from '../components/Table';
import { connect } from 'react-redux';

export default connect(
    (store)=>{
        return {
            companies: store,
        }
    },
)(
function Layout(props){
    let companies = props.companies;
    useEffect(() => {
        props.dispatch(fetchCompanies());       
    },[]);
    function test(){
        //console.log("dispacz", props.companies)
        props.dispatch(sortCompanies(companies.companies,"ASC","id"))
    }
    let component = <div>WHOOPS! something went wrong</div>   

    return(
        <div>
            <div>Tutaj pojawi się opis </div>
            {!companies ? (component):(< Table disp={test} companiesData={companies}/>)}
        </div>
    )
}
)