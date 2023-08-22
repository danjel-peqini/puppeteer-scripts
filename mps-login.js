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
    const page = await browser.newPage();
    await page.goto('https://mps-ui-staging.3i-solutions.net/dashboard');
        const input = await page.waitForSelector("input")
        await input.type( process.argv[2], {delay: 100})
        await page.keyboard.press('Tab')
        await page.type("p-password", process.argv[3], {delay: 100})
        await page.keyboard.press("Enter", {delay: 2000})

})();
