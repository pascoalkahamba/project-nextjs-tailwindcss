import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
import useGlobalContext from "../hooks/useGlobalContext";

const LostPassword = () => {
  const {
    global: { page },
  } = useGlobalContext();
  return (
    <Layout>
      <Head>
        <title>{page} | recuparar senha</title>
      </Head>
      <div className="flex-1 mt-[3.7rem] flex justify-center gap-7">
        lostPassword
      </div>
    </Layout>
  );
};

export default LostPassword;
