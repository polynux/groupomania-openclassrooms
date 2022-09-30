import { deleteMessage } from "@controllers/MessageController";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal";
import { toastError, toastSuccess } from "@controllers/Toasts";

const DeleteMessage = ({
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
      toastError(response.error);
    } else {
      toastSuccess(response.message);
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

export default DeleteMessage;