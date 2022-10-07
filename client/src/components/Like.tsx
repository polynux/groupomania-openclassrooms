import { FaThumbsUp } from 'react-icons/fa';
import { likePost, unlikePost } from '@controllers/LikeController';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@controllers/Toasts';

const Like = ({ messageId, isLiked }: { messageId: string; isLiked: boolean }) => {
  const queryClient = useQueryClient();

  const mutateLike = useMutation(isLiked ? unlikePost : likePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['messages']);
      isLiked ? toastSuccess('Message aimé') : null;
    },
    onError: (error) => {
      toastError(error as string);
    },
  });

  const like = () => {
    mutateLike.mutate(messageId);
  };

  return (
    <button
      className="absolute -bottom-10 right-0 mb-2 rounded-full bg-grey-dark shadow-lg shadow-slate-900 cursor-pointer"
      onClick={like}
    >
      <FaThumbsUp className={'fill-red-light text-xl  w-10 h-10 p-2.5' + (isLiked ? ' fill-red' : '')} />
    </button>
  );
};

export default Like;
