export interface IAuthentication {
  token: string;
  refreshToken: string;
  expiration: string | Date;
}
