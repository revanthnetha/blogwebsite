import React from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/blog/FullBlog";
import Layout from "../Layout";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading || !blog) {
    return <>Loading...</>;
  }
  return (
    <div>
      <Layout>
        <FullBlog blog={blog} />
      </Layout>
    </div>
  );
};

export default Blog;
