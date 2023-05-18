import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";

const Sidebar = () => {
  const {
    global: { page },
  } = useGlobalContext();

  return (
    <section className="flex-1 mt-[3.7rem] ">
      Hello people my name is Pascoal Kahamba and I am 21 year old
    </section>
  );
};

export default Sidebar;
