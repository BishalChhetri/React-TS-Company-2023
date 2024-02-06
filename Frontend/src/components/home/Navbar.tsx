import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaXmark, FaBars } from "react-icons/fa6";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ResetPassword from "../auth/ResetPassword";
import logo from "../../assets/company_logo.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState({
    signInModal: false,
    signUpModal: false,
    resetPasswordModal: false,
    message: "",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Service", path: "service" },
    { link: "About", path: "about" },
    { link: "Product", path: "product" },
    { link: "Testimonial", path: "testimonial" },
    { link: "FAQ", path: "faq" },
  ];

  return (
    <header className="w-full bg-white fixed top-0 left-0 right-0 z-50">
      <nav
        className={`py-4 lg:px-14 px-4${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href=""
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img src={logo} alt="" className="w-8 inline-block items-center" />
            <span className="stroke-text">Zephyron</span>
          </a>

          <ul className="hidden lg:flex space-x-12 center">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                spy={true}
                smooth={true}
                offset={-100}
                to={path}
                className="block text-base text-gray900 hover:text-brandPrimary first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div className="space-x-12 hidden lg:flex items-center">
            <a
              onClick={() =>
                setShowModal((prevState) => ({
                  ...prevState,
                  signInModal: true,
                }))
              }
              className="hidden lg:flex items-center text-brandPrimary hover:text-darkBrandPrimary"
            >
              Login
            </a>
            <button
              className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary"
              onClick={() =>
                setShowModal((prevState) => ({
                  ...prevState,
                  signUpModal: true,
                }))
              }
            >
              Sign Up
            </button>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-neutralDGrey focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              spy={true}
              smooth={true}
              offset={-100}
              to={path}
              className="block text-base text-white hover:text-gray900 first:font-medium"
            >
              {link}
            </Link>
          ))}

          <a
            onClick={() =>
              setShowModal((prevState) => ({
                ...prevState,
                signInModal: true,
              }))
            }
            className="block text-base text-white hover:text-gray900 first:font-medium"
          >
            Login
          </a>
          <a
            className="block text-base text-white hover:text-gray900 first:font-medium"
            onClick={() =>
              setShowModal((prevState) => ({
                ...prevState,
                signUpModal: true,
              }))
            }
          >
            Sign Up
          </a>
        </div>
      </nav>
      <Login
        isVisible={showModal.signInModal}
        onClose={() =>
          setShowModal((prevState) => ({
            ...prevState,
            signInModal: false,
            message: "",
          }))
        }
        openSignUp={() =>
          setShowModal((prevState) => ({
            ...prevState,
            signInModal: false,
            signUpModal: true,
          }))
        }
        openResetPassword={() =>
          setShowModal((prevState) => ({
            ...prevState,
            signInModal: false,
            resetPasswordModal: true,
          }))
        }
        setMessage={() =>
          setShowModal((prevState) => ({
            ...prevState,
            message: "",
          }))
        }
        message={showModal.message}
      />
      <Register
        isVisible={showModal.signUpModal}
        onClose={() =>
          setShowModal((prevState) => ({
            ...prevState,
            signUpModal: false,
            message: "",
          }))
        }
        setMessage={() =>
          setShowModal((prevState) => ({
            ...prevState,
            message:
              "Sucessfully Created an account! Please fill up credentials to login.",
          }))
        }
        openSignIn={() =>
          setShowModal((prevState) => ({
            ...prevState,
            signInModal: true,
            signUpModal: false,
          }))
        }
      />
      <ResetPassword
        isVisible={showModal.resetPasswordModal}
        onClose={() =>
          setShowModal((prevState) => ({
            ...prevState,
            resetPasswordModal: false,
            message: "",
          }))
        }
      />
    </header>
  );
};
