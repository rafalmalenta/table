import Company from "../models/Company";
export default function swapArrayElements(array,index1,index2) {
    let temporary = array[index1];
    array[index1] = array[index2];
    array[index2] = temporary;
    //console.log(element1,element2)
}