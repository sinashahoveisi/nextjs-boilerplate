import {Spinner} from '@/components/loading/spinner';

export const PageLoading: React.FC = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  );
};
