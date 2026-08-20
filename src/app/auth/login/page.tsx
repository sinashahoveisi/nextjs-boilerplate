'use client';

import {Suspense, useSyncExternalStore} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useUser} from 'hooks/user/user';
import {useTranslation} from 'hooks/common/translation';
import {TextInput} from 'components/text-input';
import {useLoginMutate} from 'services/api/auth/use-login-mutate';
import {PAGE_ROUTES} from 'configs/page-routes';
import {loginValidationSchema, type LoginSchemaType} from 'validations/login';
import type {IAuthentication} from 'types/auth';

const emptySubscribe = () => () => undefined;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslation('Auth');
  const backUrl = searchParams.get('backUrl');
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const login = useLoginMutate({
    onSuccess: (data: IAuthentication) => {
      user.login(data?.token, data?.refreshToken);
      router.replace(backUrl || PAGE_ROUTES.HOME);
    }
  });

  const onSubmit = (body: LoginSchemaType) => {
    const data = {username: body?.phoneNumber, pass: body?.password};
    login.mutate({body: data, queryParams: data});
  };

  const isLoading = isSubmitting || login.isPending;

  return (
    <div className='flex flex-1 flex-col items-center justify-center px-6 py-12'>
      <div className='w-full max-w-sm'>
        <div className='mb-10 flex flex-col items-center gap-6 text-center'>
          <Link href={PAGE_ROUTES.HOME} className='inline-flex'>
            <Image
              className='invert h-5 w-[100px]'
              src='/next.svg'
              alt='Next.js logo'
              width={100}
              height={20}
              priority
            />
          </Link>
          <div className='space-y-2'>
            <h1 className='text-3xl font-semibold tracking-tight text-zinc-50'>{t('login')}</h1>
            <p className='text-base leading-7 text-zinc-400'>{t('loginPage')}</p>
          </div>
        </div>

        <form
          data-testid='login-form'
          data-hydrated={hydrated ? 'true' : 'false'}
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-5'
          noValidate
          method='post'>
          <TextInput
            type='tel'
            label={t('phoneNumber')}
            autoComplete='tel'
            {...register('phoneNumber')}
            error={errors?.phoneNumber}
            inputClassName='rounded-full border-white/15 bg-zinc-950 text-zinc-50 focus-within:border-zinc-50'
            className='text-zinc-50 placeholder:text-zinc-500'
          />
          <TextInput
            type='password'
            label={t('password')}
            autoComplete='current-password'
            {...register('password')}
            error={errors.password}
            inputClassName='rounded-full border-white/15 bg-zinc-950 text-zinc-50 focus-within:border-zinc-50'
            className='text-zinc-50 placeholder:text-zinc-500'
          />

          <button
            type='submit'
            disabled={isLoading}
            className='flex h-12 w-full items-center justify-center rounded-full bg-zinc-50 px-5 text-base font-medium text-zinc-950 transition-colors hover:bg-[#ccc] disabled:cursor-not-allowed disabled:opacity-60'>
            {isLoading ? '...' : t('login')}
          </button>
        </form>

        <p className='mt-8 text-center text-sm text-zinc-500'>
          <Link href={PAGE_ROUTES.HOME} className='text-zinc-50 transition-colors hover:text-zinc-300'>
            ← {t('backToHome')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
