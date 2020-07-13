import React from 'react';
import Company from "../models/Company";
import {quickSort} from "../Service/quickSort";

export default function Table(props){
    let details = props.companiesData.companies;

    let row;
    console.log(props)
    function dispacz(){
        props.disp()
    }

    if(details){
        let array = Object.values(details);//castuje objekt na tablice
        row = array.map((company:Company)=>{
            return <tr key ={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>
                <td>{company.totalIncome}</td>
                <td>{company.avgIncome}</td>
                <td>{company.lastMonthIncome}</td>
                </tr>;
        })
    }

    // else {
    //     return <tr >
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //     </tr>;
    // }
    console.log("det",details)
    //console.log("row",row)

    return(
        <table onClick={dispacz}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>company name</th>
                    <th>city</th>
                    <th>total income</th>
                    <th>average income</th>
                    <th>last month income</th>
                </tr>       
            </thead>
            <tbody>                
               {row}
            </tbody>
          
        </table>
    )
}