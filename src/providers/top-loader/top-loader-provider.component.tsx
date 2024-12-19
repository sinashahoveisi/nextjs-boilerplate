'use client';

import NextTopLoader from 'nextjs-toploader';

export const TopLoaderProvider: React.FC = () => {
  return <NextTopLoader showSpinner={false} height={1} color='red' />;
};
