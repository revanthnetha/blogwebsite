import z from "zod";

export const signUpSchema = z.object({
  name: z.string().optional(),
  password: z.string(),
  email: z.string().email(),
});

export type signUpType = z.infer<typeof signUpSchema>

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signInType = z.infer<typeof signinSchema>

export const blogAddSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

export type blogAddType = z.infer<typeof blogAddSchema>

export const blogUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export type blogUpdateType = z.infer<typeof blogUpdateSchema>