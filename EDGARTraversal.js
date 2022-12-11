
//const LinkFormat = `https://www.sec.gov/edgar/search/#/q=${Ticker}&dateRange=all&filter_forms=4&page=${pageNumber}`

//use pupeteer to traverse to the xml links and get the data and place it into a postgres database

//import puppeteer
const express = require('express');
const puppeteer = require('puppeteer');
let page;
(async () => {
  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('https://www.sec.gov/edgar/search/#/q=MSFT&dateRange=all&filter_forms=4&page=1');
  await page.screenshot({path: 'example.png'});
  const data = await xmlGetter();
  await browser.close();
})();

async function xmlGetter() {
    // loop through each tr element
    let data = await page.evaluate(() => {
      const names = [100];
      const dates = [100];
      const links = [100];
      names[i] = (document.querySelectorAll('.entity-name').innerText);
      console.log(document.querySelector('.entity-name').innerText);
      const tds = Array.from(document.querySelectorAll('.entity-name'))
      console.log(document.querySelectorAll('.preview-file').innerText);
      return tds.map(td => td.innerText)
    });
    console.log(data);
    //get name and date of the filing
    //click on the link
    //click on open filing
    //get the xml file at the xml link and save it to the database along with name and date of filing
}
