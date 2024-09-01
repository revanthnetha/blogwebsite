import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { boolean, z } from "zod";

export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

const blogAddSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

const blogUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

BlogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) {
    return c.json("Send the token", 401);
  }
  const token = header.split(" ")[1];
  const decoded = await verify(token, c.env.SECRET_KEY);
  if (!decoded) {
    return c.json("Invalid token", 401);
  }
  //@ts-ignore
  c.set("userId", decoded.id);
  await next();
});

BlogRouter.post("/add", async (c) => {
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
});

BlogRouter.put("/update", async (c) => {
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
});

BlogRouter.get("/:id", async (c) => {
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
});

BlogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const posts = await prisma.post.findMany({
        orderBy: { title: 'desc' },
      });
  
      if (!posts || posts.length === 0) {
        console.log("No posts found");
        return c.json({ error: "No posts found" }, 404);
      }
  
      console.log(posts);
      return c.json({ postsOne: posts }, 200);
    } catch (e) {
      console.error("Error fetching posts:", e);
      return c.json({ error: e }, 400);
    }
  });
  
