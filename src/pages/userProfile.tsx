import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";
import { LogOutIcon, HomeIcon, NewspaperIcon } from "lucide-react";
import Modal from "../components/modal";

const UserProfile = () => {
  const {
    global: { currentUser, page, setCurrentUser, setModal, login, modal },
  } = useGlobalContext();

  return (
    <>
      <Head>
        <title>{page} | Minha Conta</title>
      </Head>
      <div className=" flex self-start w-full justify-around items-center mt-3 ">
        <p className="font-bold text-4xl">Minha Conta</p>
        <div className="flex items-center gap-3 justify-between">
          <HomeIcon className="block  cursor-pointer p-[1px] dark:hover:bg-slate-700 transition-all rounded-md  hover:bg-slate-200" />
          <NewspaperIcon className="block  cursor-pointer p-[1px] dark:hover:bg-slate-700 transition-all rounded-md  hover:bg-slate-200" />
          <LogOutIcon
            onClick={() => setModal(true)}
            className="block cursor-pointer p-[1px] dark:hover:bg-slate-700 transition-all rounded-md hover:bg-slate-200"
          />
        </div>
      </div>
      {modal && <Modal typeModal="outLogin" />}
    </>
  );
};

export default UserProfile;
