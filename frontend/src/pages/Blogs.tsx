import React from "react";
import Layout from "../Layout";
import { useBlogs } from "../hooks";
import BlogCard from "../components/blog/BlogCard";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const { loading, Blogs } = useBlogs();
  if (loading) {
    return <>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    <Skeleton/>
    </>;
  }
  return (
    <div>
      <Layout>
        <div className="flex flex-col justify-center items-center">
        {Blogs.map((blog) => {
          return (
            <>
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                date="20/08/24"
              />
            </>
          );
        })}
        </div>
      </Layout>
    </div>
  );
};

export default Blogs;
