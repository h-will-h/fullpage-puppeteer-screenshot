# Full page Puppeteer Screenshots

A way to take full page [Puppeteer](https://pptr.dev/) screenshots that results in more accurate-looking screenshots.

It avoids visual bugs that happen when using puppeteer's native `fullPage` option by taking a series of viewport-sized screenshots using puppeteers's screenshot clipping functionality and stitching them together using [merge-img](https://github.com/preco21/merge-img#readme).

## Example

```
const puppeteer = require("puppeteer");
const screenshot = require("fullpage-puppeteer-screenshot");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://google.com", {
    waitUntil: "networkidle2"
  });

  await screenshot(page, {
    path: "foo.png"
  });

  await browser.close();
})();
```
