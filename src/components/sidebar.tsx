import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import Head from "next/head";

const Sidebar = () => {
  const {
    global: { page },
  } = useGlobalContext();

  return (
    <section>
      <Head>
        <title>{page} inicial</title>
      </Head>
      Hello people my name is Pascoal Kahamba and I am 21 year old
    </section>
  );
};

export default Sidebar;
