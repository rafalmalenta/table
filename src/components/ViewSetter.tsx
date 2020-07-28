import React from 'react'
import { changeWiev } from '../redux/PaginatorActions';
import { connect } from 'react-redux'
export default connect(
    (store)=>{
        return {
            companiesStore: store.CompaniesReducer,
            paginator: store.PaginatorReducer,
        }
    },
)(

  function(props){

      let e:Event;
    function setView(e) {
        props.dispatch(changeWiev(e.target.value))

    }
    return(
        <div class="header">
            <span>Pick amount of recors per page</span>
            <select defaultValue={10} onChange={(ev)=>setView(ev)}>
                <option value="5">5</option>
                <option value="10" >10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>

    )
}
)