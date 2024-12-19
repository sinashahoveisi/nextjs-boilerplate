'use client';

import {useTranslation} from 'hooks/common/translation';
import {ErrorPage} from 'components/error-page';

export default function NotFoundError({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslation('Error');

  return (
    <ErrorPage
      code={404}
      title={t('pageNotFound')}
      description={t('notFoundMessage')}
      resetText={t('mainPage')}
      onReset={reset}
    />
  );
}
