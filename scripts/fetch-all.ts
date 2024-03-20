import { Browser, Page, firefox } from "playwright";
import { parseError } from "./error-parse";
import "dotenv/config";
import { AnyscanPuller } from "./AnyscanPuller";

async function openBrowser(): Promise<{ browser: Browser; page: Page }> {
  const browser = await firefox.launch({ headless: false });
  // Create a new browser context with viewport options
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();
  return { browser, page };
}
function closeBrowser(browser: Browser) {
  return browser.close();
}

void (async () => {
  try {
    const { browser, page } = await openBrowser();
    const etherscanPuller = new AnyscanPuller({
      baseUrl: "https://etherscan.io",
      directoryName: "etherscan",
    });
    await etherscanPuller.fetchEtherscan(page);
    await closeBrowser(browser);
  } catch (error) {
    parseError(error);
    process.exit(1);
  }
})();