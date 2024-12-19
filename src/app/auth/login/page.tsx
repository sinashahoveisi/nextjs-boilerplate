'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useUser} from 'hooks/user/user';
import {TextInput} from 'components/text-input';
import {useLoginMutate} from 'services/api/auth/use-login-mutate';
import {PAGE_ROUTES} from 'configs/page-routes';
import {loginValidationSchema, type LoginSchemaType} from 'validations/login';
import type {IAuthentication} from 'types/auth';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const backUrl = searchParams.get('backUrl');

  const user = useUser();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginValidationSchema)
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

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>به حساب خود وارد شوید</h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <TextInput
            type='tel'
            className='text-center'
            label='شماره موبایل'
            {...register('phoneNumber')}
            error={errors?.phoneNumber}
          />
          <TextInput
            label='رمزعبور'
            type='password'
            className='text-center'
            {...register('password')}
            error={errors.password}
          />
        </form>
      </div>
    </div>
  );
}
