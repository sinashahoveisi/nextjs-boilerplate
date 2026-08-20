import {Geist, Geist_Mono} from 'next/font/google';
import localFont from 'next/font/local';
import {MainProvider} from 'providers/main/main-provider';
import {METADATA} from '@/configs/metadata';
import {VIEWPORT} from '@/configs/viewport';
import 'assets/styles/main.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const mainFont = localFont({
  variable: '--font-main',
  display: 'swap',
  src: [
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-ExtraLight.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../assets/fonts/vazir/Vazirmatn-FD-Black.woff2',
      weight: '900',
      style: 'normal'
    }
  ]
});

export const viewport = VIEWPORT;

export const metadata = METADATA;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      dir='ltr'
      className={`${geistSans.variable} ${geistMono.variable} ${mainFont.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body className='min-h-full flex flex-col' suppressHydrationWarning>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
