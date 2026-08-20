'use client';

export function MainLayout({children}: React.PropsWithChildren) {
  return <div className='flex min-h-full flex-1 flex-col'>{children}</div>;
}
