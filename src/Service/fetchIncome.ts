import axios from "axios";

export default function fetchIncome(id){
    return new Promise((resolve,reject)=>{
        axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`)
            .then((response)=>{
                let currentMonth = new Date().getMonth()+1;
                let currentYear = new Date().getFullYear();
                let acumulated = response.data.incomes.reduce((acumulator, currentValue, index)=>{
                    acumulator.total = (parseFloat(acumulator.total) + parseFloat(currentValue.value)).toFixed(2);
                    if(currentValue.date.split("-")[1] == currentMonth&& currentValue.date.split("-")[0]== currentYear){
                        console.log("last month", currentValue.date)
                        acumulator.lastMonth = (parseFloat(acumulator.lastMonth) + parseFloat(currentValue.value)).toFixed(2);
                    }
                    return acumulator
                }, {total:0,lastMonth:0})
                acumulated.avg = (acumulated.total/response.data.incomes.length).toFixed(2);

                resolve(
                    acumulated
                );
            })
            .catch(()=>reject())
    })

}