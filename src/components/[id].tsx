import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <div className="flex-1 mt-[4.3rem]">
        {id === "login" ? <p>Faca Login</p> : <p>Ja estas cadastro</p>}
      </div>
      <Footer />
    </section>
  );
};

export default Login;
