import { ReactNode, useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ScrollToBottom = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const bottom = useCallback((node: HTMLDivElement) => {
      node.scrollIntoView({ behavior: 'smooth' });
      setNode(node);
  }, []);

  return (
    <>
      <div className={className}>
        {children}
        <div className="scroll-bottom" ref={bottom}></div>
      </div>
      <button
        onClick={() => node?.scrollIntoView({ behavior: 'smooth' })}
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
