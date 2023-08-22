const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--start-maximized']

    });
    const page = await browser.newPage();
    await page.goto('https://fpp-ui.3i-solutions.net/dashboard');
    // await page.click("button", {delay: 2000})
    setTimeout(async () => {

        await page.type("input", "kandidat", {delay: 200})
        await page.keyboard.press('Tab')
        await page.type("p-password", "asdasdasd", {delay: 200})
        await page.keyboard.press("Enter", {delay: 2000})
        // await page.waitForNavigation()
        await page.click("button", {delay: 3000})
        let options = [];

        const dropdown = await page.$("p-dropdown")
        await dropdown.click()
        console.table(dropdown)
        const option = await page.$("p-dropdownitem")
        console.log(option)
        await option?.click()
        const button = await page.waitForSelector('button[label="Krijo Raportin"]', {
            visible: true,
            disable: false
        })
        await button.click()

        // await page.click("[label=Krijo Raportin]", {delay: 600})
        // await dropdown.select()
    }, 5000);
    // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

    // Type into search box

    // Wait and click on first result

//   await browser.close();
})();
