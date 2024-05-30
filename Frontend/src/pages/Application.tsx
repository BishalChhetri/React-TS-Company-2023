import React, { useState, useCallback } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import UpdatePassword from "../components/auth/UpdatePassword";
import { useAppSelector } from "../hooks/hooks";
import Sidebar from "../components/app/Sidebar";
import MessageComp from "../components/app/MessageComp";
import { UserData } from "../types/types.d";
import BlankMesssage from "../components/BlankMesssage";
import logo from "../assets/company_logo.png";
import profile1 from "../assets/profile1.png";
import { useAppDispatch } from "../hooks/hooks";
import { logoutUser } from "../redux/userSlice";

const Application = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const auth = useAppSelector((state) => state.user?.userData) || undefined;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserData | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <nav className="grid md:grid-cols-3 grid-cols-2 gap-4 shadow-md mb-1">
        <div className=" col-span-1 bg-white ">
          <a
            href="/app"
            className=" font-semibold items-center space-x-3 p-4 md:flex hidden"
          >
            <img
              src={logo}
              alt=""
              className="w-9 inline-block items-center sm:w-9"
            />
            <span className="text-xl text-brandPrimary">Zephyron</span>
          </a>
          <div className="md:hidden space-x-3 p-4">
            <button
              onClick={toggleMenu}
              className="text-neutralDGrey focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-brandPrimary" />
              ) : (
                <FaBars className="h-6 w-6 text-brandPrimary" />
              )}
            </button>
          </div>
        </div>

        <div className="col-span-1 hidden md:flex md:p-0 justify-end">
          <div className="border h-fit w-full md:w-auto rounded-full shadow-sm hover:shadow-md transition cursor-pointer p-3">
            <div className="flex flex-row items-center justify-between">
              <div className="text-brandPrimary font-semibold px-4">
                Zephyron
              </div>
              <div className="hidden sm:block text-brandPrimary font-semibold px-4 border-x flex-1 text-center">
                Chat
              </div>
              <div className="text-brandPrimary px-4 font-semibold flex flex-row items-center">
                Messenger
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={toggleOpen}
          onMouseLeave={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 5000);
          }}
          className=" col-span-1 p-2  border flex flex-row border-neutral-200 items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition w-fit  justify-end ms-auto my-auto me-4 relative"
        >
          <FaBars />
          <div className="border-l ">
            <img
              src={profile1}
              className="rounded-full ms-2"
              height="30"
              width="30"
              alt="Avatar"
            />
          </div>
          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[160px]  bg-white overflow-hidden right-8 top-12 text-sm z-50">
              <div className="flex flex-col cursor-pointer">
                <div
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-neutralDGrey"
                >
                  Update Password
                </div>
                <div
                  onClick={() => dispatch(logoutUser())}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-neutralDGrey"
                >
                  Log out
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="grid grid-cols-6 h-[calc(100vh-72px)]">
        <Sidebar
          auth={auth}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
        />
        {!activeUser && !isMenuOpen ? (
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
