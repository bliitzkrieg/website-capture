const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/render');

    const target = await page.$$('.exportable');
    const binary = await target[0].screenshot();
    await browser.close();

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(binary, 'binary');
});

app.listen(3000, () => console.log('App Started.'));