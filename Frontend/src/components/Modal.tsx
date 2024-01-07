import React from "react";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal = ({ isVisible, onClose, children }: Props) => {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-primary bg-opacity-85 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">{children}</div>
    </div>
  );
};

export default Modal;
