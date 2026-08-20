'use client';
import 'assets/styles/main.css';

import {ErrorPage} from '@/components/error-page';

export default function GlobalError({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <html lang='en' dir='ltr' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ErrorPage
          code={500}
          title='Something went wrong.'
          description="We're working to fix the issue. You can reload the app, or contact support if the problem continues."
          resetText='Reload'
          onReset={reset}
        />
      </body>
    </html>
  );
}
