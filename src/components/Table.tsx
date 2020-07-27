import React from 'react';
import Company from "../models/Company";
import { useState, useEffect } from 'react';
import ViewSetter from './ViewSetter'
import {Filterer, stringFilter, rangeFilter } from "../models/FilterStrategy";
import Paginator from "./Paginator";
import { connect } from 'react-redux';
import { bubbleSort } from '../Service/bubbleSort'
import {fetchCompanies } from "../redux/CompaniesActions";
import TableRow from "./TableRow";

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
    const [idValue,setIdValue] = useState([1,300]);
    const [incomeValue,setIncomeValue] = useState([215000,320000]);
    const [incomeAvgValue,setAvgIncomeValue] = useState([4000,9000]);
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
        console.log("all data",filteredValue)
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
    useEffect(() =>{
        if(companiesArray)
        filterAll(companiesArray)
    },[filters]);

    const klik = () => {
        let currentFilters = filters;
        currentFilters.push({type:"string",parameter:"name",string:"Howel"})
        setFilters([...currentFilters]);
    }
    //console.log(filters);

    let filteredAndPaginated = companiesData.slice(((page-1)*perPage),page*perPage);

    if(filteredAndPaginated){
        row = filteredAndPaginated.map((company:Company)=>{
            return <TableRow key ={company.id} company={company} />
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

    function setFilterRange(event,parameter,range) {
        event.preventDefault();
        let currentFilters = filters;
        let filterWithGivenParameterIndex = 0;
        filterWithGivenParameterIndex = currentFilters.findIndex((filter)=>{
            if (filter.parameter == parameter) {
                return filter
            }
        })
        if(filterWithGivenParameterIndex < 0)
            currentFilters.push({type:"range",parameter,range: range});
        else {
           currentFilters[filterWithGivenParameterIndex].range =  range
        }
        setFilters([...currentFilters]);
    }
    //console.log(Math.ceil(companiesData.length/perPage))
    return(
        <div>
            <ViewSetter />
            <table >
                <thead>
                    <tr>
                        <th >
                            <span>id <span onClick={()=>sort(companiesData,"id")}>sort</span></span>
                            <form name="filterID" onSubmit={(e)=>setFilterRange(e,"id",{min:idValue[0],max:idValue[1]})}>
                                <input value={idValue[0]} min="1" max="300" onChange={(e)=>setIdValue([e.target.value,idValue[1]])} type="range" name="idmin" placeholder="filter"/>
                                <label for="idmin" >min value {idValue[0]} </label>
                                <input value={idValue[1]} min="1" max="300" onChange={(e)=>setIdValue([idValue[0],e.target.value])} type="range" name="idmax" placeholder="filter"/>
                                <label for="idmax" >max value {idValue[1]}</label>
                                <input type="submit" value="filter id" />
                            </form >

                        </th>
                        <th onClick={()=>sort(companiesData,"city")}>city</th>
                        <th onClick={()=>sort(companiesData,"name")}>company name</th>
                        <th >
                            <span onClick={()=>sort(companiesData,"totalIncome")}>total income <span onClick={()=>sort(companiesData,"id")}>sort</span></span>
                            <form name="filterIncome" onSubmit={(e)=>setFilterRange(e,"totalIncome",{min:incomeValue[0],max:incomeValue[1]})}>
                                <input value={incomeValue[0]} min="215000" max="320000" onChange={(e)=>setIncomeValue([e.target.value,incomeValue[1]])} type="range" name="idmin" placeholder="filter"/>
                                <label for="incomedmin" >min value {incomeValue[0]} </label>
                                <input value={incomeValue[1]} min="215000" max="320000" onChange={(e)=>setIncomeValue([incomeValue[0],e.target.value])} type="range" name="idmax" placeholder="filter"/>
                                <label for="incomemax" >max value {incomeValue[1]}</label>
                                <input type="submit" value="filter income" />
                            </form >
                        </th>
                        <th >
                            <span >Average income <span onClick={()=>sort(companiesData,"avgIncome")}>sort</span></span>
                            <form name="filterAvgIncome" onSubmit={(e)=>setFilterRange(e,"avgIncome",{min:incomeAvgValue[0],max:incomeAvgValue[1]})}>
                                <input value={incomeAvgValue[0]} min="4000" max="9000" onChange={(e)=>setAvgIncomeValue([e.target.value,incomeAvgValue[1]])} type="range" name="idmin" placeholder="filter"/>
                                <label for="incomedmin" >min value {incomeAvgValue[0]} </label>
                                <input value={incomeAvgValue[1]} min="4000" max="9000" onChange={(e)=>setAvgIncomeValue([incomeAvgValue[0],e.target.value])} type="range" name="idmax" placeholder="filter"/>
                                <label for="incomemax" >max value {incomeAvgValue[1]}</label>
                                <input type="submit" value="filter income" />
                            </form >
                        </th>
                        <th onClick={()=>sort(companiesData,"lastMonthIncome")}>last month income</th>
                    </tr>
                </thead>
                <tbody >
                   {row}
                </tbody>

            </table>
            <Paginator lastPage={Math.ceil(companiesData.length/perPage)}  />
        </div>
    )
}
)