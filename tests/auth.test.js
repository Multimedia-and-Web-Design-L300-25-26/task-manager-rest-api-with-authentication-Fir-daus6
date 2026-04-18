import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {

  const email = `user${Date.now()}@test.com`;

  it("should register a user", async () => {

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);

  }, 20000);

  it("should login user and return token", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

  }, 20000);

});