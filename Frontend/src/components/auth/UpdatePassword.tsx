import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import Error from "../Error";
import Success from "../Success";
import { UPDATE_USER_MUTATION } from "../../Query";
import Modal from "../Modal";
import PasswordEye from "../PasswordEye";

type Props = {
  email: string | undefined;
  isVisible: boolean;
  onClose: () => void;
};

const UpdatePassword = ({ email, isVisible, onClose }: Props) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const showPasswordRef = useRef<{
    oldPassword: boolean;
    newPassword: boolean;
  }>({
    oldPassword: false,
    newPassword: false,
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
  });
  // const errorRef = useRef<{ message: string | null }>({ message: null });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const resetMessage = () => {
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!oldPasswordRef.current?.value || !newPasswordRef.current?.value) {
      setErrorMessage("Please enter all the credientials.");
      resetMessage();
      return;
    }
    if (oldPasswordRef.current?.value === newPasswordRef.current?.value) {
      setErrorMessage("Old and New Password must be different.");
      resetMessage();
      return;
    }

    try {
      const user = await updateUser({
        variables: {
          input: {
            email: email,
            password: oldPasswordRef.current?.value,
            newPassword: newPasswordRef.current?.value,
          },
        },
      });
      setSuccessMessage("Sucessfully Update Password.");
      resetMessage();
      oldPasswordRef.current && (oldPasswordRef.current.value = "");
      newPasswordRef.current && (newPasswordRef.current.value = "");
    } catch (e: any) {
      setErrorMessage(e.message);
      resetMessage();
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      onClose={() => {
        setShowPassword({ oldPassword: false, newPassword: false });
        onClose();
      }}
    >
      <div className="border rounded h-[450px] text-center bg-neutralSilver">
        <h1 className="text-brandPrimary text-2xl mt-10 mb-5 font-bold">
          Update Password
        </h1>
        <form className="flex flex-col text-start m-10" onSubmit={handleSubmit}>
          <div className="h-[2.5rem]">
            {errorMessage && <Error message={errorMessage} />}
            {successMessage && <Success message={successMessage} />}
          </div>
          <label className="text-neutralDGrey text-sm my-1">Email</label>
          <input
            type="email"
            className="input-primary"
            value={email}
            disabled
          />
          <label className="text-neutralDGrey text-sm my-1">
            Password <span className="text-brandPrimary">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword.oldPassword ? "text" : "password"}
              className="input-primary w-full"
              ref={oldPasswordRef}
            />
            <PasswordEye
              showPassword={showPassword.oldPassword}
              onClick={() =>
                setShowPassword((prevStat) => ({
                  ...prevStat,
                  oldPassword: !prevStat.oldPassword,
                }))
              }
            />
          </div>
          <label className="text-neutralDGrey text-sm my-1">
            New password <span className="text-brandPrimary">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              className="input-primary w-full"
              ref={newPasswordRef}
            />
            <PasswordEye
              showPassword={showPassword.newPassword}
              onClick={() =>
                setShowPassword((prevStat) => ({
                  ...prevStat,
                  newPassword: !prevStat.newPassword,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="p-3 mt-8 bg-brandPrimary text-white rounded transition duration-300 hover:bg-darkBrandPrimary"
          >
            Update Password
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdatePassword;
