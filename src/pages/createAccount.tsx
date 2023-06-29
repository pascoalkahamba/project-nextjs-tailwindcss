import Image from "next/image";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout";
import { api } from "../config/axios";
import { User } from "../model/User";
import { useFetch } from "../hooks/useFetch";

type CreateAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;

export function funValidateInput(username: string) {
  return username === "" || (!Number.isNaN(+username) && true);
}

export function funEmailValidate(email: string, regex: RegExp) {
  return regex.test(email);
}

const CreateAccount = () => {
  const {
    global: {
      regex,
      form,
      setForm,
      page,
      setCurrentUser,
      funHandleChange,
      currentUser,
      error,
      setError,
    },
  } = useGlobalContext();

  const { response, loading } = useFetch(`/users?email=${form.email}`);

  function funAddUser({ email, password, username }: User) {
    api.post("/users", {
      username,
      password,
      email,
    });
  }

  const router = useRouter();
  const errorUsername = funValidateInput(form.username);
  const errorEmail = funValidateInput(form.email);
  const errorPassword = funValidateInput(form.password);
  const errorPassword2 = funValidateInput(form.password2);
  const emailRegex = funEmailValidate(form.email, regex);

  const funCreateAccount: CreateAccountProps = (event) => {
    event.preventDefault();
    if (
      errorUsername ||
      errorPassword ||
      !emailRegex ||
      response !== "email nao cadastrado" ||
      form.password !== form.password2
    ) {
      setError(true);
    } else {
      funAddUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      router.push("/login");
      setForm({ username: "", password: "", password2: "", email: "" });
      setError(false);
    }
  };

  return (
    <Layout>
      <div
        className="flex-1 mt-[3.7rem] flex gap-7
      "
      >
        <Head>
          <title>{page} | Criar conta</title>
        </Head>
        <Image
          src="/food-1.jpg"
          width={500}
          height={300}
          alt="picture for login"
          className="w-[97%]"
        />
        <form
          onSubmit={funCreateAccount}
          className="flex flex-col gap-6 justify-center w-[50%]"
        >
          <h1 className=" text-center font-bold text-3xl mt-5">Cadastre-se</h1>
          <div>
            <label htmlFor="username" className="ml-3">
              Nome{" "}
            </label>
            <input
              type="text"
              value={form.username}
              minLength={6}
              onChange={funHandleChange}
              id="username"
              placeholder="input your username"
              className="rounded-lg transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent w-[97%]"
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
              type="password"
              value={form.password}
              minLength={6}
              onChange={funHandleChange}
              id="password"
              placeholder="input your password"
              className="rounded-lg transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent w-[97%]"
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
              type="password"
              value={form.password2}
              minLength={6}
              onChange={funHandleChange}
              id="password2"
              placeholder="confirm your password"
              className="rounded-lg transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent w-[97%]"
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
          <div>
            <label htmlFor="password2" className="ml-3">
              Digite seu email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={funHandleChange}
              id="email"
              placeholder="type your email"
              className="rounded-lg transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent w-[97%]"
            />
            {errorEmail && error ? (
              <span className="block ml-3 italic text-red-500">
                Email Invalido.
              </span>
            ) : !emailRegex && error ? (
              <span className="block ml-3 italic text-red-500">
                Email Invalido.
              </span>
            ) : (
              response !== "email nao cadastrado" &&
              error && (
                <span className="block ml-3 italic text-red-500">
                  Email já cadastrado.
                </span>
              )
            )}
          </div>
          <button
            type="submit"
            className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center mb-4"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAccount;
