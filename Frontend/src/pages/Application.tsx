import React, { useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import UpdatePassword from "../components/auth/UpdatePassword";
import { useAppSelector } from "../hooks/hooks";
import Sidebar from "../components/app/Sidebar";
import MessageComp from "../components/app/MessageComp";
import { UserData } from "../types/types.d";
import BlankMesssage from "../components/BlankMesssage";
import logo from "../assets/company_logo.png";

const Application = () => {
  const [showModal, setShowModal] = useState(false);
  const auth = useAppSelector((state) => state.user?.userData) || undefined;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserData | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="grid grid-cols-6 bg-brandPrimary">
        <div className=" col-span-1">
          <a
            href="/app"
            className=" font-semibold flex items-center space-x-3 p-4 bg-white border-2 border-brandPrimary md:flex hidden"
          >
            <img
              src={logo}
              alt=""
              className="w-9 inline-block items-center sm:w-9"
            />
            <span className="stroke-text text-base">Zephyron</span>
          </a>
          <div className="md:hidden space-x-3 p-4">
            <button
              onClick={toggleMenu}
              className="text-neutralDGrey focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-white" />
              ) : (
                <FaBars className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-6 h-[89.6vh]">
        <Sidebar
          auth={auth}
          showModal={showModal}
          setShowModal={setShowModal}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
        />
        {!activeUser ? (
          <BlankMesssage />
        ) : (
          <MessageComp
            isMenuOpen={isMenuOpen}
            activeUser={activeUser}
            auth={auth}
          />
        )}
      </div>
      <UpdatePassword
        email={auth?.email}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Application;
