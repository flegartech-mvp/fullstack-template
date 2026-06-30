import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

// Must be set before the app (and its JWT helpers) are imported.
process.env.JWT_SECRET = "test-secret-at-least-32-characters-long-xx";
process.env.NODE_ENV = "test";

let app: import("express").Express;

beforeAll(async () => {
  const { createApp } = await import("../app.js");
  app = createApp();
});

describe("health + routing", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.timestamp).toBe("string");
  });

  it("unknown routes return a JSON 404", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });

  it("sets security headers via helmet", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });
});

describe("auth contract (no DB required)", () => {
  it("GET /api/auth/me without a token is 401", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Unauthorized" });
  });

  it("GET /api/auth/me with an invalid token is 401", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer not-a-real-token");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Invalid token" });
  });

  it("POST /api/auth/login with a malformed body is 400 (validation, not 500)", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: "nope" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
    expect(Array.isArray(res.body.issues)).toBe(true);
  });

  it("POST /api/auth/register rejects a short password with 400", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "a@b.com", name: "A", password: "short" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });
});

describe("posts authorization", () => {
  it("POST /api/posts without a token is 401", async () => {
    const res = await request(app).post("/api/posts").send({ title: "x" });
    expect(res.status).toBe(401);
  });

  it("PATCH /api/posts/:id without a token is 401", async () => {
    const res = await request(app).patch("/api/posts/abc").send({ title: "x" });
    expect(res.status).toBe(401);
  });

  it("DELETE /api/posts/:id without a token is 401", async () => {
    const res = await request(app).delete("/api/posts/abc");
    expect(res.status).toBe(401);
  });
});
