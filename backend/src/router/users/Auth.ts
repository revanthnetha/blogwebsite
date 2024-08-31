import { Hono } from "hono";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { verify, sign } from "hono/jwt";

const saltRounds = 10;

const signUpSchema = z.object({
  name: z.string().optional(),
  password: z.string(),
  email: z.string().email(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

userRouter.post("signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ error: "Invalid request" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      c.status(400);
      return c.json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email,
      },
    });
    const token = await sign(
      {
        id: user.id,
        email: user.email,
      },
      c.env.SECRET_KEY
    );

    c.status(200);
    return c.json({ token });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ error: "Invalid request" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      c.status(400);
      return c.json({ error: "User not exists" });
    }
    const token = await sign(
      {
        id: user.id,
        email: user.email,
      },
      c.env.SECRET_KEY
    );
    c.status(200);
    return c.json({ token });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
});
