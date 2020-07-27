import Company from "../models/Company";
import swapArrayElements from "./swapArrayElements";
export function bubbleSort(objectsArray, order, parameter) {
    return new Promise((resolve,reject)=>{
        let companyArray = Object.values(objectsArray);

        for(let i=0; companyArray.length >i; i++){
            for(let j=0; companyArray.length >j; j++){
                if(order == "ASC"){
                    if(companyArray[i][parameter] < companyArray[j][parameter])
                        swapArrayElements(companyArray[i],companyArray[j])
                }
                else if(order == "DESC"){
                    if(companyArray[i][parameter] > companyArray[j][parameter])
                        swapArrayElements(companyArray[i],companyArray[j])
                }
            }
        }
        resolve(companyArray);
    })
}