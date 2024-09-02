import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, sign } from "hono/jwt";
import { hashPassword, verifyPassword } from "../router/users/hashing";
import { signUpSchema, signinSchema } from "bandirevanthblog";
import { Context } from "hono";

export const signUp = async (c: Context) => {
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

    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        password: hashedPassword,
        email: body.email,
      },
    });
    const token = await sign(
      {
        id: user.id,
      },
      c.env.SECRET_KEY
    );

    c.status(200);
    return c.json({ token });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
};

export const signIn = async (c: Context) => {
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
    const verifiedPassword = await verifyPassword(body.password, user.password);
    if (!verifiedPassword) {
      c.status(400);
      return c.json({ error: "User Password not match" });
    }
    const token = await sign(
      {
        id: user.id,
      },
      c.env.SECRET_KEY
    );
    c.status(200);
    return c.json({ token });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
};
