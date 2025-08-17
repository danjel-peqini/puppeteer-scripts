// import {environment} from "./environmet/environment";
const puppeteer = require("puppeteer");
const fs = require("fs");
const request_client = require('request-promise-native');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--start-maximized']

    });
    console.log(process.argv)
    for(let i = 0; i<process.argv[5]; i++){
        const page = await browser.newPage();
        await page.goto(process.argv[2]);
            const input = await page.waitForSelector("input")
            await input.type( process.argv[3], {delay: 100})
            await page.keyboard.press('Tab')
            await page.type("p-password", process.argv[4], {delay: 100})
            await page.keyboard.press("Enter", {delay: 2000})
            // await page.waitForNavigation()

            await delay(4000)
            await page.evaluate(() => {
                window.localStorage.clear()
            })

            console.log("SUCCESS " + i)

    }

})();
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

 //node mps-login.js "https://fpp-ui.3i-solutions.net/" "admin" "asdasdasd" 50
 //node mps-login.js "https://fpp.kqz.gov.al/" "admin" "password" 50
//  node mps-login.js "http://127.0.0.1:4200/" "danjel.peqini@3i-solutions.net" "password" 50