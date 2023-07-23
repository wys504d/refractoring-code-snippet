
const invoices = require('./invoice.json')
// console.log(invoices[0].customer)
const invoice = invoices[0]
//    console.log(invoice.customer)
const plays = require('./play.json')
// console.log(plays)
function statement(invoice, plays) {
  //    console.log(invoice)
  // let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredit()} credits\n`;
  return result;
}

function amountFor(aPerformace){
  let result = 0;
  switch(playFor(aPerformace).type){
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
      throw new Error(`unknow type ${playFor(aPerformace).type}`)
  }
  return result
}

function playFor(aPerformace){
  return plays[aPerformace.playID]
}

function volumeCreditFor(aPerformace){
  let result = 0;
  result += Math.max(aPerformace.audience - 30, 0);
  if ("comedy" === playFor(aPerformace).type) result += Math.floor(aPerformace.audience / 5);
  return result
}

function usd(aNumber){
  return new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber/100);
}

function totalVolumeCredit(){
  let result = 0;
  for(let perf of invoice.performances){
    result += volumeCreditFor(perf)
  }
  return result
}

function totalAmount(){
  let result = 0;
  for(let perl of invoice.performances){
    result += amountFor(perl)
  }
  return result;
}

console.log(statement(invoice, plays))

