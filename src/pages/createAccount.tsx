import Image from "next/image";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout";
import { api } from "../config/axios";
import { User } from "../model/User";

type CreateAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandleChangeProps = React.ChangeEventHandler<HTMLInputElement> | undefined;
type EmailProps = "email ja cadastrado" | "email nao cadastrado";

export function funValidateInput<T>(username: T) {
  return username === "" || (!Number.isNaN(+username) && true);
}

export function emailValidate(email: string, regex: RegExp) {
  return regex.test(email);
}

const CreateAccount = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const {
    global: { regex },
  } = useGlobalContext();

  const [email, setEmail] = useState<EmailProps>("email ja cadastrado");

  async function getEmail() {
    const data = await api.get<{ status: EmailProps }>(
      `/users?email=${form.email}`
    );
    const { status } = await data.data;
    setEmail(status);
  }

  const {
    global: {
      user,
      setUser,
      page,
      setCurrentUser,
      currentUser,
      error,
      setError,
    },
  } = useGlobalContext();

  function addUser({ email, password, username }: User) {
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
  const emailRegex = emailValidate(form.email, regex);

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const createAccount: CreateAccountProps = (event) => {
    event.preventDefault();
    getEmail();
    if (
      funValidateInput<string>(form.username) ||
      funValidateInput<string>(form.password) ||
      !emailValidate(form.email, regex) ||
      email === "email ja cadastrado" ||
      form.password !== form.password2
    ) {
      setError(true);
    } else {
      addUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });
      setCurrentUser({ name: "Login", id: 1 });
      setForm({ username: "", password: "", password2: "", email: "" });
      setError(false);
      router.push("/login");
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
          onSubmit={createAccount}
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
              onChange={handleChange}
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
              type="text"
              value={form.password}
              onChange={handleChange}
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
              type="text"
              value={form.password2}
              onChange={handleChange}
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
              type="text"
              value={form.email}
              onChange={handleChange}
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
              email === "email ja cadastrado" &&
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
            Criar Conta
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAccount;
