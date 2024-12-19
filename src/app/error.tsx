'use client';

import {ErrorPage} from '@/components/error-page';

export default function Error({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <ErrorPage
      code={500}
      title='اتفاقی رخ داده است.'
      description='ما همواره در حال رفع مشکلات اپلیکیشن هستیم. میتوانید اپلیکیشن را مجدد بارگذاری کنید یا دو صورت پابرجا بودن مشکل با پشتیبانی تماس حاصل فرمایید.'
      resetText='بارگذاری مجدد'
      onReset={reset}
    />
  );
}
