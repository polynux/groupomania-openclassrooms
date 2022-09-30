import { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import DeleteMessage from '@components/Popups/DeleteMessage';
import EditMessage from '@components/Popups/EditMessage';

const PopupMenu = ({ message }: { message: any }) => {
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
      <EditMessage message={message} showEdit={showEdit} setShowEdit={setShowEdit} />
      <DeleteMessage
        authorId={message.author.id}
        messageId={message.id}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
      />
    </>
  );
};

export default PopupMenu;
