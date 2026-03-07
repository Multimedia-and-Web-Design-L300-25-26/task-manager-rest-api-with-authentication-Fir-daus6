import request from "supertest";
import app from "../src/app.js";

describe("Task Routes", () => {
  let token;

  beforeAll(async () => {

    const email = `task${Date.now()}@test.com`;

    // register user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Task User",
        email,
        password: "123456"
      });

    // login user
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "123456"
      });

    token = res.body.token;
  }, 30000);

  it("should not allow access without token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });

  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "Testing"
      });

    expect(res.statusCode).toBe(201);
  });

  it("should get user tasks only", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});