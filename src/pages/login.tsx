import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Login = () => {
  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <div className="flex-1 mt-[4.3rem]">Hello People </div>
      <Footer />
    </section>
  );
};

export default Login;
