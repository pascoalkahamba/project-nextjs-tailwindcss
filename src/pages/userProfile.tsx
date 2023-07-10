import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";
import { LogOutIcon, HomeIcon, NewspaperIcon } from "lucide-react";
import Link from "next/link";
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
          <div className="w-10 cursor-pointer hover:bg-slate-400 p-2 dark:hover:bg-slate-800 transition-all rounded-lg bg-slate-600">
            <HomeIcon className="block  p-[1px]" />
          </div>
          <Link href="/addPhotos">
            <div className="w-10 cursor-pointer hover:bg-slate-400 p-2 dark:hover:bg-slate-800 transition-all rounded-lg bg-slate-600">
              <NewspaperIcon className="block" />
            </div>
          </Link>
          <div className="w-10 cursor-pointer hover:bg-slate-400 p-2 dark:hover:bg-slate-800 transition-all rounded-lg bg-slate-600">
            <LogOutIcon onClick={() => setModal(true)} className="block" />
          </div>
        </div>
      </div>
      {modal && <Modal typeModal="outLogin" />}
    </>
  );
};

export default UserProfile;
