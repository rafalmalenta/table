import Company from "../models/Company";
export function bubbleSort(objectsArray, order, parameter) {
    return new Promise((resolve,reject)=>{
        let arrayFromObject = Object.values(objectsArray);
        let nowa = [];
        nowa = arrayFromObject.map((company:Company)=>{
            let z:Company={
                name:company.name,
                id: company.id,
                city: company.city,
                lastMonthIncome: company.lastMonthIncome,
                totalIncome: company.totalIncome,
                avgIncome: company.avgIncome
            }
            return z;
        }) //deep Immutable

        for(let i=0; nowa.length >i; i++){
            for(let j=0;nowa.length >j; j++){
                if(order == "ASC"){
                    if(nowa[i][parameter] < nowa[j][parameter]){
                        let temporary = nowa[i];
                        nowa[i] = nowa[j];
                        nowa[j] = temporary;
                    }
                }
                else if(order == "DESC"){
                    if(nowa[i][parameter] > nowa[j][parameter]){
                        let temporary = nowa[i];
                        nowa[i] = nowa[j];
                        nowa[j] = temporary;
                    }
                }
                if(nowa.length * nowa.length<=(j+1)*(i+1)) {
                    resolve(nowa);
                }
            }
        }

    })
}