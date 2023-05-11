import React from "react";
import { GlobalStorage } from "./components/globalStorage";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

const Index = () => {
  return (
    <GlobalStorage>
      <Header />
      <Sidebar />
      <Footer />
    </GlobalStorage>
  );
};

export default Index;
