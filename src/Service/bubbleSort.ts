import Company from "../models/Company";
import swapArrayElements from "./swapArrayElements";
export function bubbleSort(objectsArray, order, parameter) {
    return new Promise((resolve,reject)=>{
        let arrayFromObject = Object.values(objectsArray);
        let nowa = arrayFromObject;

        for(let i=0; nowa.length >i; i++){
            for(let j=0;nowa.length >j; j++){
                if(order == "ASC"){
                    if(nowa[i][parameter] < nowa[j][parameter]){
                        swapArrayElements(nowa,i,j)
                    }
                }
                else if(order == "DESC"){
                    if(nowa[i][parameter] > nowa[j][parameter]){
                        swapArrayElements(nowa,i,j)
                    }
                }
                resolve(nowa);

            }
        }

    })
}