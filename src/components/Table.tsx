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
import DualRangeInput from "./DualRangeInput";

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
    const [avgIncomeValue,setAvgIncomeValue] = useState([4000,9000]);
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
                            <DualRangeInput min={1} max={300}setFilterRange={setFilterRange} parameter="id" value={idValue} setValue={setIdValue}/>
                        </th>
                        <th onClick={()=>sort(companiesData,"city")}>city</th>
                        <th onClick={()=>sort(companiesData,"name")}>company name</th>
                        <th >
                            <span>total income <span onClick={()=>sort(companiesData,"totalIncome")}>sort</span></span>
                            <DualRangeInput min={215000} max={320000} setFilterRange={setFilterRange} parameter="totalIncome" value={incomeValue} setValue={setIncomeValue}/>
                        </th>
                        <th >
                            <span >Average income <span onClick={()=>sort(companiesData,"avgIncome")}>sort</span></span>
                            <DualRangeInput min={4000} max={9000} setFilterRange={setFilterRange} parameter="avgIncome" value={avgIncomeValue} setValue={setAvgIncomeValue}/>
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