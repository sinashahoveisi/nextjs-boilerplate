export default function AuthLayout({children}: React.PropsWithChildren) {
  return <div className='flex min-h-dvh w-full flex-col bg-black text-zinc-50'>{children}</div>;
}
