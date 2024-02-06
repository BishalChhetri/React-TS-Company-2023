import React from "react";
import logo1 from "../../assets/Logo1.png";
import logo2 from "../../assets/Logo2.png";
import logo3 from "../../assets/Logo3.png";
import logo4 from "../../assets/Logo4.png";
import logo5 from "../../assets/Logo5.png";
import logo6 from "../../assets/Logo6.png";
import logo7 from "../../assets/Logo7.png";
import services1 from "../../assets/services1.png";
import services2 from "../../assets/services2.png";
import services3 from "../../assets/services3.png";

const Services = () => {
  const Services = [
    {
      id: 1,
      title: "Real-time Messaging",
      description:
        "Engage in seamless real-time conversations with our advanced messaging features.",
    },
    {
      id: 2,
      title: "Chat Moderation",
      description:
        "Ensure a positive and secure environment with our advanced chat moderation tools.",
    },
    {
      id: 3,
      title: "Group Chats",
      description:
        "Connect and collaborate effortlessly with group chat functionalities.",
    },
  ];
  return (
    <div
      className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto -z-50"
      id="service"
    >
      <div className="text-center my-8 ">
        <h2 className="text-4xl  text-neutralDGrey font-semibold mb-2">
          Our Clients
        </h2>
        <p className="text-neutralGrey">
          We have been working with some Fortune 500+ clients
        </p>
        <div className="my-12 flex flex-wrap justify-between items-center gap-8">
          <img src={logo1} alt="" />
          <img src={logo2} alt="" />
          <img src={logo3} alt="" />
          <img src={logo4} alt="" />
          <img src={logo5} alt="" />
          <img src={logo6} alt="" />
          <img src={logo7} alt="" />
        </div>

        <div className="mt-20 md:w-1/2 mx-auto text-center">
          <h2 className="text-4xl  text-neutralDGrey font-semibold mb-2">
            Manage your entire community in a single system
          </h2>
          <p className="text-neutralGrey">Who is Zephyron suitable for?</p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
          {Services.map((service) => (
            <div
              key={service.id}
              className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-brandPrimary transition-all duration-300 flex items-center justify-center h-f"
            >
              <div>
                <div className="bg-[#fbdbe1] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
                  <img
                    src={
                      service.id === 1
                        ? services1
                        : service.id === 2
                        ? services2
                        : services3
                    }
                    alt=""
                    className="-ml-5"
                  />
                </div>
                <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">
                  {service.title}
                </h4>
                <p className="text-sm text-neutralGrey">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
