import React from "react";
import { GlobalStorage } from "./components/globalStorage";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

const Index = () => {
  return (
    <GlobalStorage>
      <section className="bg-black w-full h-full text-white font-serif">
        <Header />
        <Sidebar />
        <Footer />
      </section>
    </GlobalStorage>
  );
};

export default Index;
