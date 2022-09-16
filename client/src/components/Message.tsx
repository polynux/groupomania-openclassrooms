import { FaEllipsisH } from 'react-icons/fa';
import Avatar from '@components/Avatar';

const Message = ({ text, user, date }: any) => {

  return (
    <>
      <div className="flex bg-grey-dark rounded-xl max-w-3xl p-5 gap-5">
        {user && <Avatar user={user} />}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-red-light text-xl username">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-grey-light popup-btn text-2xl">
              <FaEllipsisH />
            </div>
          </div>
          <div className="text-white message">{text}</div>
          <div className="text-grey-light date">{date}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
