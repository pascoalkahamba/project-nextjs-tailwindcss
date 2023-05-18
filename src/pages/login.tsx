import CreateAccount from "./createAccount";
import Layout from "../components/layout";
import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";

const Login = () => {
  const {
    global: { page },
  } = useGlobalContext();
  return (
    <Layout>
      <Head>
        <title>{page} | login</title>
      </Head>
      <CreateAccount />
      {/* <TakeLogin /> */}
    </Layout>
  );
};

export default Login;
