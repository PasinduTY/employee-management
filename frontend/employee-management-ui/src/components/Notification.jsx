import { useEffect } from "react";

function Notification({ message, type, onClose }) {
  // Auto close after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`toast show position-fixed top-0 end-0 m-3 text-white ${
        type === "success" ? "bg-success" : "bg-danger"
      }`}
      role="alert"
    >
      <div className="toast-body">{message}</div>
    </div>
  );
}

export default Notification;
