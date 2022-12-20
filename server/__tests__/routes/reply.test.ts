import { userTest, API } from "../../src/utils/defaultData"

describe("Creación de nuevos posts", () => {
  it("debe crear una nueva respuesta y actualizar el contador de respuestas", async () => {
    // Obtener token de usuario
    const { userToken } = await userTest()

    // Hacer solicitud GET a /post/{id} para obtener información del post padre
    const parentPost = await API.get("/post/12")

    // Determinar el número de respuesta a crear
    const replyNumber = parentPost.body._count.replies + 1

    // Hacer solicitud POST a /post/create
    const res = await API.post("/post/create")
      .send({ content: `respuesta de test N°${replyNumber}`, parentId: "12" })
      .set("Authorization", `Bearer ${userToken}`)

    // Verificar que la respuesta tenga estado 201
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Post creado")
    expect(res.body.post.parentId).toBe(12)
    expect(res.body.post.content).toBe(`respuesta de test N°${replyNumber}`)
  })
})