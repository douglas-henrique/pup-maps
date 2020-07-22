const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');


console.log('Welcome to google maps coordinates searcher 🤖🔍'); 

async function searchAddress(){
    const browser = await puppeteer.launch({ headless: true }); // initiate invisible chromium
    const page = await browser.newPage();
    const address = readlineSync.question('Enter an address: ') || 'Avenida Paulista'; //ask for a address

    const someUrl = `https://www.google.com/maps/place/${address}`;
    await page.goto(someUrl);

    console.log('Loading address informations...')
    await page.waitFor(5000); //google maps changes url so we have to wait about 5 seg to get informations on url

    let pageUrl = page.url(); // get entire url 
    let latitude = pageUrl.split("@")[1].split(",")[0]
    let longitude = pageUrl.split("@")[1].split(",")[1] 

    console.log('Coordinates found! 🥳')

    console.log("Latitude: " + latitude)
    console.log("Longitude: " + longitude)

    await browser.close();

}
searchAddress();