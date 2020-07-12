import * as React from "react";
import { useEffect } from 'react';
import {fetchCompanies} from "../redux/CompaniesActions";
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
    let component = <div>WHOOPS! something went wrong</div>   
    //console.log(companies)
    return(
        <div>   
            {!companies ? (component):(< Table  companiesData={companies}/>)}
        </div>
    )
}
)