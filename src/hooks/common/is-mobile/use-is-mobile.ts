'use client';

import {useSyncExternalStore} from 'react';
import {debounce} from '@/utils/debounce';

const getIsMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor;
  const mobileDevice = /android|iphone|ipad|mobile/i.test(userAgent);
  return mobileDevice || window.innerWidth < 768;
};

export const useIsMobile = (): boolean | null => {
  return useSyncExternalStore(
    (onStoreChange) => {
      const handleResize = debounce(onStoreChange, 250);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    },
    getIsMobile,
    () => null
  );
};
