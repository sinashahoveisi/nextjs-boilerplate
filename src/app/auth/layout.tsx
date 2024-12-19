export default function AuthLayout({children}: React.PropsWithChildren) {
  return (
    <div className='w-full h-dvh bg-gray-100'>
      <div className='flex-1'>{children}</div>
    </div>
  );
}
