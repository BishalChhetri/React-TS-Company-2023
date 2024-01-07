import React from "react";
import { CiWarning } from "react-icons/ci";

type Props = {
  message: string;
};

const Error = React.forwardRef<HTMLInputElement, Props>(({ message }, ref) => {
  if (ref) {
    return (
      <div
        ref={ref}
        className="my-0 border p-1 flex bg-[#fcdce1] rounded items-end"
      >
        <CiWarning color="#ee4e6a" size="1.4em" />
        <span className="text-sm mx-1 text-brandPrimary text-center">
          {message}
        </span>
      </div>
    );
  }
  return (
    <div className="my-0 border p-1 flex bg-[#fcdce1] rounded items-end">
      <CiWarning color="#ee4e6a" size="1.4em" />
      <span className="text-sm mx-1 text-brandPrimary text-center">
        {message}
      </span>
    </div>
  );
});

export default Error;
