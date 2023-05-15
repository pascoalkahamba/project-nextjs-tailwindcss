import React from "react";
import Header from "./header";
import Footer from "./footer";

const Login = () => {
  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <div className="flex-1 mt-[4.3rem]">Login</div>
      <Footer />
    </section>
  );
};

export default Login;
