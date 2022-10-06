import { ReactNode, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ScrollToBottom = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const bottom = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={className}>
        {children}
        <div className="scroll-bottom" ref={bottom}></div>
      </div>
      <button
        onClick={() => bottom?.current?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute right-3 bottom-3"
      >
          <div className="popup-btn cursor-pointer rounded-full bg-grey-dark hover:bg-grey-light transition-all">
            <FaChevronDown className="fill-grey-light hover:fill-grey-dark transition-all text-xl w-10 h-10 p-2.5" />
          </div>
      </button>
    </>
  );
};

export default ScrollToBottom;
