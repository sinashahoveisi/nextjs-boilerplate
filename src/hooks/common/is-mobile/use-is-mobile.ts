'use client';

import {useState, useEffect} from 'react';
import {debounce} from '@/utils/debounce';

export const useIsMobile = (): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const mobileDevice = /android|iphone|ipad|mobile/i.test(userAgent);

    // Initial check based on user-agent and window width
    setIsMobile(mobileDevice || window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const debounceHandleResize = debounce(handleResize, 250);

    // Add resize event listener
    window.addEventListener('resize', debounceHandleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, []);

  return isMobile;
};
