import { test, expect } from "@playwright/test"
const userTest = {
  username: "Tester",
  password: "1234",
}

test("should login", async ({ page }) => {
  await page.goto("/")
  const date = new Date()
  await page.screenshot({
    path: "./__test__/screenshots/login-" + date + ".png",
  })
  expect(page).toHaveTitle(/Proyecto de clon de twitter. Desafío de devchallenge.io/)
})
