import { Hono } from "hono";
import { signIn, signUp } from "../../controllers/auth";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);
