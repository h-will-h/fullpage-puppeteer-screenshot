const mergeImg = require("merge-img");

const doMergeImg = (images, fName) =>
  new Promise((resolve, reject) => {
    try {
      mergeImg(images, { direction: true }).then(img => {
        if (fName) {
          img.write(fName, () => resolve(img));
        } else {
          resolve(img);
        }
      });
    } catch (e) {
      reject(e);
    }
  });

module.exports = async (page, opts = {}) => {
  if (!page || !page.screenshot) {
    throw new Error("You need to pass a puppeteer page instance!");
  }
  if (opts.fullPage) {
    console.warn("options.fullPage will be ignored.");
  }
  if (opts.clip) {
    console.warn("options.clip will be overridden.");
  }

  // get the height of the page.
  const pageHeight = await page.evaluate(() => {
    var body = document.body,
      html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  });

  const viewport = page.viewport();

  /*
   * Take screenshots in viewport-sized increments to avoid having puppeteer
   * resize the window to get a full page screnshot.
   */

  const images = [];

  for (
    let currentHeight = 0;
    currentHeight <= pageHeight;
    currentHeight += viewport.height
  ) {
    let height = viewport.height;
    let y = currentHeight;

    /*
     * When there's less than one full view left, take a smaller screenshot.
     * It's possible this might cause a display bug.
     */
    if (currentHeight + height > pageHeight) {
      height = pageHeight - currentHeight;
      y = pageHeight - height;
    }

    if (height == 0) {
      break;
    }

    const screenshotOpts = {
      fullPage: false,
      clip: {
        x: 0,
        y,
        width: viewport.width,
        height
      }
    };

    images.push(await page.screenshot({ ...opts, ...screenshotOpts }));
  }

  //Stitch together the images we captured with merge-img.
  const img = await doMergeImg(images, opts.path);

  return img;
};
