import Layout from "../components/layout";
import useGlobalContext from "../hooks/useGlobalContext";
import { LogInIcon, LogOutIcon } from "lucide-react";

const UserProfile = () => {
  const {
    global: { currentUser, setCurrentUser, setLogin, login },
  } = useGlobalContext();

  return (
    <div className="flex self-start justify-center items-center">
      <p>Minha Conta</p>
      <div className="flex items-center gap-2">
        <LogOutIcon className="block cursor-pointer" />
        <LogInIcon className="block cursor-pointer" />
      </div>
    </div>
  );
};

export default UserProfile;
