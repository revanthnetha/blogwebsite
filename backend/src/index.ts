import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().optional(),
  password: z.string(),
  email: z.string().email(),
});

const app = new Hono();

app.use(cors());

app.post("/api/v1/signup", async (c) => {
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
    const user = await prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email,
      },
    });
    c.status(200);
    return c.text("User Created");
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
});

app.post("/api/v1/signin", async (c) => {});

app.post("/api/v1/blog", async (c) => {});

app.put("/api/v1/blog", async (c) => {});

app.get("/api/v1/blog/:id", async (c) => {});

export default app;
