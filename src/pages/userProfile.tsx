import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";
import { LogInIcon, LogOutIcon } from "lucide-react";

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
        <div className="flex items-center gap-2 justify-between">
          <LogOutIcon className="block cursor-pointer" />
          <LogInIcon className="block cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
