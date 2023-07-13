import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import useGlobalContext from "../hooks/useGlobalContext";
import { HomeIcon, NewspaperIcon, LogOutIcon } from "lucide-react";
import Modal from "../components/modal";
import Button from "../components/button";
import { HandleChangeProps, validateInput } from "./createAccount";
import { useRouter } from "next/router";
import { api } from "../config/axios";
import { PictureProps } from "../model/User";

type AddPhotosProps = React.FormEventHandler<HTMLFormElement> | undefined;
type HandlePictureChangeProps =
  | React.ChangeEventHandler<HTMLInputElement>
  | undefined;

const AddPhotos = () => {
  const [form, setForm] = useState({
    name: "",
    weight: 0,
    age: 0,
  });
  const [picture, setPicture] = useState<PictureProps | null>(null);
  const {
    global: { page, setError, setModal, modal, error },
  } = useGlobalContext();

  const regex = /^\d+$/;

  const handleChange: HandleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  function isNumber(number: number, regex: RegExp) {
    return regex.test(`${number}`);
  }

  const name = validateInput(form.name);
  const age = isNumber(form.age, regex);
  const weight = isNumber(form.weight, regex);
  const router = useRouter();

  const handlePictureChange: HandlePictureChangeProps = ({ target }) => {
    const file: File = (target.files && target.files[0]) as File;

    if (file) {
      const url: string = URL.createObjectURL(file);

      setPicture({
        preview: url,
        file: file,
      });
    }
  };

  function sendData({ preview, file }: PictureProps) {
    api.post("/users/sendPhoto", {
      preview,
      file,
    });
  }

  const addPhotos: AddPhotosProps = (event) => {
    event.preventDefault();
    if (name || !age || !weight) {
      setError(true);
    } else {
      setError(false);
      setForm({ name: "", weight: 0, age: 0 });
      // setPicture(null);
      if (picture?.preview)
        sendData({ preview: picture?.preview, file: picture?.file });
      router.push("/userProfile");
      alert("Dados enviados com sucesso!");
    }
  };
  console.log(form);
  console.log(picture);

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

      <form
        className="flex justify-evenly w-full items-center mb-3"
        onSubmit={addPhotos}
      >
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="name" className="ml-3">
              Nome
            </label>
            <input
              type="text"
              minLength={3}
              onChange={handleChange}
              value={form.name}
              id="name"
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
            {name && error && (
              <span className="block ml-3 italic text-red-500">
                Nome invalido.
              </span>
            )}
          </div>{" "}
          <div>
            <label htmlFor="weight" className="ml-3">
              Peso
            </label>
            <input
              type="number"
              id="weight"
              onChange={handleChange}
              value={form.weight}
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
            {!weight && error && (
              <span className="block ml-3 italic text-red-500">
                Digete um numero.
              </span>
            )}
          </div>{" "}
          <div>
            <label htmlFor="age" className="ml-3">
              Idade
            </label>
            <input
              type="number"
              id="age"
              onChange={handleChange}
              value={form.age}
              className="rounded-lg outline-none transition-all outline-0 hover:border-[2.5px] hover:border-blue-600  focus:border-blue-600 w-[97%] text-black p-3 bg-black/10 dark:bg-slate-100 border-transparent"
            />
            {!age && error && (
              <span className="block ml-3 italic text-red-500">
                Digete um numero.
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              className="cursor-pointer"
              onChange={handlePictureChange}
            />
          </div>
          <button
            type="submit"
            className="w-17 p-2 rounded-xl bg-blue-900 cursor-pointer self-start mb-2"
          >
            Adicionar
          </button>
        </div>

        <div
          style={{
            backgroundImage: `url("${picture?.preview && picture?.preview}")`,
          }}
          className="rounded-md bg-cover bg-center w-[45%] h-[98%]"
        ></div>
      </form>
    </section>
  );
};

export default AddPhotos;
