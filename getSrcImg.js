const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  try {
    // Initialize Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Specify books first page url
    await page.goto("https://rmanga.app/martial-peak/chapter-3689/all-pages", {
      timeout: 0,
    });

    // Evaluate/Compute the main task:
    // Here, we convert the Nodelist of images returned from the DOM into an array, then map each item and get the src attribute value, and store it in 'src' variable, which is therefore returned to be the value of 'issueSrcs' variable.
    const imgSrc = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(
        ".chapter-detail-novel-big-image img"
      );
      const imgArray = [...nodeList];
      const list = imgArray.map((img) => ({
        src: img.src,
      }));

      return list;
    });

    // Persist data into data.json file
    fs.writeFileSync("./data.json", JSON.stringify(imgSrc));
    console.log("File is created!");

    // End Puppeteer
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
