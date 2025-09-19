import { HttpClient } from "./http";

export class IntegrationHarness {
  public http: HttpClient;
  public baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.API_BASE_URL || "http://localhost:3000/api";
    this.http = new HttpClient(this.baseUrl);
  }

  async init() {
    // could add auth headers or setup here later
    return { http: this.http };
  }
}
