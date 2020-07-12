
export default class Company{
    name: string;
    id: number;
    city: string;
    income: number;
    avgIncome: number;
    lastMonthIncome: number;
    constructor (name, id, city){
        this.id = id;
        this.name = name;
        this.city = city;
    }
    setDetails(name,id,city):void{

    }
}