import React, { useState, useEffect } from "react";
import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import profile4 from "../../assets/profile4.png";
import profile5 from "../../assets/profile5.png";
import { UserData } from "../../types/types.d";
import { useAppDispatch } from "../../hooks/hooks";
import { logoutUser } from "../../redux/userSlice";
import { QUERY_ALL_USERS } from "../../Query/index";
import { useQuery } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  auth: UserData | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  activeUser: UserData | null;
  setActiveUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  auth,
  showModal,
  setShowModal,
  isMenuOpen,
  toggleMenu,
  activeUser,
  setActiveUser,
}) => {
  const dispatch = useAppDispatch();
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (user: UserData) => {
    setActiveUser(user);
  };

  useEffect(() => {
    setUserData(data?.users);
  }, [data, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`col-span-1 bg-neutralSilver flex flex-col justify-between md:flex hidden ${
          isMenuOpen &&
          "col-span-1 bg-neutralSilver flex flex-col justify-between"
        }`}
      >
        <PerfectScrollbar
          options={{ wheelPropagation: false as boolean }}
          className="max-h-[530px] overflow-y-auto p-2 "
        >
          <div>
            {userData &&
              userData.map((data, i) =>
                auth?.id !== data.id ? (
                  <div
                    className={`mt-4 mx-2 p-2 flex  ${
                      activeUser?.id === data.id
                        ? "border-darkBrandPrimary"
                        : "border-neutralSilver"
                    }  border-2 hover:border-brandPrimary rounded cursor-pointer`}
                    key={data.id}
                    onClick={() => handleItemClick(data)}
                  >
                    <img
                      src={
                        i % 5 === 0
                          ? profile1
                          : i % 5 === 1
                          ? profile2
                          : i % 5 === 2
                          ? profile3
                          : i % 5 === 3
                          ? profile4
                          : profile5
                      }
                      alt=""
                      className="rounded-full w-[3rem]"
                    />
                    <div className="flex flex-col ms-2 justify-center lg:flex hidden">
                      <span className="w-full">{data.name}</span>
                      <span className="text-[0.5rem]">{data.email}</span>
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </PerfectScrollbar>
        <div className="flex flex-col justify-end mt-auto">
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-brandPrimary mx-1 text-white py-1 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary"
          >
            Update Password
          </button>
          <button
            onClick={() => dispatch(logoutUser())}
            className="bg-brandPrimary m-1 text-white py-1 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary"
          >
            Log Out
          </button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen
            ? "col-span-4 bg-neutralSilver flex flex-col justify-between h-[90vh]"
            : "hidden"
        }`}
        onMouseLeave={toggleMenu}
      >
        <PerfectScrollbar
          options={{ wheelPropagation: false as boolean }}
          className="max-h-[530px] overflow-y-auto p-1"
        >
          <div>
            {userData &&
              userData.map((data, i) =>
                auth?.id !== data.id ? (
                  <div
                    className={`mt-4 mx-2 p-2 flex  ${
                      activeUser?.id === data.id
                        ? "border-darkBrandPrimary"
                        : "border-neutralSilver"
                    }  border-2 hover:border-brandPrimary rounded cursor-pointer`}
                    key={data.id}
                    onClick={() => handleItemClick(data)}
                  >
                    <img
                      src={
                        i % 5 === 0
                          ? profile1
                          : i % 5 === 1
                          ? profile2
                          : i % 5 === 2
                          ? profile3
                          : i % 5 === 3
                          ? profile4
                          : profile5
                      }
                      alt=""
                      className="rounded-full w-[3rem]"
                    />
                    <div className="flex flex-col ms-2 justify-center">
                      <span className="w-full">{data.name}</span>
                      <span className="text-[0.5rem]">{data.email}</span>
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </PerfectScrollbar>
        <div className="flex flex-col justify-end mt-auto">
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-brandPrimary mx-1 text-white py-1 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary"
          >
            Update Password
          </button>
          <button
            onClick={() => dispatch(logoutUser())}
            className="bg-brandPrimary  m-1 text-white py-1 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
