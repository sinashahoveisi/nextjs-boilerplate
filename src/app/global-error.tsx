'use client';
import 'assets/styles/main.scss';

import {ErrorPage} from '@/components/error-page';

export default function GlobalError({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <html lang='fa' dir='rtl'>
      <body>
        <ErrorPage
          code={500}
          title='اتفاقی رخ داده است.'
          description='ما همواره در حال رفع مشکلات اپلیکیشن هستیم. میتوانید اپلیکیشن را مجدد بارگذاری کنید یا دو صورت پابرجا بودن مشکل با پشتیبانی تماس حاصل فرمایید.'
          resetText='بارگذاری مجدد'
          onReset={reset}
        />
      </body>
    </html>
  );
}
