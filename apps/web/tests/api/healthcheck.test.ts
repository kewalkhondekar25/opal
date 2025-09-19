import { describe, it, expect, beforeAll, afterAll } from "vitest";
import next from "next";
import { createServer } from "http";
import { HttpClient } from "../utils/http";

let server: any;

beforeAll(async () => {
  const app = next({ dev: true });
  await app.prepare();
  const handle = app.getRequestHandler();
  server = createServer((req, res) => handle(req, res));
  await new Promise<void>((resolve) => server.listen(3000, resolve));
});

afterAll(() => {
  server.close();
});

describe("Health Check Endpoint", () => {
  it("GET /api/health-check returns 200", async () => {
    const client = new HttpClient("http://localhost:3000/api");
    const { status, data } = await client.get({ path: "/health-check" });

    expect(status).toBe(200);
    expect(data).toStrictEqual({
      success: true,
      statusCode: 200,
      message: "Health check passed successfully",
    });
  });
});
