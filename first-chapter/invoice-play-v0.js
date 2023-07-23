
const invoices = require('./invoice.json')
// console.log(invoices[0].customer)
const invoice = invoices[0]
// console.log(invoice.customer)
const plays = require('./play.json')
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredit = 0;
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format;
    let result = `Statement for ${invoice.customer}\n`
    for(let perl of invoice.performances){
       let thisAmount = 0
       const play = plays[perl.playID]
       switch(play.type){
        case "tragedy":
            thisAmount = 40000;
            if(perl.audience>30){
                thisAmount += 1000*(perl.audience-30)
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if(perl.audience>20){
                thisAmount += 10000 + 500*(perl.audience-20)
            }
            thisAmount += 300*perl.audience
            break;
        default:
            throw new Error(`unknow type ${play.type}`)
       }
       volumeCredit += Math.max(perl.audience-30, 0)
       if(play.type=="comedy") volumeCredit += Math.floor(perl.audience/5)
       result += `${play.name}:${format(thisAmount/100)} (${perl.audience} seats)\n`
       totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`
    result += `You earned ${volumeCredit} credits\n`
    return result
}

console.log(statement(invoice, plays))

