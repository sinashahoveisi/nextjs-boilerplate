'use client';

import {ErrorPage} from '@/components/error-page';

export default function GlobalError({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <ErrorPage
      code={404}
      title='این صفحه پیدا نشد'
      description='متأسفیم، ما نمی توانیم این صفحه را پیدا کنیم. در صفحه اصلی چیزهای زیادی برای کاوش خواهید یافت'
      resetText='صفحه اصلی'
      onReset={reset}
    />
  );
}
