import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Modal from './Modal';

const Image = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);

  const onError = () => {
    if (!error) {
      setError(true);
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
              src={error ? 'https://via.placeholder.com/150' : src}
              alt={alt}
              onError={onError}
              className={className}
            />
          </Modal>
        </div>
      )}
      <img
        src={error ? 'https://via.placeholder.com/150' : src}
        alt={alt}
        onError={onError}
        className={className}
        onClick={onClick}
      />
    </>
  );
};

export default Image;
