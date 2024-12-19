'use client';

import {useTranslation} from 'hooks/common/translation';
import {ErrorPage} from 'components/error-page';

export default function Error({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslation('Error');

  return (
    <ErrorPage
      code={500}
      title={t('somethingHasHappened')}
      description={t('resetOrContactSupportMessage')}
      resetText={t('reload')}
      onReset={reset}
    />
  );
}
