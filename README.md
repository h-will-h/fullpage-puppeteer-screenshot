# Full page Puppeteer Screenshots

A way to take full page [Puppeteer](https://pptr.dev/) screenshots that results in more accurate-looking screenshots.

It avoids visual bugs that happen when using puppeteer's native `fullPage` option by taking a series of viewport-sized screenshots using puppeteers's screenshot clipping functionality and stitching them together using [merge-img](https://github.com/preco21/merge-img#readme).

## Usage

### fullScreenshot(page[, options])

- `page` a Puppeteer [`page Object`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page) (required).
- `options` an Object (optional) matching Puppeteer's [screenshot options](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions). The `fullPage` and `clip` parameters will be overwritten.

## Example

```
const puppeteer = require("puppeteer");
const fullScreenshot = require("fullpage-puppeteer-screenshot");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://google.com", {
    waitUntil: "networkidle2"
  });

  await fullScreenshot(page, {
    path: "foo.png"
  });

  await browser.close();
})();
```
