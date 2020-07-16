import React from 'react';
export default function Paginator(props){

    return(
        <div>{props.paginator.recordsPerPage} {props.paginator.page}</div>
    )

}