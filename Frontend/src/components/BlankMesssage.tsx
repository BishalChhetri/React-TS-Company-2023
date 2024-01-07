import React from "react";
import { TiMessages } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import logo from "../assets/company_logo.png";

const BlankMesssage = () => {
  return (
    <div className="flex flex-col md:col-span-5 col-span-6 items-center m-5">
      <a className=" font-semibold flex items-center space-x-3 p-4 bg-white ">
        <img src={logo} alt="" className="w-14 inline-block items-center" />
        <span className="text-darkBrandPrimary text-4xl">Zephyron</span>
      </a>{" "}
      <TiMessages size="14rem" className="text-darkBrandPrimary" />{" "}
      <span className="font-bold text-[#454545] text-xl flex items-center">
        Messages
        <FaPlus size="15px" className="ms-1" />
      </span>
      <span className="mt-5 text-neutralDGrey text-center">
        Message+ syncs across your phone, tablet, computer and other smart
        devices.
      </span>
      <button className="bg-transparent border-2 border-darkBrandPrimary rounded border-r-3 m-14 text-[#cb6476] font-bold py-2 px-6">
        Start Messaging
      </button>
    </div>
  );
};

export default BlankMesssage;
