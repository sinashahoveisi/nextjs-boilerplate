'use client';

import {ToastContainer, Flip} from 'react-toastify';

export const ToastProvider: React.FC = () => {
  return (
    <ToastContainer
      position='bottom-right'
      theme='dark'
      autoClose={2000}
      newestOnTop
      limit={2}
      rtl
      hideProgressBar
      className='text-xs'
      toastClassName='m-0 p-0'
      transition={Flip}
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      draggable
    />
  );
};
