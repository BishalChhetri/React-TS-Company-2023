import React from "react";
import { Carousel } from "flowbite-react";
import illustration from "../../assets/Illustration.png";

const Home = () => {
  return (
    <div className="bg-neutralSilver" id="home">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen text-brandPrimary">
        <Carousel className="w-full mx-auto">
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img src={illustration} alt="" />
            </div>

            <div>
              <h4 className="text-5xl font-semibold md-4 text-neutralDGrey md:w-3/4 leading-snug">
                Lessons and insights{" "}
                <span className="text-brandPrimary leading-snug">
                  from 4 years
                </span>
              </h4>
              <p className="text-neutralGrey text-base mb-8">
                Where to grow your business as a entrepreneur: site or social
                media?
              </p>
              <button className="btn-primary">Register</button>
            </div>
          </div>

          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img src={illustration} alt="" />
            </div>

            <div>
              <h4 className="text-5xl font-semibold md-4 text-neutralDGrey md:w-3/4 leading-snug">
                Learn and Earn Money{" "}
                <span className="text-brandPrimary leading-snug">
                  in 4 Months
                </span>
              </h4>
              <p className="text-neutralGrey text-base mb-8">
                Where to grow your business as a entrepreneur: site or social
                media?
              </p>
              <button className="btn-primary">Register</button>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
