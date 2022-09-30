import { FaThumbsUp } from 'react-icons/fa';
import Avatar from '@components/Avatar';
import PopupMenu from './PopupMenu';

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

const Likes = ({ likes }: { likes: number }) => {
  return (
    <div className="absolute -bottom-10 right-0 mb-2 rounded-full bg-grey-dark shadow-lg shadow-slate-900 cursor-pointer">
      <FaThumbsUp className="fill-red-light text-xl  w-10 h-10 p-2.5" />
    </div>
  );
};

const Message = ({ message }: any) => {
  return (
    <>
      <div
        className="flex bg-grey-dark rounded-xl w-full max-w-3xl p-5 gap-5 shadow-md shadow-grey-dark"
        id={'messageId' + message.id}
      >
        {message.author && <Avatar user={message.author} />}
        <div className="flex flex-col gap-2 relative flex-grow">
          <div className="flex justify-between">
            <div className="text-red-light text-xl username">
              {message.author.firstName} {message.author.lastName}
            </div>
            <PopupMenu message={message} />
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
          <Likes likes={2} />
        </div>
      </div>
    </>
  );
};

export default Message;
