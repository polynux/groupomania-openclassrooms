import Avatar from '@components/Avatar';
import PopupMenu from '@components/PopupMenu';
import Like from '@components/Like';
import { getMeInfo } from '@controllers/UserController';
import { useQuery } from '@tanstack/react-query';
import { toastError } from '@controllers/Toasts';
import User from './User';

const Image = ({ image }: { image: string }) => {
  if (image === '' || image === null) {
    return null;
  }

  return (
    <div className="flex justify-center ">
      <img src={image} alt="image" className="w-full rounded-lg cursor-pointer" />
    </div>
  );
};

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
            {(me.data?.id === message.author.id) || (me.data?.role === 'ADMIN') ? (
              <PopupMenu message={message} />
            ) : null}
          </div>
          <Text text={message.content} />
          <Image image={message.image} />
          <div className="text-grey-light date">
            {new Date(message.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </div>
          <Like messageId={message.id} isLiked={(message.likes > 0 && message.likedBy.find((like: any) => like.userId === me.data?.id)) ? true : false} />
        </div>
      </div>
    </>
  );
};

export default Message;
