import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import CreateAccount from "../components/createAccount";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };
  const goInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
  };

  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <CreateAccount />
      {/* <div
        className="flex-1 mt-[3.7rem] flex justify-center gap-7
      "
      >
        <Image
          src="/food-2.jpg"
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
            value={form.username}
            onChange={handleChange}
            id="username"
            placeholder="input your username"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none"
          />
          <input
            type="text"
            value={form.password}
            onChange={handleChange}
            id="password"
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
      </div> */}
      <Footer />
    </section>
  );
};

export default Login;
