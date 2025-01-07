export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * The API version of the api.
   */
  apiVersion: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}
