import { formatCurrency } from "../script/utile/money.js";

describe('test suite: formatcurrency' , ()=>{
    it('convert cents in to dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    } )

    it('work with 0' , ()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    })
    it('round up to nearest cent' , ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
})