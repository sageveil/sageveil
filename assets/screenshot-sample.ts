import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "./db";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(120),
  body: z.string().min(1),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

type CreatePost = z.infer<typeof CreatePostSchema>;

interface Post extends CreatePost {
  id: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const router = express.Router();

router.get("/posts", async (req: Request, res: Response) => {
  const { tag, limit = "20", offset = "0" } = req.query;

  const posts = await db.post.findMany({
    where: tag ? { tags: { has: String(tag) } } : undefined,
    orderBy: { createdAt: "desc" },
    take: Math.min(Number(limit), 100),
    skip: Number(offset),
  });

  res.json({ data: posts, count: posts.length });
});

router.post("/posts", requireAuth, async (req: Request, res: Response) => {
  const parsed = CreatePostSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: parsed.error.flatten() });
    return;
  }

  const post = await db.post.create({
    data: { ...parsed.data, authorId: req.user.id },
  });

  res.status(201).json(post);
});

router.delete("/posts/:id", requireAuth, async (req: Request, res: Response) => {
  const post = await db.post.findUnique({ where: { id: req.params.id } });

  if (!post) {
    res.status(404).json({ error: "not found" });
    return;
  }
  if (post.authorId !== req.user.id) {
    res.status(403).json({ error: "forbidden" });
    return;
  }

  await db.post.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
