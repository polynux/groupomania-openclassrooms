import { ReactNode } from 'react';

const Modal = ({ children, show }: { children: ReactNode; show: boolean }) => {
  return (
    <div
      className={
        'modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 w-full h-full z-1000 flex justify-center items-center' +
        (show ? '' : ' hidden')
      }
    >
      <div className="absolute w-full h-full top-0 left-0 bg-grey opacity-40"></div>
      <div className="relative rounded-lg shadow dark:bg-grey-dark p-4">{children}</div>
    </div>
  );
};

export default Modal;