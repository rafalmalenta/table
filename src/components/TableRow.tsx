import React from 'react';

export default function Paginator(props){
    let company = props.company;
    return(
        <tr >
            <td>{company.id}</td>
            <td>{company.city}</td>
            <td>{company.name}</td>
            <td>{company.totalIncome}</td>
            <td>{company.avgIncome}</td>
            <td>{company.lastMonthIncome}</td>
        </tr>
)


}