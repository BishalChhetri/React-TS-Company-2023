import React from "react";
import { Navbar } from "../components/home/Navbar";
import Front from "../components/home/Front";
import Services from "../components/home/Services";
import About from "../components/home/About";
import Products from "../components/home/Products";
import Blog from "../components/home/Blog";
import Newsletter from "../components/home/Newsletter";
import MyFooter from "../components/home/MyFooter";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Front />
      <Services />
      <About />
      <Products />
      <Blog />
      <Newsletter />
      <MyFooter />
    </div>
  );
};

export default Home;
