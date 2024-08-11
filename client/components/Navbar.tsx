import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="sticky top-0 z-40 w-full lg:w-[85%] xl:w-[70%] py-3 px-4 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-nowrap shadow rounded-md">
        <div className="flex gap-6 items-center">
          <Link href={"#"}>MusicCart</Link>
          <div className="flex gap-6 md:hidden">
            <button>Sign up</button>
            <button>Log in</button>
            <div className={styles.dropdown}>
              <Image
                src={"/dropButton.png"}
                width={"25"}
                height={"25"}
                alt="dropdown button"
              />
              <div className={styles["dropdown-content"]}>
                <ul>
                  <li>item 1</li>
                  <li>item 2</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <form>
            <input
              type="search"
              name=""
              id=""
              placeholder="Search for artist, album, or track"
              className={` text-gray-500 hover:shadow-inner focus:shadow-inner placeholder-gray-400 w-full md:w-96 h-8 rounded pl-3 pr-8 ${styles["search-icon"]}`}
            />
          </form>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <button>Sign up</button>
          <button>Log in</button>
          <ThemeSwitch />
          <div className={styles.dropdown}>
            <Image
              src={"/dropButton.png"}
              width={"25"}
              height={"25"}
              alt="dropdown button"
            />
            <div className={styles["dropdown-content"]}>
              <ul>
                <li>item 1</li>
                <li>item 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
