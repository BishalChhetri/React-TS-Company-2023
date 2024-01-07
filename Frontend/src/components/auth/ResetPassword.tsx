import React, { useState } from "react";
import Modal from "../Modal";
import Error from "../Error";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const ResetPassword: React.FC<Props> = ({ isVisible, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    error: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      setFormData({ ...formData, error: "Please enter the email." });
      return;
    }
    onClose();
  };
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="border rounded h-[400px] text-center bg-neutralSilver">
        <h1 className="text-brandPrimary text-2xl m-10 font-bold">
          Reset Password
        </h1>
        <form
          className="flex flex-col text-start mx-10 my-15"
          onSubmit={handleSubmit}
        >
          {formData.error && <Error message={formData.error} />}
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
            onChange={(e) =>
              setFormData({
                ...formData,
                error: "",
                email: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="my-9 bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-darkBrandPrimary"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPassword;
