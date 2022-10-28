import Avatar from '@components/Avatar';
import PopupMenu from '@components/PopupMenu';
import Like from '@components/Like';
import { getMeInfo } from '@controllers/UserController';
import { useQuery } from '@tanstack/react-query';
import { toastError } from '@controllers/Toasts';
import User from './User';
import Image from './Image';

const Text = ({ text }: { text: string }) => {
  if (text === '') {
    return null;
  }
  return <div className="text-white message">{text}</div>;
};

const Message = ({ message }: any) => {
  const me = useQuery(['me'], getMeInfo, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      toastError(error as string);
    },
  });

  return (
    <>
      <div
        className="message flex bg-grey-dark rounded-xl w-full max-w-3xl p-5 gap-5 shadow-md shadow-grey-dark"
        id={'messageId' + message.id}
      >
        {message.author && <Avatar user={message.author} />}
        <div className="flex flex-col gap-2 relative flex-grow">
          <div className="flex justify-between">
            {message.author && <User author={message.author} />}
            {me.data?.id === message.author.id || me.data?.role === 'ADMIN' || me.data?.role === 'CREATOR' ? (
              <PopupMenu message={message} />
            ) : null}
          </div>
          <Text text={message.content} />
          {message.image && <Image src={message.image} alt="image" className="w-fit rounded-lg cursor-pointer" />}
          <div className="text-grey-light date">
            {new Date(message.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </div>
          {me.data?.id === message.author.id ? null : (
            <Like
              messageId={message.id}
              isLiked={
                message.likes > 0 && message.likedBy.find((like: any) => like.userId === me.data?.id) ? true : false
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
