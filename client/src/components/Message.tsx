import { FaEllipsisH } from 'react-icons/fa';

const Message = ({ text, user, date }: any) => {
  const initials = user.firstName[0] + user.lastName[0];
  return (
    <>
      <div className="flex bg-grey-dark rounded-xl max-w-3xl p-5 gap-5">
        <div className="avatar rounded-full bg-red-light w-20 p-3 aspect-square h-fit">
          <span className="text-grey-dark text-xl">{initials}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-red-light text-xl username">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-grey-light popup-btn text-2xl"><FaEllipsisH/></div>
          </div>
          <div className="text-white message">{text}</div>
          <div className="text-grey-light date">{date}</div>
        </div>
      </div>
    </>
  );
}

export default Message;