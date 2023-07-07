import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { useRouter } from "next/router";

interface ButtonProps {
  name: "sair" | "cancelar";
}

const Button = ({ name }: ButtonProps) => {
  const {
    global: { modal, setModal, setLogin, login },
  } = useGlobalContext();

  const router = useRouter();

  function funOutLogin() {
    if (name === "sair") {
      setLogin(false);
      setModal(false);
      router.push("/login");
    } else {
      setModal(false);
    }
  }

  return (
    <button
      onClick={funOutLogin}
      className="w-17 p-2 rounded-xl bg-blue-700 text-dark-300 cursor-pointer"
    >
      {name}
    </button>
  );
};

export default Button;
