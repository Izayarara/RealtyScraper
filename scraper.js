const puppeteer = require('puppeteer-extra');
const puppeteerExtraPluginStealth = require('puppeteer-extra-plugin-stealth');
const randomUserAgent = require('random-useragent');
const fs = require('fs');
const path = require('path');

puppeteer.use(puppeteerExtraPluginStealth());

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ],
    timeout: 0, // Disable default timeout
  });

  const page = await browser.newPage();
  await page.setUserAgent(randomUserAgent.getRandom());
  await page.setViewport({ width: 1280, height: 800 });

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 300);
      });
    });
  }

  // Define target URL using environment variable for flexibility
  const BASE_URL = process.env.BASE_URL || 'https://www.example.com';
  const targetPage = 5; // Define page number to scrape
  console.log(`Scraping page ${targetPage} from ${BASE_URL}...`);

  let listings = [];

  try {
    await page.goto(`${BASE_URL}/pg-${targetPage}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.waitForSelector('body', { timeout: 5000 });
    await autoScroll(page);
    await page.waitForSelector('.listing-card', { timeout: 30000 }); // Generic class

    const data = await page.$$eval('.listing-card', (cards) => {
      return cards.map((el) => {
        const getText = (selector) => el.querySelector(selector)?.innerText.trim() || null;
        const getAttribute = (selector, attr) => el.querySelector(selector)?.getAttribute(attr) || null;

        let link = getAttribute('a.listing-link', 'href');
        if (link && !link.startsWith('http')) {
          link = new URL(link, window.location.origin).href;
        }

        return {
          price: getText('.price'),
          address: getText('.address-line-1') + ', ' + getText('.address-line-2'),
          beds: getText('.beds span.value'),
          baths: getText('.baths span.value'),
          sqft: getText('.sqft span.value'),
          lot_size: getText('.lot-size span.value'),
          link: link
        };
      });
    });

    console.log(`Scraped ${data.length} listings from page ${targetPage}`);
    listings.push(...data);
  } catch (error) {
    console.log(`Error on page ${targetPage}: ${error.message}`);
  }

  await browser.close();
  const filePath = path.join(__dirname, 'scrapedData.json');
  fs.writeFileSync(filePath, JSON.stringify(listings, null, 2));
  console.log(`Scraping complete. Data saved to ${filePath}`);
})();
