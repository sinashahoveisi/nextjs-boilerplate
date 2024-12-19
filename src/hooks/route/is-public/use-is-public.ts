'use client';

import {usePathname} from 'next/navigation';
import {PUBLIC_ROUTES} from '@/configs/public-routes';

export const useIsPublicRoute = (): boolean | null => {
  const pathname = usePathname();

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  return isPublic;
};
