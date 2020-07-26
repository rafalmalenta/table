
export default function swapArrayElements(e1,e2) {
    let temporary = Object.assign({},e1);

    e1.name= e2.name
    e1.id = e2.id;
    e1.city = e2.city;
    e1.totalIncome = e2.totalIncome;
    e1.avgIncome = e2.avgIncome;
    e1.lastMonthIncome = e2.lastMonthIncome;

    e2.name= temporary.name
    e2.id = temporary.id;
    e2.city = temporary.city;
    e2.totalIncome = temporary.totalIncome;
    e2.avgIncome = temporary.avgIncome;
    e2.lastMonthIncome = temporary.lastMonthIncome;



}
