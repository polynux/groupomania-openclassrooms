import { useState } from 'react';
import Modal from './Modal';

const User = ({ author }: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="text-red-light text-xl username" onClick={() => setShow(true)}>
        {author.firstName} {author.lastName}
      </button>
      <Modal show={show}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="text-2xl text-white">User info</div>
            <div className="text-white">First name: {author.firstName}</div>
            <div className="text-white">Last name: {author.lastName}</div>
            <div className="text-white">Email: {author.email}</div>
          </div>
          <button className="btn" onClick={() => setShow(false)}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default User;
