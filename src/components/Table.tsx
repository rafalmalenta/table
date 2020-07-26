import React from 'react';
import Company from "../models/Company";
import { useState, useEffect } from 'react';
import ViewSetter from './ViewSetter'
import {Filterer, stringFilter, rangeFilter } from "../models/FilterStrategy";
import Paginator from "./Paginator";
import { connect } from 'react-redux';
import { bubbleSort } from '../Service/bubbleSort'
import {fetchCompanies } from "../redux/CompaniesActions";

export default connect(
    (store)=>{
        return {
            companies: store.CompaniesReducer,
            paginator: store.PaginatorReducer,
        }
    },
)(
function Table(props){
    let details = {...props.companies.companies};
    let perPage = props.paginator.recordsPerPage;
    let page = props.paginator.page;
    let row;
    const [parameterSorting,setParameter] = useState("");
    const [companiesData,setCompaniesData] = useState([]);
    const [filters,setFilters] = useState([]);
    let companiesArray:Array<any> = Object.values({...details});//castuje objekt na tablice
    useEffect(() => {
        props.dispatch(fetchCompanies());
    },[]);
    useEffect(() => {
        if(companiesArray.length>=0)
            filterAll(companiesArray);
        else
            setCompaniesData(companiesArray);
    },[props.companies.companies]);

    function filterAll(array){
        let filteredValue = array;
        filters.forEach((filter)=>{
            if(filter.type == "string") {
                let cFil = new Filterer(new stringFilter());
                filteredValue = cFil.doFilter(filteredValue,filter.parameter,filter.string);
            }
            else if(filter.type == "range"){
                let cFil = new Filterer(new rangeFilter());
                filteredValue = cFil.doFilter(filteredValue,filter.parameter, filter.range);
            }
        });
        setCompaniesData(filteredValue);
    }
    useEffect(() =>filterAll(companiesData),[filters]);

    const klik = () => {
        let currentFilters = filters;
        currentFilters.push({type:"string",parameter:"name",string:"Howel"})
        setFilters([...currentFilters]);
    }
    //console.log(filters);

    let filteredAndPaginated = companiesData.slice(((page-1)*perPage),page*perPage);

    if(filteredAndPaginated){
        row = filteredAndPaginated.map((company:Company)=>{
            return <tr key ={company.id}>
                <td >{company.id}</td>
                <td>{company.city}</td>
                <td>{company.name}</td>
                <td>{company.totalIncome}</td>
                <td>{company.avgIncome}</td>
                <td>{company.lastMonthIncome}</td>
                </tr>;
        })
    }
    function sort(array,parameter){
        if(parameter == parameterSorting){
            bubbleSort(array,"DESC",parameter).then(result=>setCompaniesData(result));
            setParameter("");
        }
        else {
            bubbleSort(array,"ASC",parameter).then(result=>setCompaniesData(result))
            setParameter(parameter);
        }
    }
    return(
        <div>
            <ViewSetter />
            <table >
                <thead>
                    <tr>
                        <th onClick={()=>sort(companiesData,"id")}>id</th>
                        <th onClick={()=>sort(companiesData,"city")}>city</th>
                        <th onClick={()=>sort(companiesData,"name")}>company name</th>
                        <th onClick={()=>sort(companiesData,"totalIncome")}>total income</th>
                        <th onClick={()=>sort(companiesData,"avgIncome")}>average income</th>
                        <th onClick={()=>sort(companiesData,"lastMonthIncome")}>last month income</th>
                    </tr>
                </thead>
                <tbody onClick={()=>klik()}>
                   {row}
                </tbody>

            </table>
            <Paginator lastPage={Math.ceil(companiesData.length/perPage)}  />
        </div>
    )
}
)