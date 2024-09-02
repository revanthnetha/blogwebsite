import { verify } from "hono/jwt";
import { MiddlewareHandler } from "hono";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) {
    return c.json("Send the token", 401);
  }
  const token = header.split(" ")[1];
  const decoded = await verify(token, c.env.SECRET_KEY);
  if (!decoded) {
    return c.json("Invalid token", 401);
  }
  c.set("userId", decoded.id);
  await next();
};
