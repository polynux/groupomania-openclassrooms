import { useState } from 'react';
import Modal from './Modal';
import { getMeInfo, giveUserRights } from '@controllers/UserController';
import { toastError, toastSuccess } from '@controllers/Toasts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const User = ({ author }: any) => {
  const [show, setShow] = useState(false);
  const [popupPos, setPopupPos] = useState({ posX: 0, posY: 0 });
  const [messageId, setMessageId] = useState('0');
  const me = useQuery(['me'], getMeInfo, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      toastError(error as string);
    },
  });
  
  const queryClient = useQueryClient();

  function handleContextMenu(e: any) {

    if (messageId!== '0' && e.target.closest('.message')?.id.slice(9) !== messageId) {
      setPopupPos({ posX: 0, posY: 0});
      setMessageId('0');
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  }
  document.addEventListener('contextmenu', handleContextMenu);

  function handleClick(e: any) {
    if (e.target.closest('.user') === null) {
      setPopupPos({ posX: 0, posY: 0 });
      setMessageId('0');
      document.removeEventListener('click', handleClick);
    }
  }

  document.addEventListener('click', handleClick);

  const handleRightClick = async (e: any) => {
    e.preventDefault();
    setMessageId(e.target.closest('.message').id.slice(9));
    setPopupPos({ posX: e.clientX, posY: e.clientY });
  };
  
  async function changeRights() {
    setPopupPos({ posX: 0, posY: 0 });
    setMessageId('0');
    const response = await giveUserRights(author.id, author.role === 'USER' ? 'ADMIN' : 'USER');
    if (response.error) {
      return toastError(response.error);
    }
    toastSuccess('User rights changed');
    queryClient.invalidateQueries(['messages']);
  }

  return (
    <div className="user">
      <button
        className="text-red-light text-xl username"
        onClick={() => setShow(true)}
        onContextMenu={(e) => {
          if (author.role === 'CREATOR') {
            return;
          }
          if (me.data?.role === 'ADMIN' || me.data?.role === 'CREATOR') {
            handleRightClick(e);
          }
        }}
      >
        {author.firstName} {author.lastName}
      </button>
      {popupPos.posX !== 0 && (
        <div
          className={`popup-admin absolute z-10 left-[${popupPos.posX}px] top-[${
            popupPos.posY + 20
          }px] bg-grey-dark shadow-lg shadow-slate-900 rounded-xl p-2`}
        >
          <div className="popup-content space-y-2">
            <button
              className="popup-item block text-white rounded-xl p-2 transition-all hover:cursor-pointer hover:bg-grey-light hover:text-grey-dark"
              onClick={changeRights}
            >
              Donner le role {author.role === 'ADMIN' ? 'utilisateur' : 'administrateur'}
            </button>
          </div>
        </div>
      )}
      <Modal show={show}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="text-2xl text-white">Info utilisateur</div>
            <div className="text-white">Nom: {author.lastName}</div>
            <div className="text-white">Prenom: {author.firstName}</div>
            <div className="text-white">
              Adresse mail: <a href={'mailto:' + author.email}>{author.email}</a>
            </div>
          </div>
          <button
            className="rounded-md border border-red bg-red py-2 px-4 text-sm max-w-[100px] font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
            onClick={() => setShow(false)}
          >
            Fermer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default User;
