const puppeteer = require('puppeteer');

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.nettiauto.com/yritys/2267640/vaihtoautot');
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  const getCarsLinks = await page.evaluate(() => {
    const cars = Array.from(document.querySelectorAll('.listbox_auto'));
    const links = cars.map((car) => ({
      link: car.querySelector('.heading a').getAttribute('href'),
    }));
    return links;
  });

  console.log(getCarsLinks);

  await browser.close();
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 2000);
    });
  });
};

main();
