import React from 'react';

export default function Table(props){
   
    let details = props.companiesData.companies;
    console.log("s",details);  
    let row;
    if(details){
        let array = Object.values(details);//castuje objekt na tablice
        //console.log(array)
        row = array.map((company)=>{
            return <tr key ={company.id}>                
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.city}</td>                
                </tr>;
               
        })
        console.log(row)
    }
    
    return(
        <table>
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