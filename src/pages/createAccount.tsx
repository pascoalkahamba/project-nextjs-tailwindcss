import Image from "next/image";
import React, { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { useRouter } from "next/router";
import Head from "next/head";

type CreateAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

export function funValidateInput<T>(username: T) {
  return username === "" || (!Number.isNaN(+username) && true);
}

const CreateAccount = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState(false);

  const {
    global: { user, setUser, page },
  } = useGlobalContext();

  const router = useRouter();
  const errorUsername = funValidateInput(form.username);
  const errorPassword = funValidateInput(form.password);
  const errorPassword2 = funValidateInput(form.password2);

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const createAccount: CreateAccountProps = (event) => {
    event.preventDefault();
    if (
      funValidateInput<string>(form.username) ||
      funValidateInput<string>(form.password) ||
      form.password !== form.password2
    ) {
      setError(true);
    } else {
      setUser([...user, { username: form.username, password: form.password }]);
      setForm({ username: "", password: "", password2: "" });
      router.push("./lostPassword");
      // setError(false);
    }
  };

  return (
    <div
      className="flex-1 mt-[3.7rem] flex justify-center gap-7
      "
    >
      <Head>
        <title>{page} | criar conta</title>
      </Head>
      <Image
        src="/food-1.jpg"
        width={400}
        height={300}
        alt="picture for login"
        className="w-full"
      />
      <form
        onSubmit={createAccount}
        className="flex flex-col gap-6 justify-center w-[50%]"
      >
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
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none w-full"
          />
          {errorUsername && error && (
            <span className="block ml-3 italic text-red-500">
              Nome de usúario invalido.
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
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none w-full"
          />
          {errorPassword && error ? (
            <span className="block ml-3 italic text-red-500">
              A senha não pode ser apenas numeros.
            </span>
          ) : (
            form.password !== form.password2 &&
            error && (
              <span className="block ml-3 italic text-red-500">
                As senhas não podem ser diferentes.
              </span>
            )
          )}
        </div>
        <div>
          <label htmlFor="password2" className="ml-3">
            Confirma a Senha
          </label>
          <input
            type="text"
            value={form.password2}
            onChange={handleChange}
            id="password2"
            placeholder="confirm your password"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none w-full"
          />
          {errorPassword2 && error ? (
            <span className="block ml-3 italic text-red-500">
              A senha não pode ser apenas numeros.
            </span>
          ) : (
            form.password !== form.password2 &&
            error && (
              <span className="block ml-3 italic text-red-500">
                As senhas não podem ser diferentes.
              </span>
            )
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
