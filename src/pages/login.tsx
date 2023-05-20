import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { funValidateInput } from "./createAccount";
import Link from "next/link";
import Layout from "../components/layout";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

const TakeLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const {
    global: { page, user },
  } = useGlobalContext();

  const errorPassword = funValidateInput(form.password);
  const errorUsername = funValidateInput(form.username);

  const userDifferent = user.some(({ username }) => username === form.username);

  const thereIsPassword = user.some(
    ({ password }) => password === form.password
  );

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const goInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
    if (funValidateInput(form.password) || funValidateInput(form.username)) {
      console.log("error try again please.");
      setError(true);
    } else {
      console.log("All Ok");
    }
  };

  return (
    <Layout>
      <div
        className="flex-1 mt-[3.7rem] flex gap-7
      "
      >
        <Head>
          <title>{page} | fazer login</title>
        </Head>
        <Image
          src="/food-2.jpg"
          width={500}
          height={300}
          alt="picture for login"
          className="w-full"
        />
        <form
          onSubmit={goInsideAccount}
          className="flex flex-col gap-8 justify-center w-[50%]"
        >
          <h1 className=" text-center font-bold text-3xl mt-5">Conecte-se</h1>

          <div>
            <label htmlFor="username" className="ml-3">
              Nome{" "}
            </label>
            <input
              type="text"
              value={form.username}
              onChange={handleChange}
              id="username"
              placeholder="input your username"
              className="rounded-lg w-[97%] transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
            {errorUsername && error && (
              <span className="block ml-3 italic text-red-500">
                Nome de usuário invalido.
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="ml-3">
              Senha
            </label>
            <input
              type="text"
              value={form.password}
              onChange={handleChange}
              id="password"
              placeholder="input your password"
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
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
          <h2 className="text-xl font-medium underline">Perdeu a Senha?</h2>
          <h2 className="text-2xl font-bold mt-4">Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link href="/createAccount">
            <button className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center mb-4">
              Cadastra-se
            </button>
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default TakeLogin;
