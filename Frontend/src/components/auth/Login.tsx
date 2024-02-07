import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import Success from "../Success";
import { LOGIN_USER_MUTATION } from "../../Query";
import Modal from "../Modal";
import { useAppDispatch } from "../../hooks/hooks";
import { setUser } from "../../redux/userSlice";
import PasswordEye from "../PasswordEye";
import { ClipLoader } from "react-spinners";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  openSignUp: () => void;
  openResetPassword: () => void;
  setMessage: () => void;
  message: string;
};

const Login = ({
  isVisible,
  onClose,
  openSignUp,
  openResetPassword,
  setMessage,
  message,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
    isRemember: false,
  });
  const [loginUser] = useMutation(LOGIN_USER_MUTATION);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage();
    if (!formData.email || !formData.password) {
      setFormData({ ...formData, error: "All the fields are mandatory." });
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });
      if (user?.data?.login) {
        dispatch(
          setUser({
            isRemember: formData.isRemember,
            userData: user.data.login,
          })
        );
        setLoading(false);
        navigate("/app");
      } else {
        setFormData({ ...formData, error: "Login failed. Please try again." });
      }
    } catch (e: any) {
      setFormData({ ...formData, error: e.message });
      setLoading(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => {
        setFormData({
          email: "",
          password: "",
          error: "",
          isRemember: false,
        });
        setShowPassword(false);
        onClose();
      }}
    >
      <div className="border rounded h-[500px] text-center bg-neutralSilver">
        <h1 className="text-brandPrimary text-2xl m-10 font-bold">Login</h1>
        <form className="flex flex-col text-start m-10" onSubmit={handleSubmit}>
          {message ? (
            <Success message={message} />
          ) : (
            formData.error && <Error message={formData.error} />
          )}
          <span className="text-[#263238] py-3">
            Email<span className="ms-1 text-darkBrandPrimary font-bold">*</span>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="off"
            value={formData.email}
            className="input-primary"
            onChange={(e) =>
              setFormData({
                ...formData,
                error: "",
                email: e.target.value,
              })
            }
          />
          <span className="text-[#263238] py-3">
            Password
            <span className="ms-1 text-darkBrandPrimary font-bold">*</span>
          </span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              aria-label="Password"
              className="input-primary w-full"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  error: "",
                  password: e.target.value,
                })
              }
            />
            <PasswordEye
              showPassword={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="mt-3">
            <input
              className="px-1 placeholder-gray-400 text-sm text-brandPrimary rounded border-none ring-2 ring-gray-300 focus:ring-brandPrimary focus:ring-2"
              type="checkbox"
              checked={formData.isRemember}
              onChange={(e) => {
                setFormData({ ...formData, isRemember: e.target.checked });
              }}
            />
            <span className="ms-2 align-bottom text-sm text-[#263238]">
              Remember me
            </span>
          </div>
          {loading ? (
            <button
              disabled
              className="my-5 text-white py-2 px-4 transition-all duration-300  bg-[#f0667e] flex justify-center items-center "
            >
              Signing in{" "}
              <ClipLoader
                size={12}
                color="white"
                loading={true}
                className="ms-1 animate-none"
              />
            </button>
          ) : (
            <button className="my-5 bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary">
              Sign in
            </button>
          )}

          <div className="flex justify-between text-center text-[#263238] text-sm">
            <div>
              <span>Need an account?</span>
              <button
                className="ps-1 text-brandPrimary hover:text-darkBrandPrimary"
                onClick={openSignUp}
              >
                Sign Up
              </button>
            </div>
            <button
              type="submit"
              className="ps-1 text-brandPrimary hover:text-darkBrandPrimary"
              onClick={openResetPassword}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
