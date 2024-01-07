import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Error from "../Error";
import { CREATE_USER_MUTATION } from "../../Query";
import PasswordEye from "../PasswordEye";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  openSignIn: () => void;
  setMessage: () => void;
};

const Register: React.FC<Props> = ({
  isVisible,
  onClose,
  openSignIn,
  setMessage,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    showPassword: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormData({ ...formData, error: "All the fields are mandatory." });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        error: "Password did not matched. Please do it again!",
      });
      return;
    }
    try {
      const user = await createUser({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        },
      });
      if (user) {
        setMessage();
        openSignIn();
      }
    } catch (e: any) {
      if (e.message === "Validation error") {
        setFormData({
          ...formData,
          error: "This email is already associated with account",
        });
        return;
      }
      setFormData({ ...formData, error: e.message });
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: "",
        });
        setPassword({
          showPassword: false,
          confirmPassword: false,
        });
        onClose();
      }}
    >
      <div className="border rounded h-[600px] text-center bg-neutralSilver">
        <h1 className="text-brandPrimary text-2xl m-10 font-bold">Register</h1>
        <form className="flex flex-col text-start m-10" onSubmit={handleSubmit}>
          {formData.error && <Error message={formData.error} />}
          <span className="text-[#263238] py-3">
            Full Name
            <span className="ms-1 text-darkBrandPrimary font-bold">*</span>
          </span>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            aria-label="fullname"
            autoComplete="off"
            className="input-primary"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, error: "", name: e.target.value })
            }
          />
          <span className="text-[#263238] py-3">
            Email<span className="ms-1 text-darkBrandPrimary font-bold">*</span>
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="off"
            className="input-primary"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, error: "", email: e.target.value })
            }
          />
          <span className="text-[#263238] py-3">
            Password
            <span className="ms-1 text-darkBrandPrimary font-bold">*</span>
          </span>
          <div className="relative">
            <input
              type={password.showPassword ? "text" : "password"}
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
              showPassword={password.showPassword}
              onClick={() =>
                setPassword((prevStat) => ({
                  ...prevStat,
                  showPassword: !prevStat.showPassword,
                }))
              }
            />
          </div>
          <span className="text-[#263238] py-3">
            Confirm Password
            <span className="ms-1 text-darkBrandPrimary font-bold">*</span>
          </span>
          <div className="relative">
            <input
              type={password.confirmPassword ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              className="input-primary w-full"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  error: "",
                  confirmPassword: e.target.value,
                })
              }
            />
            <PasswordEye
              showPassword={password.confirmPassword}
              onClick={() =>
                setPassword((prevStat) => ({
                  ...prevStat,
                  confirmPassword: !prevStat.confirmPassword,
                }))
              }
            />
          </div>
          <button className="my-5 bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary">
            Sign UP
          </button>
          <div className="text-center text-[#263238] text-sm">
            <span>Already have an account?</span>
            <button
              type="submit"
              className="ps-1 text-brandPrimary hover:text-darkBrandPrimary"
              onClick={openSignIn}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Register;
