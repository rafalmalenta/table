import React from 'react';

export default function DualRangeInput(props){
    let value = props.value;
    let setValue = props.setValue;
    let setFilterRange = props.setFilterRange;
    let parameter = props.parameter;
    let min = props.min;
    let max = props.max;

    return(
        <form name="filterID" onSubmit={(e)=>setFilterRange(e,parameter,{min:value[0],max:value[1]})}>
            <input value={value[0]} min={min} max={max} onChange={(e)=>setValue([e.target.value,value[1]])} type="range" name="idmin" placeholder="filter"/>
            <label for="idmin" >min value {value[0]} </label>
            <input value={value[1]} min={min} max={max} onChange={(e)=>setValue([value[0],e.target.value])} type="range" name="idmax" placeholder="filter"/>
            <label for="idmax" >max value {value[1]}</label>
            <input type="submit" value="filter id" />
        </form >
    )
}