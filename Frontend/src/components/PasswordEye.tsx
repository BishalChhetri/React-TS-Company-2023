import React from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type Props = {
  showPassword: boolean;
  onClick: () => void;
};

const PasswordEye = ({ showPassword, onClick }: Props) => {
  return (
    <>
      {showPassword ? (
        <IoMdEye
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={onClick}
        />
      ) : (
        <IoMdEyeOff
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={onClick}
        />
      )}
    </>
  );
};

export default PasswordEye;
