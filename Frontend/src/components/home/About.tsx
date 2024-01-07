import React from "react";
import Frame from "../../assets/Frame.png";
import icon1 from "../../assets/Icon1.png";
import icon2 from "../../assets/Icon2.png";
import icon3 from "../../assets/Icon3.png";
import icon4 from "../../assets/Icon4.png";

const About = () => {
  return (
    <div id="about">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <img src={Frame} alt="" className="" />
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-4xl  text-neutralDGrey font-semibold mb-4 md:w-4/5">
              The unseen of spending three years at Pixelgrade
            </h2>
            <p className="md:w-3/4 text-sm text-neutralGrey mb-8">
              Three years at Pixelgrade were a transformative journey marked by
              creative synergy, growth, and purpose. Surrounded by an inspiring
              team, I honed my skills, delved into innovative projects, and
              learned the value of collaboration, ultimately shaping me both
              professionally and personally.
            </p>
            <button className="btn-primary">Learn More</button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl  text-neutralDGrey font-semibold mb-4 md:w-4/5">
              Helping a local{" "}
              <p className="text-brandPrimary">business reinvent itself</p>
            </h2>
            <p className="md:w-3/4 text-sm text-neutralGrey mb-8">
              We reached here with our hard work and dedication
            </p>
          </div>
          <div className="md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={icon1} alt="" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold ">
                    2,245,341
                  </h4>
                  <p className="text-sm text-neutralGrey">Members</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={icon2} alt="" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold ">
                    46,328
                  </h4>
                  <p className="text-sm text-neutralGrey">Clubs</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={icon3} alt="" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold ">
                    2,245,341
                  </h4>
                  <p className="text-sm text-neutralGrey">Members</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={icon4} alt="" />
                <div>
                  <h4 className="text-2xl text-neutralDGrey font-semibold ">
                    46,328
                  </h4>
                  <p className="text-sm text-neutralGrey">Clubs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
