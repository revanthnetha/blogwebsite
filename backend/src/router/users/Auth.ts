// import { Hono } from "hono";
// import { signup,signin } from "../../controllers/Auth";
// import { z } from "zod";

// const signUpSchema = z.object({
//   username: z.string(),
//   password: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
// });

// const signInSchema = z.object({
//   username: z.string(),
//   password: z.string(),
// });

// const app = new Hono();

// app.post("/signup", async (c) => {
//   const { success } = signUpSchema.safeParse(c.req);
//   if (!success) {
//     return c.json({ error: "Invalid inputs" });
//   }
//   const { username, password, firstName, lastName } = c.req.body;
//   const result = await signup(username, password, firstName, lastName);
//   if (result) {
//     return c.json({ message: "User created successfully" });
//   }
//   return c.json({ error: "Failed to create user" });
// });

// app.post("/signin", async (c) => {
//   const { success } = signInSchema.safeParse(c.req);
//   if (!success) {
//     return c.json({ error: "Invalid inputs" });
//   }
//   const { username, password } = c.req.body;
//   const result = await signin(username, password);
//   if (result) {
//     return c.json({ message: "User logged in successfully" });
//   }
//   return c.json({ error: "Failed to login user" });
// });

// export default app;
