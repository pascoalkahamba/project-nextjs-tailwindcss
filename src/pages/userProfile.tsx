import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";
import { LogOutIcon, HomeIcon, NewspaperIcon } from "lucide-react";

const UserProfile = () => {
  const {
    global: { currentUser, page, setCurrentUser, setLogin, login },
  } = useGlobalContext();

  return (
    <>
      <Head>
        <title>{page} | Fazer login</title>
      </Head>
      <div className=" flex self-start w-full justify-around items-center mt-3 ">
        <p className="font-bold text-4xl">Minha Conta</p>
        <div className="flex items-center gap-3 justify-between">
          <HomeIcon className="block  cursor-pointer p-[1px] dark:hover:bg-slate-700 transition-all rounded-md  hover:bg-slate-200" />
          <NewspaperIcon className="block  cursor-pointer p-[1px] dark:hover:bg-slate-700 transition-all rounded-md  hover:bg-slate-200" />
          <LogOutIcon className="block  cursor-pointer p-[1px] dark:hover:bg-slate-700 transition-all rounded-md hover:bg-slate-200" />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
