import request from 'supertest';
import { createServer } from 'http';
import next from 'next';

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

it("Checks health of server", async () => {
    const res = await request("http://localhost:3000").get("/api/health-check");
    expect(res.status).toBe(200);
    expect(res.body).toBe({
        success: true,
        statusCode: 200,
        message: "Health check passed successfully"
    });
});