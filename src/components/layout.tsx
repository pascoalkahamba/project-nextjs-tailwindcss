import React from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="w-full h-screen text-black-100 font-serif flex flex-col">
      <Header />
      <div className="flex-1 mt-[3.7rem] flex gap-7">{children}</div>
      <Footer />
    </section>
  );
};

export default Layout;
