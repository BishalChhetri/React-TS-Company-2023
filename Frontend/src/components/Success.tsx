import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

type Props = {
  message: string;
};

const Success: React.FC<Props> = ({ message }) => {
  return (
    <div className="my-0 border p-1 flex bg-[#CEFFC0] rounded items-end">
      <IoCheckmarkDoneCircle color="#0B8716" size="1.4em" />
      <span className="text-sm mx-1 text-[#0B8716] text-center">{message}</span>
    </div>
  );
};

export default Success;
