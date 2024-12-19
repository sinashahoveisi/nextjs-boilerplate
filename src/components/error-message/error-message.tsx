import type {IErrorMessage} from './error-message.type';

export const ErrorMessage: React.FC<IErrorMessage> = ({text}) => {
  if (!text) return null;
  return <span className='mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500'>{text}</span>;
};
