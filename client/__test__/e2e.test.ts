import { test, expect, type Page } from "@playwright/test"
const userTest = {
  username: "Tester",
  password: "1234",
}
const date = new Date()
  .toISOString()
  .replace(/-/g, "/")
  .replace(/:/g, "-")
  .replace("T", " ")
  .split(".")
  .shift()
const commentContent = "Comentario hecho en test e2e. Fecha: " + date
const TIMEOUT = 5000

const login = async (page: Page, password: string = userTest.password) => {
  // Obtén el input por su placeholder
  await page.getByPlaceholder("Username o email").fill(userTest.username)

  // Obtén el input por su placeholder
  await page.getByPlaceholder("Contraseña").fill(password)

  // Obtén el botón "Ingresar"
  await page.getByText("Ingresar").click()

  // timeout para esperar la respuesta
  await page.waitForTimeout(TIMEOUT)
}
// test.describe("Test E2E", () => {
test("Should Login", async ({ page }) => {
  // Yendo a tweeter
  await page.goto("/")

  // Validar si estamos en el login page
  const titleElement = page.getByText(
    /Proyecto de clon de twitter. Desafío de devchallenge.io/
  )
  const titleText = await titleElement.innerText()
  expect(titleText).toContain(
    "Proyecto de clon de twitter. Desafío de devchallenge.io"
  )

  login(page, userTest.password + "1")

  // Alerta de contraseña incorrecta
  const alertPasswordIncorrectElement = page.getByText(
    /Usuario o contraseña incorrecta/
  )
  const alertPasswordIncorrectText =
    await alertPasswordIncorrectElement.innerText()
  expect(alertPasswordIncorrectText).toContain(
    "Usuario o contraseña incorrecta"
  )

  // Insertando contraseña correcta
  login(page)

  // Alerta de contraseña incorrecta
  const alertLoggedElement = page.getByText(/Logeado/)
  const alertLoggedText = await alertLoggedElement.innerText()
  expect(alertLoggedText).toContain("Logeado")

  // // Ingresar al Home page
  const isHomeCurrent = await page.textContent('[aria-current="page"]')
  expect(isHomeCurrent?.includes("Inicio")).toEqual(true)

  await page.screenshot({
    path: "./__test__/screenshots/login.png",
  })
})

test("Should create a post", async ({ page }) => {
  await page.goto("/")

  login(page)

  // Ingresar al Home page
  const isHomeCurrent = await page.textContent('[aria-current="page"]')
  expect(isHomeCurrent?.includes("Inicio")).toEqual(true)

  // Crear tweet vació
  const createPostBtn = page
    .locator("form")
    .getByRole("button", { name: "Tweet" })
  expect(createPostBtn).toBeVisible()
  expect(createPostBtn).toHaveAttribute("type", "submit")
  await createPostBtn.click()

  // warning de post vació
  const warningElement = page.getByText(/Post vació/)
  const warningText = await warningElement.innerText()
  expect(warningText).toContain("Post vació")

  // Crear tweet
  await page.getByPlaceholder("¿Qué está pasando?").fill(commentContent)
  await createPostBtn.click()

  await page.waitForTimeout(TIMEOUT / 5)

  const posts = page.locator(".post")
  expect(await posts.count()).toBe(11)
  const newPostContent = await posts.nth(0).locator("main .content").innerText()
  expect(newPostContent).toContain(commentContent)

  await page.screenshot({
    path: "./__test__/screenshots/newPost.png",
  })
})

test("Should interact with a post", async ({ page }) => {
  await page.goto("/")

  login(page)

  // Ir a buscador
  const goSearchBtn = page.locator("nav ul [href='/search']")
  await goSearchBtn.click()

  await page.waitForTimeout(TIMEOUT / 5)

  // Presionar el filtro para que sea por creación
  const latestFilterBtn = page.locator(".filter__btn").nth(1)
  await latestFilterBtn.click()

  // Para saber si el btn esta activado
  expect(latestFilterBtn).toHaveClass(/active/)

  // Buscar el post creado en el test 2
  await page.locator("#search input").fill(commentContent.split(".")[0])
  await page.locator("#search button").click()

  await page.waitForTimeout(TIMEOUT)

  // Ver si los resultados son menores o iguales a 10
  const posts = page.locator(".post")
  expect(await posts.count()).toBeLessThanOrEqual(10)

  // Detectar el post
  const myPost = posts.nth(0)
  const myPostContent = await myPost.locator("main .content").innerText()
  expect(myPostContent).toContain(commentContent)

  // Dar Retweet, Like, y Save a nuestro posts
  const postInteractions = myPost.locator(".post-interactions__ctn button")
  for (let i = 1; i < 4; i++) {
    await postInteractions.nth(i).click()
    expect(postInteractions.nth(i)).toHaveClass("active")
  }

  // Dar Respuesta
  await myPost.locator(".create-reply__btn").click()

  await page.getByPlaceholder("¿Qué está pasando?").fill("Comentario por el tester")
  await page.waitForTimeout(TIMEOUT/5)
  await page.locator(".form-ctn [type='submit']").click()

  await page.waitForTimeout(TIMEOUT)

  const replyContent = await myPost.locator(".replies__ctn .reply__content p").innerText()
  expect(replyContent).toContain("Comentario por el tester")

  await page.screenshot({
    path: "./__test__/screenshots/searchPage.png",
  })
})
