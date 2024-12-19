import clsx from 'clsx';
import {TextInput} from '@/components/text-input';
import type {IProfilePersonal} from './profile-personal.type';

export const ProfilePersonal: React.FC<IProfilePersonal> = ({className}) => {
  return (
    <section className={clsx('flex flex-col space-y-4 p-3 rounded-lg bg-zinc-100', className)}>
      <h2 className='text-md font-bold'>مشخصات فردی</h2>
      <div className='flex flex-row items-center gap-2'>
        <TextInput label='نام' />
        <TextInput label='نام خانوادگی' />
      </div>
      <TextInput label='شماره تماس' />
    </section>
  );
};
