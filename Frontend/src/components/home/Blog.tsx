import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Blog1 from "../../assets/Blog1.png";
import Blog2 from "../../assets/Blog2.png";
import Blog3 from "../../assets/Blog3.png";

const Blog = () => {
  const blogs = [
    { id: 1, title: "Creating Streamlined Safeguarding Processes with OneRen" },
    {
      id: 2,
      title:
        "What are your safeguarding responsibilities and how can you manage them?",
    },
    { id: 3, title: "Revamping the Membership Model with Triathlon Australia" },
  ];

  return (
    <div
      className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-12"
      id="testimonial"
    >
      <div className="text-center md:w-1/2 mx-auto">
        <h2 className="text-4xl text-neutralDGrey font-semibold mb-4">
          Caring is the new marketing
        </h2>
        <p className="md:w-3/4 text-sm text-neutralGrey mb-8 mx-auto">
          The Zephyron blog is the best place to read about the latest
          membership insights, trends and more. See who's joining the community,
          read about how our community are increasing their membership income
          and lot's more.​
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 items-center justify-between">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="mx-auto relative mb-12 cursor-pointer -z-50"
          >
            <img
              src={blog.id === 1 ? Blog1 : blog.id === 2 ? Blog2 : Blog3}
              alt=""
              className="hover:scale-95 transition-all duration-300"
            />
            <div className="text-center px-4 py-8 bg-white shadow-lg rounded-md md:w-3/4 mx-auto absolute left-0 right-0 -bottom-12">
              <h3 className="mb-3 text-neutralGrey font-semibold">
                {blog.title}
              </h3>
              <div className="flex items-center gap-8">
                <a
                  href="/"
                  className="font-bold text-brandPrimary hover:text-darkBrandPrimary mx-auto"
                >
                  Readmore
                  <FaArrowRight className="inline-block ml-2" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
