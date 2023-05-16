import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;

const Login = () => {
  const goInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
  };

  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <div
        className="flex-1 mt-[4.3rem] flex justify-center gap-7
      "
      >
        <Image
          src="/charles-deluvio-AQRp2NH-O8k-unsplash.jpg"
          width={400}
          height={300}
          alt="picture for login"
          className="w-full"
        />
        <form
          onSubmit={goInsideAccount}
          className="flex flex-col gap-8 justify-center w-[50%]"
        >
          <input
            type="text"
            placeholder="input your username"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none"
          />
          <input
            type="text"
            placeholder="input your password"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none"
          />
          <button
            type="submit"
            className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center"
          >
            Entrar
          </button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default Login;
