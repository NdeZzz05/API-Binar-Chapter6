const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  describe("GET /api/v1/users", () => {
    // Tes case - Resource not found
    it("should return a list of user", async () => {
      const response = await request(app).get("/api/v1/user");
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Resource not found");
    });
  });
});
