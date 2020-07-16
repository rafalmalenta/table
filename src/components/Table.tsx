import React from 'react';
import Company from "../models/Company";
import { useState } from 'react';
import {sortCompanies} from "../redux/CompaniesActions";
import Paginator from "./Paginator";

export default function Table(props){
    let details = {...props.companiesData.companies};
    let perPage =props.paginator.recordsPerPage;
    let page = props.paginator.page;
    let row;
    const [parameterSorting,setParameter] = useState("")
    let array = Object.values({...details});//castuje objekt na tablice
    let filtered = array;

    let filteredAndPaginated = filtered.slice(((page-1)*perPage),page*perPage);
    console.log(filteredAndPaginated)
    function dispacz(array,parameter){
        if(parameter == parameterSorting){
            props.disp(array,"DESC",parameter);
            setParameter("");
        }
        else {
            props.disp(array, "ASC", parameter);
            setParameter(parameter);
        }
    }
    if(filteredAndPaginated){
        row = filteredAndPaginated.map((company:Company)=>{
            return <tr key ={company.id}>
                <td >{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>{company.totalIncome}</td>
                <td>{company.avgIncome}</td>
                <td>{company.lastMonthIncome}</td>
                </tr>;
        })
    }
    return(
        <div>
            <table >
                <thead>
                    <tr>
                        <th onClick={()=>dispacz(array,"id")}>id</th>
                        <th onClick={()=>dispacz(array,"name")}>company name</th>
                        <th onClick={()=>dispacz(array,"city")}>city</th>
                        <th onClick={()=>dispacz(array,"totalIncome")}>total income</th>
                        <th onClick={()=>dispacz(array,"avgIncome")}>average income</th>
                        <th onClick={()=>dispacz(array,"lastMonthIncome")}>last month income</th>
                    </tr>
                </thead>
                <tbody>
                   {row}
                </tbody>

            </table>
            <Paginator lastPage={Math.ceil(array.length/perPage)} paginator={props.paginator} />
        </div>
    )
}