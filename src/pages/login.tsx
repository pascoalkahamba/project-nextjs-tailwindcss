import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import {
  HandleChangeProps,
  funEmailValidate,
  funValidateInput,
} from "./createAccount";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "../hooks/useFetch";

type GoInsideAccountProps = React.FormEventHandler<HTMLFormElement> | undefined;

const Login = () => {
  const [form, setForm] = useState({
    password: "",
    email: "",
  });
  const {
    global: { page, setLogin, currentUser, regex, error, setError },
  } = useGlobalContext();
  const { response, loading, setLoading } = useFetch(
    `/users?email=${form.email}&password=${form.password}`
  );

  // const response = "email nao cadastrado";

  console.log("response", response);

  const router = useRouter();
  function funCreatedAccount() {
    setForm({
      password: "",
      email: "",
    });
    setError(false);
  }

  const errorPassword = funValidateInput(form.password);
  const errorUsername = funValidateInput(form.email);
  const emailInvalid = funEmailValidate(form.email, regex);

  const funHandleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  console.log(currentUser);

  const funIntoAccount = (
    email: boolean,
    password: boolean,
    username: boolean
  ) => {
    if (username) setError(true);
    if (!email) setError(true);
    if (password) setError(true);
    else {
      setLogin(true);
      router.push("/userProfile");
      funCreatedAccount();
    }
  };

  const funGoInsideAccount: GoInsideAccountProps = (event) => {
    event.preventDefault();
    if (
      errorPassword ||
      errorUsername ||
      !emailInvalid ||
      response !== "success"
    ) {
      setError(true);
    } else {
      console.log("Perfil do usuario acessado.");
      funIntoAccount(emailInvalid, errorPassword, errorUsername);
    }
  };

  return (
    <>
      <Head>
        <title>{page} | Fazer login</title>
      </Head>
      <Image
        src="/food-2.jpg"
        width={500}
        height={300}
        alt="picture for login"
        className="w-full"
      />

      <form
        onSubmit={funGoInsideAccount}
        className="flex flex-col gap-8 justify-center w-[50%]"
      >
        <h1 className=" text-center font-bold text-3xl mt-5">Conecte-se</h1>

        <div>
          <label htmlFor="email" className="ml-3">
            Email{" "}
          </label>
          <input
            type="email"
            value={form.email}
            onChange={funHandleChange}
            id="email"
            placeholder="input your email"
            className="rounded-lg w-[97%] transition-all outline-0 hover:border-[2.5px] hover:border-blue-600 focus:border-blue-600 text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
          />
          {errorUsername && error ? (
            <span className="block ml-3 italic text-red-500">
              Email de usuário invalido.
            </span>
          ) : !emailInvalid && error ? (
            <span className="block ml-3 italic text-red-500">
              Email Invalido.
            </span>
          ) : (
            response === "email nao cadastrado" &&
            error && (
              <span className="block ml-3 italic text-red-500">
                Usuário não cadastrado.
              </span>
            )
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
            className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
          />
          {errorPassword && error ? (
            <span className="block ml-3 italic text-red-500">
              Senha invalida.
            </span>
          ) : (
            response === "password invalid" &&
            error && (
              <span className="block ml-3 italic text-red-500">
                Senha incorreta.
              </span>
            )
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center"
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
        <Link href="/lostPassword">
          <a onClick={funCreatedAccount}>
            <h2 className="text-xl font-medium underline">Perdeu a Senha?</h2>
          </a>
        </Link>
        <h2 className="text-2xl font-bold mt-4">Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link href="/createAccount">
          <button className="bg-slate-900 dark:bg-slate-600 p-3 text-slate-100 w-[50%] rounded-lg self-center mb-4">
            Cadastra-se
          </button>
        </Link>
      </form>
    </>
  );
};

export default Login;
