import axios from 'axios';
export default class Company{
    name: string;
    id: number;
    city: string;
    totalIncome: number;
    avgIncome: number;
    lastMonthIncome: number;
    constructor (name, id, city){
        this.id = id;
        this.name = name;
        this.city = city;
    }
    setIncome?(totalIncome,avgIncome,lastMonthIncome){
        this.totalIncome=totalIncome;
        this.avgIncome= avgIncome;
        this.lastMonthIncome = lastMonthIncome;
    }

}