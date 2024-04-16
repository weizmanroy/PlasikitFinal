import React from "react";
import { FaDribbbleSquare, FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 py-2 bg-[#d1dad1]">
      <div className="max-w-[1520px] mx-auto py-16 grid lg:grid-cols-3 gap-8 text-black-300">
        <div>
          <h1 className="w-full text-3xl font-bold text-green-500">
            Plastikit
          </h1>
          <p>rerevrevvrvvrdvfdvdfvdfvdfvdfvervr svffdvfdvdfvdf dfvfddfv</p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaDribbbleSquare size={30} />
            {/* You can add more social icons here */}
            <FaGithubSquare size={30} />
          </div>
        </div>
        <div className="col-span-2">
          <div>© 2023 Copyright Plastikit - Koren Halevie & Roy Weizman</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
