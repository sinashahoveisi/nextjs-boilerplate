import {MainProvider} from 'providers/main/main-provider';
import localFont from 'next/font/local';
import {METADATA} from '@/configs/metadata';
import {VIEWPORT} from '@/configs/viewport';
import 'assets/styles/main.scss';

const mainFont = localFont({
  variable: '--font-main',
  src: [
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Thin.woff2',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-UltraLight.woff2',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Black.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-ExtraBlack.woff2',
      weight: '950',
      style: 'normal'
    },
    {
      path: '../assets/fonts/iran-yekan/IRANYekanFaNum-Heavy.woff2',
      weight: '1000',
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
    <html lang='fa' dir='rtl'>
      <body className={mainFont.variable}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
