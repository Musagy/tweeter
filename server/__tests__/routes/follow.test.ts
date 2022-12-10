import { userTest, API } from "../../src/utils/defaultData"

describe("Follow Routes test", () => {
  test("should follow or unfollow a user", async () => {
    const { userToken } = await userTest()
    const res = await API.post("/user/follow")
      .send({
        followTo: 1,
      })
      .set("Authorization", userToken)
    expect(res.status).toBe(200)
    expect(res.text).toContain("siques al usuario 1")
  })
})
