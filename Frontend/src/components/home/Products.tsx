import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Tesla from "../../assets/Tesla.png";
import logo1 from "../../assets/logo1v2.png";
import logo2 from "../../assets/Logo2.png";
import logo3 from "../../assets/Logo3.png";
import logo4 from "../../assets/Logo4.png";
import logo5 from "../../assets/Logo5.png";
import logo6 from "../../assets/Logo6.png";
import Pana from "../../assets/pana.png";

const Products = () => {
  return (
    <div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8" id="product">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <img src={Pana} alt="" className="" />
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-4xl  text-neutralDGrey font-semibold mb-4 md:w-4/5">
              How to design your site footer like we did{" "}
            </h2>
            <p className="md:w-3/4 text-sm text-neutralGrey mb-8">
              Crafting a site footer involves planning content, organizing it
              into columns or sections, and designing with colors and typography
              that match your site. Ensuring functionality and accessibility,
              testing across devices, and integrating it using HTML/CSS are
              crucial steps. Simplicity, readability, and usability are key to
              creating an effective footer that complements your website's
              overall design.
            </p>
            <button className="btn-primary">Learn More</button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/3">
            <img src={Tesla} alt="" />
          </div>

          <div className="md:w-2/3 mx-auto">
            <div>
              <p className="md:w-4/5 text-sm text-neutralGrey mb-8 leading-7">
                Customers are the lifeblood of any business, representing
                individuals or entities purchasing goods or services.
                Understanding their needs, preferences, and behaviors is crucial
                for success. Building strong relationships, offering quality
                products/services, and providing excellent support are key to
                satisfying customers. Their feedback often shapes business
                decisions, impacting growth and reputation. Happy customers can
                become loyal advocates, driving future sales and fostering a
                positive brand image.
              </p>
              <h5 className="text-brandPrimary text-xl font-semibold mb-2">
                John Smith
              </h5>
              <p className="text-base text-neutralGrey mb-8">
                British Dragon Boat Racing Association
              </p>
              <div>
                <div className="flex items-center gap-8 flex-wrap">
                  <img src={logo1} alt="" className="cursor-pointer" />
                  <img src={logo2} alt="" className="cursor-pointer" />
                  <img src={logo3} alt="" className="cursor-pointer" />
                  <img src={logo4} alt="" className="cursor-pointer" />
                  <img src={logo5} alt="" className="cursor-pointer" />
                  <img src={logo6} alt="" className="cursor-pointer" />
                  <div className="flex items-center gap-8">
                    <a
                      href="/"
                      className="font-bold text-brandPrimary hover:text-darkBrandPrimary"
                    >
                      Meet all customers
                      <FaArrowRight className="inline-block ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
