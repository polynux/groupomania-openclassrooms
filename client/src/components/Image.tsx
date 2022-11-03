import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from './Modal';

const Image = ({ src, alt, className, onError }: { src: string; alt?: string; className?: string, onError?: (err: any) => void }) => {
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);

  const handleError = (err: any) => {
    if (!error) {
      setError(true);
    }
    if (onError) {
      onError(err);
    }
  };

  const onClick = () => {
    setModal(true);
  };

  return (
    <>
      {modal && (
        <div onClick={() => setModal(false)}>
          <Modal show={modal} className="w-auto flex flex-col items-end max-w-[80%]">
            <FaTimes
              className="fill-grey-light hover:fill-grey-dark hover:bg-grey-light cursor-pointer transition-all text-xl w-10 h-10 p-2.5 rounded-md"
              onClick={() => setModal(!modal)}
            />
            <img
              src={(error && onError === undefined) ? 'https://via.placeholder.com/150' : src}
              alt={alt}
              onError={handleError}
              className={className}
            />
          </Modal>
        </div>
      )}
      <img
        src={(error && onError === undefined) ? 'https://via.placeholder.com/150' : src}
        alt={(error && onError === undefined) ? 'Image absente' : alt}
        onError={handleError}
        className={className}
        onClick={onClick}
      />
    </>
  );
};

export default Image;
