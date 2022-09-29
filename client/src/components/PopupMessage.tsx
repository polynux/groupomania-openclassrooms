import { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import Modal from './Modal';
import { deleteMessage } from '@controllers/MessageController';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const DeleteModal = ({
  authorId,
  messageId,
  showDelete,
  setShowDelete,
}: {
  authorId: string;
  messageId: string;
  showDelete: boolean;
  setShowDelete: (showDelete: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const response = await deleteMessage(messageId);
    queryClient.invalidateQueries(['messages']);
    setShowDelete(false);
    if (response.error) {
      toast.error(response.error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setShowDelete(false);
  };

  return (
    <>
      <Modal show={showDelete}>
        <div className="text-white mb-2">Voulez vous vraiment supprimer ce message ?</div>
        <button
          className="popup-item bg-red text-white border-red border-2 rounded-xl p-2 mr-2 transition-all hover:cursor-pointer hover:bg-white hover:text-red"
          onClick={handleDelete}
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

const EditModal = ({
  authorId,
  messageId,
  showEdit,
  setShowEdit,
}: {
  authorId: string;
  messageId: string;
  showEdit: boolean;
  setShowEdit: (showEdit: boolean) => void;
}) => {
  return (
    <Modal show={showEdit}>
      <div className="text-white">Modifier</div>
    </Modal>
  );
};

const PopupMessage = ({ message }: { message: any }) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.closest('#messageId' + message.id) === null) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClick);
  }, [message.id]);

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
            onClick={() => {
              setShowEdit(!showEdit);
              setShow(!show);
            }}
          >
            Modifier
          </button>
          <button
            className="popup-item block text-red rounded-xl p-2 transition-all hover:cursor-pointer hover:text-white hover:bg-red"
            onClick={() => {
              setShowDelete(!showDelete);
              setShow(!show);
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
      <EditModal authorId={message.author.id} messageId={message.id} showEdit={showEdit} setShowEdit={setShowEdit} />
      <DeleteModal
        authorId={message.author.id}
        messageId={message.id}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
    </>
  );
};

export default PopupMessage;
