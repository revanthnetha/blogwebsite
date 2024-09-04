import React, { useState } from "react";
import { Link } from "react-router-dom";

const Avatar = ({
  type,
  authorName,
  email,
}: {
  type: "blog" | "nav";
  authorName: string;
  email?: string;
}) => {
  const [Isopen, setIsopen] = useState(false);

  const toggleDropdown = () => {
    setIsopen(!Isopen);
  };

  return (
    <div className="relative">
      {type === "blog" ? (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {authorName ? authorName[0] : ""}
          </span>
        </div>
      ) : (
        <div
          id="avatarButton"
          onClick={toggleDropdown}
          className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full cursor-pointer dark:bg-gray-600"
        >
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {authorName ? authorName[0] : ""}
          </span>
        </div>
      )}
      {Isopen && (
        <div
          id="userDropdown"
          className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{authorName}</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <Link
              onClick={() => {
                localStorage.removeItem("token");
              }}
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
