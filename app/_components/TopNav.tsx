"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill, BsPerson } from "react-icons/bs";
import { TbHome, TbTruckReturn } from "react-icons/tb";
import { MdFavorite, MdOutlineSocialDistance } from "react-icons/md";
import { GiColombianStatue } from "react-icons/gi";

const TopNav = () => {
  const [sideNav, setSideNav] = useState(false);
  console.log(sideNav);

  return (
    <div className="max-w-[1520] mx-auto flex justify-between items-center p-4">
      <div className="flex items-center">
        <div onClick={() => setSideNav(!sideNav)} className="cursor-pointer">
          <AiOutlineMenu size={25} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 text-green">
          Plastikit
        </h1>
      </div>
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="search 3D models"
        />
      </div>
      <button className="bg-green-700 text-white hidden md:flex items-center py-2 rounded-full border-none">
        Sign in
      </button>
      {sideNav ? (
        <div
          className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0"
          onClick={() => setSideNav(!sideNav)}
        ></div>
      ) : (
        ""
      )}

      <div
        className={
          sideNav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300}></div"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setSideNav(!sideNav)}
          size={25}
          className="absolute right-4 top-4 cursor-pointer"
        />

        <h2 className="text-3xl p-4 text-green-800 font-bold">Plastikit</h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-700">
            <li className="text-xl py-4 flex">
              <BsPerson
                size={35}
                className="mr-4 text-white bg-black rounded-full"
              />
              My Account
            </li>
            <li className="text-xl py-4 flex">
              <TbHome
                size={35}
                className="mr-4 text-white bg-black rounded-full"
              />
              Home
            </li>
            <li className="text-xl py-4 flex">
              <GiColombianStatue
                size={35}
                className="mr-4 text-white bg-black rounded-full"
              />
              3D Models
            </li>
            <li className="text-xl py-4 flex">
              <MdFavorite
                size={35}
                className="mr-4 text-white bg-black rounded-full"
              />
              My Favorite
            </li>
            <li className="text-xl py-4 flex">
              <MdOutlineSocialDistance
                size={35}
                className="mr-4 text-white bg-black rounded-full"
              />
              About
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopNav;
