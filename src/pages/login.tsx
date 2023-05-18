import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import CreateAccount from "../components/createAccount";
import TakeLogin from "./takeLogin";

const Login = () => {
  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      {/* <CreateAccount /> */}
      <TakeLogin />
      <Footer />
    </section>
  );
};

export default Login;
