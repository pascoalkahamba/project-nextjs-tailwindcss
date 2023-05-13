import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[70px] text-white bg-slate-900 dark:bg-slate-200 p-1">
      <Image
        src="/public/logotipo.avif"
        width={300}
        height={300}
        alt="picture from the project"
      />
    </header>
  );
};

export default Header;
