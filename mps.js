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
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:4200/dashboard');
        const input = await page.waitForSelector("input")
        await input.type( "danjel.peqini@3i-solutions.net", {delay: 100})
        await page.keyboard.press('Tab')
        await page.type("p-password", "password", {delay: 100})
        await page.keyboard.press("Enter", {delay: 2000})
        setTimeout(() => {
            console.log("execution start")

            editCategorizationItem(page)
        }, 2000)

})();

async function navigateToCategorization(page) {

    page.on('requestfinished',async request => {
        if(request.url().endsWith('inspectionType') && request.resourceType() === 'xhr'){
            const response = await request.response()
            await fs.writeFileSync('categorization.json', await response.buffer())
        }
    })
    const module = await page.waitForSelector("#categorization")
    if(module){
        await module.click()
        const createButton = await page.waitForSelector('button#CREATE_INSPECTION_TYPE')
        await createButton?.click()
        const name  = await page.waitForSelector('#name')
        await name?.type("test me puppeteer", {delay: 200})
        await page.keyboard.press("Enter", {delay: 200})

    }
}

async function editCategorizationItem(page){
    let options
    page.on('requestfinished',async request => {
        if(request.url().includes('inspectionType') && request.resourceType() === 'xhr' && request.method() === 'Get'){
            const response = await request.response()
            await fs.writeFileSync('categorization.json', await response.buffer())
            options = await response.buffer()
        }

        if(request.url().endsWith('inspectionType') && request.method() === 'Put'){
            const response = await request.response()
            console.log(request.url())
        }
    })
    const module = await page.waitForSelector("#categorization")
    await module.click()

    const editIcon = await  page.waitForSelector('#edit-0')
    editIcon.click()
    const name  = await page.waitForSelector('#name')
    await clear(page, '#name')
    await name.type('test editimi me puppeter 1', {delay: 200, clear: true});
    await page.keyboard.press("Enter", {delay: 200})


}

async function clear(page, selector){
    await page.evaluate(selector => {
        document.querySelector(selector).value = "";
    }, selector);
}
