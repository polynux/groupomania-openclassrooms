import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const PopupMessage = ({id}: {id: string}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="bg-grey-dark">
      <div className="popup-btn text-2xl cursor-pointer" onClick={() => setShow(!show)}>
        <FaEllipsisH className="fill-grey-light" />
      </div>
      {show && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-item">Edit</div>
            <div className="popup-item">Delete</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMessage;