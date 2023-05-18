import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { funValidateInput } from "./createAccount";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

const TakeLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const {
    global: { page },
  } = useGlobalContext();

  const errorPassword = funValidateInput(form.password);
  const errorUsername = funValidateInput(form.username);

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };
  const goInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
    setError(true);
    if (funValidateInput(form.password) || funValidateInput(form.username)) {
      console.log("try again please.");
    } else {
      console.log("All Ok");
    }
  };

  return (
    <div
      className="flex-1 mt-[3.7rem] flex justify-center gap-7
      "
    >
      <Head>
        <title>{page} | fazer login</title>
      </Head>
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
        <div>
          <input
            type="text"
            value={form.username}
            onChange={handleChange}
            id="username"
            placeholder="input your username"
            className="rounded-lg w-full outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none"
          />
          {errorUsername && error && (
            <span className="block ml-3 italic text-red-500">
              Nome de usuário invalido.
            </span>
          )}
        </div>

        <div>
          <input
            type="text"
            value={form.password}
            onChange={handleChange}
            id="password"
            placeholder="input your password"
            className="rounded-lg outline-none w-full text-black p-3 bg-black/10 dark:bg-slate-100 border-none"
          />
          {errorPassword && error && (
            <span className="block ml-3 italic text-red-500">
              Senha invalida.
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default TakeLogin;
