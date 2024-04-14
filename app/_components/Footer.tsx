import React from "react";
import { FaDribbbleSquare, FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-[1520px] m-auto px-4 py2 bg-[#c7bcbb]">
      <div className="py-16 px-4 grid lg:grid-cols3 gap-8 text-black-300">
        <div>
          <h1 className="w-full text-3xl font-bold text-green-500">
            Plastikit
          </h1>
          <p>rerevrevvrvvrdvfdvdfvdfvdfvdfvervr svffdvfdvdfvdf dfvfddfv</p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaDribbbleSquare size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
