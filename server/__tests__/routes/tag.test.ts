import { userTest, API } from "../../src/utils/defaultData"

describe("POST /post/create", () => {
  it("should create a new post and return the tags", async () => {
    const { userToken } = await userTest()

    const response = await API.post("/post/create")
      .set("Authorization", userToken)
      .send({
        content: "Testeo de #tags",
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("message", "Post creado")
    expect(response.body.post).toHaveProperty("tags")
    expect(response.body.post.tags).toEqual([{ tagId: "tags" }])
  })
})
