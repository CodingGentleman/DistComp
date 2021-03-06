// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('SimQi_login', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('SimQi_login', async function() {
    await driver.get("http://localhost:8080/")
    // 3 | click | name=username |  | 
    await driver.findElement(By.name("username")).click()
    // 4 | type | name=username | herbert | 
    await driver.findElement(By.name("username")).sendKeys("herbert")
    // 5 | click | css=.fluid |  | 
    await driver.findElement(By.css(".fluid")).click()
  })
})
