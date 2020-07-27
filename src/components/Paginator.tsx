import React from 'react';
import { connect }from 'react-redux'
import { changePage } from '../redux/PaginatorActions';
export default connect(
    (store)=>{
        return {
            companiesStore: store.CompaniesReducer,
            paginator: store.PaginatorReducer,
        }
    },
)(
function Paginator(props){
    let page = props.paginator.page;
    let last = props.lastPage;
    let content = "";
    if(props.companiesStore.companies) {
        content = <div class="centered">
            {page > 3 && <button onClick={() => props.dispatch(changePage(1))}> First</button>}
            {page > 2 && <button onClick={() => props.dispatch(changePage(page - 2))}>{page - 2}</button>}
            {page > 1 && <button onClick={() => props.dispatch(changePage(page - 1))}>{page - 1}</button>}
            {<span>{page}</span>}
            {page <= last - 1 && <button onClick={() => props.dispatch(changePage(page + 1))}>{page + 1}</button>}
            {page <= last - 2 && <button onClick={() => props.dispatch(changePage(page + 2))}>{page + 2}</button>}
            {page <= last - 3 && <button onClick={() => props.dispatch(changePage(last))}> Last</button>}
        </div>
    }

    return(
        <div class="row">
            <div class="centered">
                {content}
            </div>
        </div>
    )
}
)