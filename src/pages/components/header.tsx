import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <header className="w-full h-[70px] text-white bg-slate-900 dark:bg-slate-200 p-1 fixed z-[1000] flex justify-between  ">
      <Image
        src="/public/logotipo.avif"
        width={300}
        height={300}
        alt="picture from the project"
        className="block"
      />
      <Link href="https://www.github.com/pascoalkahamba" className="block">
        my profile
      </Link>
      <Image
        src="/public/sun.svg"
        width={100}
        height={100}
        alt="here look the photo theme"
        className="block"
      />
    </header>
  );
};

export default Header;
