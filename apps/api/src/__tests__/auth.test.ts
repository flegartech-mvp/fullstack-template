import { describe, it, expect, beforeAll } from "vitest";

process.env.JWT_SECRET = "test-secret-at-least-32-characters-long-xx";

type AuthModule = typeof import("../middleware/auth.js");
let auth: AuthModule;

beforeAll(async () => {
  auth = await import("../middleware/auth.js");
});

describe("token helpers", () => {
  it("signs and verifies a round-trip token", () => {
    const token = auth.signToken("user-123");
    expect(auth.verifyToken(token)).toMatchObject({ userId: "user-123" });
  });

  it("rejects a tampered token", () => {
    const token = auth.signToken("user-123");
    expect(() => auth.verifyToken(token + "x")).toThrow();
  });
});
