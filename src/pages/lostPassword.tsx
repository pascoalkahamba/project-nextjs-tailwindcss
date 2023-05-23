import React, { useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";
import Image from "next/image";
import { funValidateInput } from "./createAccount";
import Link from "next/link";
import { useRouter } from "next/router";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

const LostPassword = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const {
    global: { page, user, setUser },
  } = useGlobalContext();

  const router = useRouter();

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const errorUsername = funValidateInput<string>(form.username);
  const errorPassword = funValidateInput<string>(form.password);
  const thereIsUsername = user.some(
    ({ username }) => username === form.username
  );

  const intoAccount = (username: boolean) => {
    if (!username) setError(true);
    else if (username) {
      setError(false);
      const newUser = user.map((user) => {
        if (user.username === form.username)
          return {
            username: form.username,
            password: form.password,
            id: user.id,
          };
        else return user;
      });
      setUser(newUser);
      router.push("/login");
    }
  };

  const goInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
    if (funValidateInput(form.password) || funValidateInput(form.username)) {
      setError(true);
    } else {
      intoAccount(thereIsUsername);
    }
  };

  return (
    <Layout>
      <div className="flex-1 mt-[3.7rem] flex gap-7">
        <Head>
          <title>{page} | Fazer login</title>
        </Head>
        <Image
          src="/food-4.jpg"
          width={500}
          height={300}
          alt="picture for login"
          className="w-full"
        />
        <form
          onSubmit={goInsideAccount}
          className="flex flex-col gap-8 justify-center w-[50%]"
        >
          <h1 className=" text-center font-bold text-3xl mt-5">
            Recupera senha
          </h1>

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
            {errorUsername && error ? (
              <span className="block ml-3 italic text-red-500">
                Nome de usuário invalido.
              </span>
            ) : (
              !thereIsUsername &&
              error && (
                <span className="block ml-3 italic text-red-500">
                  Usuário não cadastrado.
                </span>
              )
            )}
          </div>

          <div>
            <label htmlFor="password" className="ml-3">
              Nova senha
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
            Recuperar
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LostPassword;
