import React from "react";
import { GlobalStorage } from "./components/globalStorage";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

const Index = () => {
  return (
    <GlobalStorage>
      <section className="w-full h-screen text-black-100 font-serif dark:bg-dark-500 flex flex-col">
        <Header />
        <Sidebar />
        <Footer />
      </section>
    </GlobalStorage>
  );
};

export default Index;
