type Request = {
  path: string;
  query?: Record<string, string>;
  body?: unknown;
  headers?: Record<string, string>;
};

type Response<T> = {
  data: T;
  status: number;
};

export class HttpClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, headers?: Record<string, string>) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.headers = headers ?? {};
  }

  private async request<T>(method: string, req: Request): Promise<Response<T>> {
    const url = `${this.baseUrl}${req.path}${
      req.query ? "?" + new URLSearchParams(req.query).toString() : ""
    }`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...this.headers, ...req.headers },
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    return {
      status: res.status,
      data: (await res.json()) as T,
    };
  }

  public get<T>(req: Request) {
    return this.request<T>("GET", req);
  }
}
