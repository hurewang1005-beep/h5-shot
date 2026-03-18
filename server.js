import express from "express"
import puppeteer from "puppeteer"

const app = express()

app.get("/shot", async (req, res) => {
  const url = req.query.url

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  })

  const page = await browser.newPage()

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000
  })

  await page.setViewport({ width: 375, height: 2000 })

  const file = Date.now() + ".png"

  await page.screenshot({
    path: file,
    fullPage: true
  })

  await browser.close()

  res.json({
    image_url: "/" + file
  })
})

app.use(express.static("./"))

app.listen(process.env.PORT || 3000)
