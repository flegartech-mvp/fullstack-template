import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

export const postsRouter = Router();

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

postsRouter.get("/", async (_req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (e) { next(e); }
});

postsRouter.post("/", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const body = PostSchema.parse(req.body);
    const post = await prisma.post.create({
      data: { ...body, authorId: req.userId! },
      include: { author: { select: { id: true, name: true } } },
    });
    res.status(201).json(post);
  } catch (e) { next(e); }
});

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) { res.status(400).json({ error: "Missing id" }); return; }
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    });
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    res.json(post);
  } catch (e) { next(e); }
});

postsRouter.patch("/:id", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    if (!id) { res.status(400).json({ error: "Missing id" }); return; }
    const body = PostSchema.partial().parse(req.body);
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (post.authorId !== req.userId) { res.status(403).json({ error: "Forbidden" }); return; }
    const updated = await prisma.post.update({ where: { id }, data: body });
    res.json(updated);
  } catch (e) { next(e); }
});

postsRouter.delete("/:id", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    if (!id) { res.status(400).json({ error: "Missing id" }); return; }
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) { res.status(404).json({ error: "Not found" }); return; }
    if (post.authorId !== req.userId) { res.status(403).json({ error: "Forbidden" }); return; }
    await prisma.post.delete({ where: { id } });
    res.status(204).send();
  } catch (e) { next(e); }
});
