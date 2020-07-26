import * as React from "react";
import Table from '../components/Table';
import { connect } from 'react-redux';

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

    let component = <div>WHOOPS! something went wrong</div>   

    return(
        <div>
            <div>Tutaj pojawi się opis </div>
            {!companies ? (component):(< Table  />)}
        </div>
    )
}
)