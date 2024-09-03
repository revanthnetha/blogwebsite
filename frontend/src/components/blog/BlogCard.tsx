import React from "react";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

interface blogCardInputs {
  id: string;
  authorName: string;
  date: string;
  title: string;
  content: string;
}

const BlogCard = ({ id, authorName, date, title, content }: blogCardInputs) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
        <div className="flex gap-2">
          <Avatar type="blog" authorName="Revanth" />
          <div className="font-light pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {date}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {content.length / 100} minute(s){" "}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
