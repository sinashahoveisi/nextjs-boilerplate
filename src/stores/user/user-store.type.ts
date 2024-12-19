export interface IUserStore {
  token?: string | null;
  refreshToken?: string | null;
  setToken: (token: string, refreshToken: string) => void;
  removeToken: () => void;
}
