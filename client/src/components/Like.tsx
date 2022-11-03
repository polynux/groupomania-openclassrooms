import { FaThumbsUp } from 'react-icons/fa';
import { likePost, unlikePost } from '@controllers/LikeController';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@controllers/Toasts';
import { useEffect, useState } from 'react';
import { getMeInfo } from '@controllers/UserController';

const Like = ({ message }: { message: any}) => {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const me = useQuery(['me'], getMeInfo, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      toastError(error as string);
    },
  });

  useEffect(() => {
    if (message.likedBy.some((like: any) => like.userId === me.data?.id)) {
      setLiked(true);
    }  
  }, [message]);

  const mutateLike = useMutation(liked ? unlikePost : likePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['messages']);
      if (data.message === 'Post liked') {
        setLiked(true);
        toastSuccess('Message aimé');
      } else {
        setLiked(false);
        toastSuccess('Message non aimé');
      }
      toastSuccess(data.message);
    },
    onError: (error) => {
      toastError(error as string);
    },
  });

  const like = () => {
    mutateLike.mutate(message.id);
  };

  return (
    <button
      className="absolute -bottom-10 right-0 mb-2 rounded-full bg-grey-dark shadow-lg shadow-slate-900 cursor-pointer"
      onClick={like}
      name="like"
    >
      <FaThumbsUp className={'fill-red-light text-xl  w-10 h-10 p-2.5' + (liked ? ' fill-red' : '')} />
      <span className="sr-only">Aimer</span>
    </button>
  );
};

export default Like;
