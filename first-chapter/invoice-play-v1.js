
const invoices = require('./invoice.json')
// console.log(invoices[0].customer)
const invoice = invoices[0]
//    console.log(invoice.customer)
const plays = require('./play.json')
// console.log(plays)
function statement(invoice, plays) {
  //    console.log(invoice)
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf,play);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function amountFor(aPerformace, play){
  let result = 0;
  switch(play.type){
    case "tragedy":
      result = 40000;
      if(aPerformace.audience>30){
        result += 1000*(aPerformace.audience-30)
      }
      break;
    case "comedy":
      result = 30000;
      if(aPerformace.audience>20){
        result += 10000+500*(aPerformace.audience-20)
      }
      result += 300*aPerformace.audience;
      break;
    default:
      throw new Error(`unknow type ${play.type}`)
  }
  return result
}

console.log(statement(invoice, plays))

