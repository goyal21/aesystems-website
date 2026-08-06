import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1680, height: 1200 } });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const info = await page.evaluate(() => {
  const grid = document.querySelector("#see-it-in-action .grid");
  const cs = getComputedStyle(grid);
  const rects = [...grid.children].map(c => c.getBoundingClientRect());
  return {
    gridTemplateColumns: cs.gridTemplateColumns,
    width: grid.getBoundingClientRect().width,
    className: grid.className,
    rects: rects.map(r => ({ x: r.x, width: r.width })),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
