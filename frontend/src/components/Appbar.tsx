import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-between p-3 border-b border-slate-400">
      <div className="flex justify-center flex-col cursor-pointer">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div className="flex gap-2">
        <Link to={"/publish"}>
          <Button />
        </Link>
        <Avatar
          type="nav"
          authorName="Revanth"
          email="bandirevanth143@gmail.com"
        />
      </div>
    </div>
  );
};

export function Button() {
  return (
    <>
      <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
        New
      </button>
    </>
  );
}

export default Appbar;
