const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
        
const Port = 8000;
//init express
const app = express();
let i = 0;
//for i from 0 to 30


//we will need an array for the 

let out  = [];

function getEnvironmentData(url){
    
    
    url = this.url;
    
axios(url)
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const dates = [];
        //filing dates
        $('.f_date', html).each(function(){
           const FilingDate =  $(this).text();
           dates.push(FilingDate);
        })
        //Ticker
        const tickers = [];
        $('.iss_sym', html).each(function(){
            const ticker = $(this).text();
            tickers.push(ticker);
        });
        //security
        const securities = [];
        $('.iss_name', html).each(function(){
            const security = $(this).text();
            securities.push(security);
        });
        //rep names
        const reps = [];
        $('.rep_name', html).each(function(){
            const rep = $(this).text();
            reps.push(rep);
        });
        //relationship to company
        const relationships = [];
        $('.rel', html).each(function(){
            const relationship = $(this).text();
            relationships.push(relationship);
        });
        //purchase or sale watch out I think the class name will change for sales
        const transactions = [];
        $('.tran_code', html).each(function(){
            const transaction = $(this).text();
            transactions.push(transaction);
        });
        //number of shares
        const shares = [];
        $('.sh', html).each(function(){
            const share = $(this).text();
            shares.push(share);
        });
        //price per share
        const prices = [];
        $('.pr', html).each(function(){
            const price = $(this).text();
            prices.push(price);
        });
        let dataHolder = [];
        for(let i = 0; i < dates.length; i++){
            
            output.push((line =  ({
                "date": dates[i].toLowerCase(),
                "ticker": tickers[i],
                "security": securities[i].toLowerCase(),
                "rep": reps[i].toLowerCase(),
                "relationship": relationships[i].toLowerCase(),
                "transaction": transactions[i].toLowerCase(),
                "shares": shares[i],
                "price": prices[i]
            })));
            
            
        }
        
    
        
    }).catch((err) => console.log(err));
     //console.log(out)
     //console.log(out);
    // return out;
     
}
const output = [];
for(let i = 0; i < 29; i++){
    url = (`https://www.dataroma.com/m/ins/ins.php?t=y2&po=1&am=0&sym=&o=fd&d=d&L=${i}`)
    //console.log(url);
    getEnvironmentData(url);
    //console.log(out);
 }
 
setTimeout(function(){
    //make delay 20 seconds
    console.log(output);
    //convert each object in output to a json file and export to a folder
    for(let i = 0; i < output.length; i++){
        let json = JSON.stringify(output[i]);
        fs.writeFile(`dataJsonFiles1/data${i}.json`, json, 'utf8', function(err){
            if(err){
                console.log(err);
            }
        });
    }
}, 2000);

//now lets impoer alpha vantagae api
//https://www.alphavantage.co/documentation/#daily
//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
const key = "G9GURQX8KA46QPIX"











    









app.listen(Port, () => console.log(`Server running on port ${Port}`));
//the server will listen to the port 8000

//let the scraping begin
