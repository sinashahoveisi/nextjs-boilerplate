import {MainLayout} from '@/layout/main';

export default function MobileLayout({children}: React.PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
