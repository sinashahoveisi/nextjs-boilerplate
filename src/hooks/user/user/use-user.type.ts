import type {IUserStore} from '@/stores/user/user-store.type';
import type {IUserInfo} from '@/types/user';

export interface IUseUser {
  data: IUserInfo;
  isMySelf(): boolean;
  isLogin: boolean;
  token: IUserStore['token'];
  login: IUserStore['setToken'];
  logout: IUserStore['removeToken'];
}
