export function quickSort(objectsArray,order,parameter) {
    return new Promise((resolve,reject)=>{
        objectsArray = Object.values(objectsArray);
        for(let i=0; objectsArray.length >i; i++){
            for(let j=0;objectsArray.length >j; j++){
                console.log("ordadder",order)
                if(order == "ASC"){
                    if(objectsArray[i][parameter] < objectsArray[j][parameter]){
                        let temporary = objectsArray[i][parameter];
                        objectsArray[i][parameter] = objectsArray[j][parameter];
                        objectsArray[j][parameter] = temporary;
                    }
                }
                else if(order == "DESC"){
                    if(objectsArray[i][parameter] < objectsArray[j][parameter]){
                        let temporary = objectsArray[i][parameter];
                        objectsArray[i][parameter] = objectsArray[j][parameter];
                        objectsArray[j][parameter] = temporary;
                    }
                }
            }
        }
        resolve (objectsArray);
    })
}