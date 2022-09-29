import { FaCheckCircle } from "react-icons/fa";

const ToastSuccess = ({ message }: { message: string }) => {
  return (
    <div className="toast toast-success fixed top-4 right-4">
      <div className="toast__icon">
        <FaCheckCircle />
      </div>
      <div className="toast__message">{message}</div>
    </div>
  );
};

export default ToastSuccess;