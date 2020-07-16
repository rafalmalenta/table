import * as React from "react";
import { useEffect } from 'react';
import {fetchCompanies} from "../redux/CompaniesActions";
import {sortCompanies} from "../redux/CompaniesActions";
import Table from '../components/Table';
import { connect } from 'react-redux';
import Paginator from "../components/Paginator";

export default connect(
    (store)=>{
        return {
            companies: store.CompaniesReducer,
            paginator: store.PaginatorReducer,
        }
    },
)(
function Layout(props){
    let companies = props.companies;
    let paginator = props.paginator;
    useEffect(() => {
        props.dispatch(fetchCompanies());       
    },[]);
    function changeSorting(array,order,parameter){
        props.dispatch(sortCompanies(array,order,parameter));
    }
    let component = <div>WHOOPS! something went wrong</div>   

    return(
        <div>
            <div>Tutaj pojawi się opis </div>
            {!companies ? (component):(< Table paginator={paginator} disp={changeSorting} companiesData={companies}/>)}
        </div>
    )
}
)