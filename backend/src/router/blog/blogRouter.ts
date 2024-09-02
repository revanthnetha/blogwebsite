import { Hono } from "hono";
import { authMiddleware } from "../../middleware/authMiddleware";
import {
  blogUpdate,
  createBlog,
  getAllBlogs,
  getBlogbyId,
} from "../../controllers/blog";

export const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

BlogRouter.get("/bulk", getAllBlogs);

BlogRouter.use("/*", authMiddleware);

BlogRouter.post("/add", createBlog);

BlogRouter.put("/update", blogUpdate);

BlogRouter.get("/:id", getBlogbyId);
