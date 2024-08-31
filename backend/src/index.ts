import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userRouter } from "./router/users/Auth";
import { BlogRouter } from "./router/blog/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

app.use(cors());

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",BlogRouter)


export default app;
