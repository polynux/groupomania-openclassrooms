import Modal from '@components/Modal';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { editMessage } from '@controllers/MessageController';
import { toastSuccess, toastError } from '@controllers/Toasts';

const EditMessage = ({
  message,
  showEdit,
  setShowEdit,
}: {
  message: any;
  showEdit: boolean;
  setShowEdit: (showEdit: boolean) => void;
}) => {
  const [messageContent, setMessageContent] = useState(message.content);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const response = await editMessage(message.id, data);

    if (response.error) {
      toastError(response.error);
      return;
    }

    toastSuccess('Message edité avec succès');
    queryClient.invalidateQueries(['messages']);
    setShowEdit(false);
  };

  return (
    <Modal show={showEdit} className="min-w-[50%]">
      <div className="title flex justify-between items-center border-b border-b-grey-light pb-2 mb-2">
        <div className="text-white mb-2">Modifier votre message</div>
        <FaTimes
          className="fill-grey-light hover:fill-grey-dark hover:bg-grey-light cursor-pointer transition-all text-xl w-10 h-10 p-2.5 rounded-md"
          onClick={() => setShowEdit(!showEdit)}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Message"
          className="bg-grey-dark text-white rounded-xl border-2 border-grey p-2.5 w-full placeholder-red-light focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2"
          id="content"
          name="content"
        />
        <button
          type="submit"
          className="rounded-md border border-red bg-red py-2 px-4 text-sm font-medium max-w-[100px] text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
        >
          Modifier
        </button>
      </form>
    </Modal>
  );
};

export default EditMessage;
