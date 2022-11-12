import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ScrollToBottom = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  const bottom = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
      setNode(node);
    }
  }, []);

  useMemo(() => {
    if (node) {
      const container = document.querySelector('main > div');
      container?.addEventListener('DOMNodeInserted', (e) => {
        if (!(e.target as Element).classList.contains('message')) return;
        if (node?.getBoundingClientRect() && node.getBoundingClientRect().y >= window.innerHeight) {
          node?.scrollIntoView({ behavior: 'smooth' });
        }
      });

      container?.querySelectorAll('.message > div > img').forEach((img) => {
        img.addEventListener('load', () => {
          if (node?.getBoundingClientRect() && node.getBoundingClientRect().y >= window.innerHeight) {
            node?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShow(false);
          } else {
            setShow(true);
          }
        },
        { threshold: 1 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [node]);

  return (
    <>
      <div className={className}>
        {children}
        <div className="scroll-bottom" ref={bottom}></div>
      </div>
      <button
        onClick={() => node?.scrollIntoView({ behavior: 'smooth' })}
        className={'absolute right-3 ' + (show ? 'animate-show bottom-3 block' : 'animate-hide hidden bottom-0 -mb-10')}
        name="bottom"
      >
        <span className="popup-btn block cursor-pointer rounded-full shadow-lg shadow-slate-900 bg-grey-dark hover:bg-grey-light transition-all">
          <FaChevronDown className="fill-grey-light hover:fill-grey-dark transition-all text-xl w-10 h-10 p-2.5" />
        </span>
        <span className="sr-only">Descendre en bas de la page</span>
      </button>
    </>
  );
};

export default ScrollToBottom;
