import Image from "next/image";
import React, { useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";

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
    global: { user, setUser },
  } = useGlobalContext();

  const errorUsername = funValidateInput(form.username);
  const errorPassword = funValidateInput(form.password);
  const errorPassword2 = funValidateInput(form.password2);

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const createAccount: CreateAccountProps = (event) => {
    event.preventDefault();
    setError(true);
    if (funValidateInput<string>(form.username))
      alert("error please try again later");
    else
      setUser([...user, { username: form.username, password: form.password }]);
  };

  return (
    <div
      className="flex-1 mt-[3.7rem] flex justify-center gap-7
      "
    >
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
          <input
            type="text"
            value={form.username}
            onChange={handleChange}
            id="username"
            placeholder="input your username"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none w-full"
          />
          {errorUsername && error && (
            <span className="block ml-3 italic text-red-500">error</span>
          )}
        </div>
        <div>
          <input
            type="text"
            value={form.password}
            onChange={handleChange}
            id="password"
            placeholder="input your password"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none w-full"
          />
          {errorPassword && error && (
            <span className="block ml-3 italic text-red-500">error</span>
          )}
        </div>
        <div>
          <input
            type="text"
            value={form.password2}
            onChange={handleChange}
            id="password2"
            placeholder="confirm your password"
            className="rounded-lg outline-none text-black p-3 bg-black/10 dark:bg-slate-100 border-none w-full"
          />
          {errorPassword2 && error && (
            <span className="block ml-3 italic text-red-500">error</span>
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
