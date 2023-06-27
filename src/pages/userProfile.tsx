import Layout from "../components/layout";
import useGlobalContext from "../hooks/useGlobalContext";

const UserProfile = () => {
  const {
    global: { currentUser, setCurrentUser, setLogin, login },
  } = useGlobalContext();

  // setCurrentUser({ name: currentUser.name, state: "online" });
  console.log(login);
  console.log(currentUser);

  return (
    <Layout>
      <div className="flex-1 mt-[3.7rem] flex gap-7">
        <p>Over here look the user photos</p>
      </div>
    </Layout>
  );
};

export default UserProfile;
