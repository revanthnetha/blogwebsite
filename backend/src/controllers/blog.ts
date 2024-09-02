import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogAddSchema, blogUpdateSchema } from "bandirevanthblog";
import { Context } from "hono";

// Create the blog
export const createBlog = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = blogAddSchema.safeParse(body);
  if (!success) {
    return c.json("Missing Required Fields", 400);
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userId,
      },
    });
    return c.json({ msg: "Post Created Successfully", id: post.id }, 200);
  } catch (e) {
    return c.json({ error: e }, 400);
  }
};

//   update the blog
export const blogUpdate = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = blogUpdateSchema.safeParse(body);
  if (!success) {
    return c.json("Missing Required Fields", 400);
  }
  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    return c.json({ msg: "Post Updated Successfully", id: post.id }, 200);
  } catch (e) {
    return c.json({ error: e }, 400);
  }
};

//   get the Blog by Id
export const getBlogbyId = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const id = c.req.param("id");
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
    return c.json({ post: post }, 200);
  } catch (e) {
    return c.json({ error: e }, 400);
  }
};

//   get all blogs : Add pagination
export const getAllBlogs = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      orderBy: { title: "desc" },
    });

    if (!posts || posts.length === 0) {
      console.log("No posts found");
      return c.json({ error: "No posts found" }, 404);
    }

    return c.json({ posts: posts }, 200);
  } catch (e) {
    console.error("Error fetching posts:", e);
    return c.json({ error: e }, 400);
  }
};
