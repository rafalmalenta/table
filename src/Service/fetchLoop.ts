
import fetchIncome from "./fetchIncome";
import Company from "../models/Company";

export default function fetchLoop(companies:Array<Company>){
    return new Promise((resolve,reject)=>{
        let counter=0;
        companies.forEach((company:Company)=>{
            fetchIncome(company.id).then(res=>{
                company.setIncome(res.total,res.avg,res.lastMonth);
                counter++;
                if (counter == companies.length)
                    resolve(true)
            })
        })
    })
}