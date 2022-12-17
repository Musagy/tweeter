import { userTest, API } from "../../src/utils/defaultData"

describe("Save Routes test", () => {
  it("should save a post in the user favorites", async () => {
    const { userToken } = await userTest()
    const postId = "12"

    const res = await API.post(`/save/${postId}`)
      .set("Authorization", userToken)
      .send()

    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(eval(`/Has (guardado|quitado) el post de Id ${postId}( de tus guardados)?/`));
  })
})
