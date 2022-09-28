import { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import Modal from './Modal';

const PopupMessage = ({ id }: { id: string }) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        (show && !e.target.closest('.popup-btn')) ||
        (e.target.closest('.popup') && !e.target.closest('.popup-btn'))
      ) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClick);
  }, [id]);

  return (
    <>
      <div className="bg-grey-dark">
        <div
          className="popup-btn cursor-pointer rounded-full hover:bg-grey-light transition-all"
          onClick={() => setShow(!show)}
        >
          <FaEllipsisH className="fill-grey-light hover:fill-grey-dark transition-all text-xl w-10 h-10 p-2.5" />
        </div>
      </div>
      <div
        className={
          'popup absolute z-10 right-0 top-8 bg-grey-dark shadow-lg shadow-slate-900 rounded-xl p-2' +
          (show ? '' : ' hidden')
        }
      >
        <div className="popup-content space-y-2">
          <button
            className="popup-item block text-white rounded-xl p-2 transition-all hover:cursor-pointer hover:bg-grey-light hover:text-grey-dark"
            onClick={() => setShowEdit(!showEdit)}
          >
            Modifier
          </button>
          <button
            className="popup-item block text-red rounded-xl p-2 transition-all hover:cursor-pointer hover:text-white hover:bg-red"
            onClick={() => setShowDelete(!showDelete)}
          >
            Supprimer
          </button>
        </div>
      </div>
      <Modal show={showEdit}>
        <div className="text-white">Modifier</div>
      </Modal>
      <Modal show={showDelete}>
        <div className="text-white mb-2">Voulez vous vraiment supprimer ce message ?</div>
        <button
            className="popup-item bg-red text-white border-red border-2 rounded-xl p-2 mr-2 transition-all hover:cursor-pointer hover:bg-white hover:text-red"
            onClick={() => setShowDelete(!showDelete)}
          >
            Supprimer
          </button>
          <button
            className="popup-item text-grey-light rounded-xl p-2 transition-all hover:cursor-pointer hover:bg-grey-light hover:text-grey-dark"
            onClick={() => setShowDelete(!showDelete)}
          >
            Annuler
          </button>
      </Modal>
    </>
  );
};

export default PopupMessage;
