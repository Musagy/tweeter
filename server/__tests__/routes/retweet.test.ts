import { userTest, API } from "../../src/utils/defaultData"

describe("Creación de nuevos retweets", () => {
  it("debe crear un nuevo retweet y actualizar el contador de retweets", async () => {
    // Obtener token de usuario
    const { userToken } = await userTest()

    // Hacer solicitud GET a /post/{id} para obtener información del post original
    const originalPost = await API.get("/post/12")

    // Determinar el número de retweet a crear
    const retweetNumber = originalPost.body._count.retweets + 1

    // Hacer solicitud POST a /post/create
    const res = await API.post("/post/create")
      .send({ content: `retweet de test N°${retweetNumber}`, retweetId: "12" })
      .set("Authorization", `Bearer ${userToken}`)

    // Verificar que la respuesta tenga estado 201
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Post creado")
    expect(res.body.post.retweetId).toBe(12)
    expect(res.body.post.content).toBe(`retweet de test N°${retweetNumber}`)
  })
})