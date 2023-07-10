import React from "react";
import Head from "next/head";
import Link from "next/link";
import useGlobalContext from "../hooks/useGlobalContext";
import { HomeIcon, NewspaperIcon, LogOutIcon } from "lucide-react";
import Modal from "../components/modal";
import Button from "../components/button";

const AddPhotos = () => {
  const {
    global: { currentUser, page, setCurrentUser, setModal, login, modal },
  } = useGlobalContext();

  return (
    <section className="flex  flex-col w-full gap-2 mt-3">
      <Head>
        <title>{page} | Poste Sua Foto</title>
      </Head>
      <div className=" flex self-start w-full justify-around items-center mt-3 ">
        <p className="font-bold text-4xl">Poste Sua Foto</p>
        <div className="flex items-center gap-3 justify-between">
          <Link href="/userProfile">
            <div className="w-10 cursor-pointer hover:bg-slate-400 p-2 dark:hover:bg-slate-800 transition-all rounded-lg bg-slate-600">
              <HomeIcon className="block" />
            </div>
          </Link>

          <div className="w-10 cursor-pointer hover:bg-slate-400 p-2 dark:hover:bg-slate-800 transition-all rounded-lg bg-slate-600">
            <NewspaperIcon className="block" />
          </div>
          <div className="w-10 cursor-pointer hover:bg-slate-400 p-2 dark:hover:bg-slate-800 transition-all rounded-lg bg-slate-600">
            <LogOutIcon onClick={() => setModal(true)} className="block" />
          </div>
        </div>
      </div>
      {modal && <Modal typeModal="outLogin" />}

      <form className="flex  gap-5 justify-around w-full items-center">
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="name" className="ml-3">
              Nome
            </label>
            <input
              type="text"
              minLength={6}
              id="name"
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
          </div>{" "}
          <div>
            <label htmlFor="heavy" className="ml-3">
              Peso
            </label>
            <input
              type="number"
              id="heavy"
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
          </div>{" "}
          <div>
            <label htmlFor="age" className="ml-3">
              Idade
            </label>
            <input
              type="number"
              id="age"
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
          </div>
          <div>
            <input type="file" className="cursor-pointer" />
          </div>
          <button className="w-17 p-2 rounded-xl bg-blue-900 cursor-pointer self-start mb-2">
            Adicionar
          </button>
        </div>
        <div className="bg-slate-400 rounded-md">
          <p>Image</p>
        </div>
      </form>
    </section>
  );
};

export default AddPhotos;
