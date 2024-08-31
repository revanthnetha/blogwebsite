import { Hono } from "hono";

export const BlogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        SECRET_KEY : string
    }
}>


BlogRouter.post("/api/v1/blog", async (c) => {});

BlogRouter.put("/api/v1/blog", async (c) => {});

BlogRouter.get("/api/v1/blog/:id", async (c) => {});
