import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="sticky top-0 z-40 w-full lg:w-[85%] xl:w-[70%] py-3 px-4 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-nowrap shadow rounded-md">
        <div className="">
          <Link href={"#"}>MusicCart</Link>
        </div>
        <div className="w-full md:w-[50%]">
          <form>
            <input
              type="search"
              name=""
              id=""
              placeholder="Search for artist, album, or track"
              className={` hover:shadow-inner focus:shadow-inner placeholder-gray-400 w-full md:w-96 h-8 rounded pl-3 ${styles["search-icon"]}`}
            />
          </form>
        </div>
        <div className="flex gap-6">
          <button>Sign up</button>
          <button>Log in</button>
        </div>
      </div>
    </div>
  );
}
