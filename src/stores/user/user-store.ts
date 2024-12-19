import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import type {IUserStore} from './user-store.type';

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token, refreshToken) => set({token, refreshToken}),
      removeToken: () => set({token: null, refreshToken: null})
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
