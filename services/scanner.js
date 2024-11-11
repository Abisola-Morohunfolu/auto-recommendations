const puppeteer = require("puppeteer");

const scanAndSaveIssueImages = async (scanUrl, selectors) => {
  const browser = await puppeteer.launch({ headless: "shell" });
  const page = await browser.newPage();

  try {
    await page.goto(scanUrl, { waitUntil: "networkidle0" });

    const screenshotPromises = selectors.map(async (selector) => {
      const element = await page.waitForSelector(selector);
      const fileName = `images/${selector.split(" ").join("_")}.png`;
      await element.screenshot({ path: fileName });
      console.log(`Screenshot saved: ${fileName}`);
    });

    await Promise.all(screenshotPromises);
  } catch (error) {
    console.error("Error scanning and saving issue images:", error);
  } finally {
    await browser.close();
  }
};

scanAndSaveIssueImages("https://24lottos.com", [
  "#login_user",
  "#frmLogin > span:nth-child(3)",
]);
