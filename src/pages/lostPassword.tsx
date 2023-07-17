import React, { useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";
import Image from "next/image";
import { emailValidate, validateInput } from "./createAccount";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "../hooks/useFetch";
import { api } from "../config/axios";
import { User } from "../model/User";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;

const LostPassword = () => {
  const [form, setForm] = useState({
    password: "",
    email: "",
  });
  const {
    global: { page, regexEmail, setError, error, currentUser },
  } = useGlobalContext();

  const router = useRouter();
  const { response, loading } = useFetch(`/users?email=${form.email}`);

  const errorUsername = validateInput(form.email);
  const errorPassword = validateInput(form.password);
  const emailInvalid = emailValidate(form.email, regexEmail);

  const funHandleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  function funCreatedAccount() {
    setForm({
      password: "",
      email: "",
    });
    setError(false);
  }

  function funUpdataUser({ email, password, username }: User) {
    api.post("/users", {
      username,
      password,
      email,
    });
  }

  const funGoInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
    if (
      errorPassword ||
      errorUsername ||
      !emailInvalid ||
      response === "email nao cadastrado"
    ) {
      setError(true);
    } else {
      funCreatedAccount();
      funUpdataUser({
        email: form.email,
        password: form.password,
        username: currentUser,
      });
      router.push("/login");
    }
  };

  return (
    <>
      <Head>
        <title>{page} | Fazer login</title>
      </Head>
      <Image
        src="/food-4.jpg"
        width={500}
        height={300}
        alt="picture for login"
        className="w-full animeLeft"
      />
      <form
        onSubmit={funGoInsideAccount}
        className="flex flex-col gap-8 justify-center w-[50%]"
      >
        <h1 className="text-center font-bold text-3xl mt-5">Recupera senha</h1>

        <div>
          <label htmlFor="username" className="ml-3">
            Nome{" "}
          </label>
          <input
            type="text"
            value={form.email}
            onChange={funHandleChange}
            id="email"
            placeholder="input your email"
            className="rounded-lg w-[97%] transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
          />
          {errorUsername && error ? (
            <span className="block ml-3 italic text-red-500">
              Nome de usuário invalido.
            </span>
          ) : !emailInvalid && error ? (
            <span className="block ml-3 italic text-red-500">
              Email invalido.
            </span>
          ) : (
            response === "email nao cadastrado" &&
            error && (
              <Link href="/createAccount">
                <a onClick={funCreatedAccount}>
                  <span className="block ml-3 italic text-red-500">
                    Email não encontrado por favor faça o casdastro.
                  </span>
                </a>
              </Link>
            )
          )}
        </div>

        <div>
          <label htmlFor="password" className="ml-3">
            Nova senha
          </label>
          <input
            type="password"
            minLength={6}
            value={form.password}
            onChange={funHandleChange}
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
          className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center mb-4"
        >
          {loading ? "Carregando..." : "Recuperar"}
        </button>
      </form>
    </>
  );
};

export default LostPassword;
