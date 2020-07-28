export default interface FilterStrategy {
    filter(array,parameter,value)
}

export class stringFilter implements FilterStrategy{
    public filter(array,parameter,value) {
        let filtered
        if (!array[1][parameter]) {
            filtered = array;
        }
        else {
            filtered = array.filter((company: {}) => {
                    let nameUpperCase = company[parameter].toUpperCase();
                if (nameUpperCase.includes(value.toUpperCase()))
                    return company;
            })
        }
        return filtered;
    }
}
export class rangeFilter implements FilterStrategy{
    public filter(array,parameter,range) {
        let filtered = array.filter((company)=>{
            if(company[parameter] >= range.min && company[parameter] <= range.max){
                return company;
            }
        })
        return filtered
    }
}

export class Filterer  {
    private strategy:FilterStrategy ;
    constructor(strategy:FilterStrategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy:FilterStrategy){
        this.strategy = strategy
    }
    public doFilter(array:[],parameter:string,value:string){
        return this.strategy.filter(array,parameter,value);
    }
}
