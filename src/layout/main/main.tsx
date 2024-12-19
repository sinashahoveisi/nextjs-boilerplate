'use client';

export function MainLayout({children}: React.PropsWithChildren) {
  return <div className='flex-1 pb-4 w-full max-w-screen-2xl mx-auto overflow-auto px-6'>{children}</div>;
}
