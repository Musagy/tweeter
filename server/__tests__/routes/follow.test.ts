import { userTest, API } from "../../src/utils/defaultData"

describe("Follow Routes test", () => {
  test("should follow or unfollow a user", async () => {
    const { userToken } = await userTest()
    const userId = 1

    const res = await API.post(`/user/follow/${userId}`)
      .set("Authorization", userToken)
      .send()

    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(eval(`/Ahora( ya no)? sigues al usuario ${userId}/`))
  })
})
