import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
import { LogIn, LogInIcon, LogOutIcon } from "lucide-react";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const username = "pascoal Kahamba";

  return (
    <header className="w-full h-[60px] text-white bg-slate-900 dark:bg-slate-600 p-1 fixed z-[1000] flex justify-between items-center">
      <Link href="/">
        <a className="block">
          <Image
            src="/logotipo.avif"
            width={50}
            height={50}
            alt="picture from the project"
            className="hidden rounded-lg"
          />
        </a>
      </Link>
      <div className="flex gap-1">
        <p>Login</p>
        <Link href="./login" target="_blank">
          <LogInIcon className="block cursor-pointer" />
        </Link>
      </div>

      {currentTheme === "dark" ? (
        <Image
          src="/moon.svg"
          width={40}
          height={40}
          alt="here look the photo theme"
          onClick={() => setTheme("light")}
          className="block cursor-pointer hover:bg-slate-700 transition-all rounded-lg"
        />
      ) : (
        <Image
          src="/sun.svg"
          width={40}
          height={40}
          onClick={() => setTheme("dark")}
          alt="here look the photo theme"
          className="block cursor-pointer hover:bg-slate-800 transition-all rounded-lg"
        />
      )}
    </header>
  );
};

export default Header;
