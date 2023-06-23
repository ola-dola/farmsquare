import prisma from "../db";

export const createPost = async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {
        content: req.body.content,
        photo: req.body.photo,
        authorId: req.user.id,
      }
    });

    res.status(200).json({ message: "Post created", post: post });
  } catch (err) {
    next(err);
  }
}