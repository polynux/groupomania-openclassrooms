import { FaTimes } from "react-icons/fa";

const ToastError = ({ message }: { message: string }) => {
  return (
    <div className="toast toast-error fixed top-18 right-8 z-1000">
      <div className="toast__icon">
        <FaTimes />
      </div>
      <div className="toast__message">{message}</div>
    </div>
  );
};

export default ToastError;