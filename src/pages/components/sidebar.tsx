import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";

const Sidebar = () => {
  const {
    global: { name, age },
  } = useGlobalContext();

  return (
    <section className="flex-1 mt-[5rem] bg-gray-500">
      Hello people my name is {name} and I am {age} year old
    </section>
  );
};

export default Sidebar;
