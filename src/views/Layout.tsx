import * as React from "react";
import Table from '../components/Table';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {fetchCompanies } from "../redux/CompaniesActions";
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
    let readyToRender = false;
    let component = <div>Fetching data</div>
    useEffect(()=>{
        props.dispatch(fetchCompanies())
    },[])
    if(props.companies.companies){
        readyToRender=true;
    }
    return(
        <div>
            <div>Tutaj pojawi się opis </div>
            {!readyToRender ? (component):(< Table  />)}
        </div>
    )
}
)