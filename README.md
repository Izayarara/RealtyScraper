# Real Estate Listings Scraper

## Overview
This script is a web scraper designed to extract real estate listings from publicly available web pages. It uses Puppeteer with stealth plugins to minimize detection and ensure smooth scraping. The extracted data includes:

- **Price**
- **Address**
- **Number of Beds**
- **Number of Baths**
- **Square Footage**
- **Lot Size**
- **Listing Link**

The results are saved in a structured JSON format (`scrapedData.json`) for easy use in data analysis or real estate market research.

## Features
✅ Uses Puppeteer Extra with stealth plugins for improved anonymity.  
✅ Implements randomized user agents to mimic human behavior.  
✅ Introduces delays and scrolling to reduce detection risks.  
✅ Extracts structured real estate data dynamically.  
✅ Saves the scraped data in a JSON file for further processing.  
✅ Configurable target URL through environment variables for flexibility.  

## Installation
### Clone this repository:
```bash
git clone https://github.com/Izayarara/RealtyScraper.git
cd RealEstateScraper
```

### Install dependencies:
```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth random-useragent
```

## Usage
### Set the target website:
The scraper is designed to work with multiple real estate websites. You can set the base URL using an environment variable:
```bash
export BASE_URL=https://example.com
```
Alternatively, you can manually edit the script and replace `https://example.com` with your desired target website.

### Run the script:
```bash
node scraper.js
```
The script will navigate to multiple pages, scrape real estate listings, and save the extracted data in `scrapedData.json`.

## Sample Output
```json
[
  {
    "price": "$450,000",
    "address": "123 Main St, Springfield, IL",
    "beds": "3",
    "baths": "2",
    "sqft": "1,800",
    "lot_size": "0.25 acres",
    "link": "https://example.com/listing/123"
  },
  {
    "price": "$620,000",
    "address": "456 Oak Dr, Chicago, IL",
    "beds": "4",
    "baths": "3",
    "sqft": "2,200",
    "lot_size": "0.5 acres",
    "link": "https://example.com/listing/456"
  }
]
```

## Legal & Ethical Considerations
This script is intended for educational and research purposes only. Ensure that your usage complies with the terms of service of the website you are scraping. Always obtain permission before scraping non-public or proprietary data.

## Contributing
Feel free to fork this project and submit pull requests with improvements or additional features!

## License
This project is licensed under the MIT License, allowing modification and distribution with attribution.

---
🚀 **Happy Scraping!**

