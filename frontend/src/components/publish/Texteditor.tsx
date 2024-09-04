import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { blogAddType } from "bandirevanthblog";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

const Texteditor = () => {
  const [blogInput, setBlogInput] = useState<blogAddType>({
    title: "",
    content: "",
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlogInput({ ...blogInput, title: event.target.value });
  };

  const handleContentChange = (value: string) => {
    setBlogInput({ ...blogInput, content: value });
  };

  const handleSubmit = async () => {
    console.log(blogInput);
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        `${BACKEND_URL}/blog/add`,
        {
          title: blogInput.title,
          content: blogInput.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogInput({
        title: "",
        content: "",
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <input
        type="text"
        value={blogInput.title}
        onChange={handleTitleChange}
        placeholder="Enter Title"
        className="w-full mb-4 p-3 text-lg border border-gray-300 rounded"
      />
      <ReactQuill 
       value={blogInput.content}
        onChange={handleContentChange}
        className="mb-4 bg-white rounded shadow-sm"
        theme="snow"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default Texteditor;
