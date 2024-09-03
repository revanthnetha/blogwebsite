import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-between p-3 border-b border-slate-400">
      <div className="flex justify-center flex-col cursor-pointer">
        <Link to={"/blog"}>Medium</Link>
      </div>
      <div>
        <Avatar type="nav" authorName="Revanth" email="bandirevanth143@gmail.com"/>
      </div>
    </div>
  );
};

export default Appbar;
