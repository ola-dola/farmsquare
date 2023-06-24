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

export const fetchMyFeed = async (req, res, next) => {
  try {
    const following = await prisma.user.findFirst({
      where: { id: req.user.id },
      select: { following: { select: { followingId: true } } },
    });

    // see https://github.com/prisma/prisma/discussions/4936#discussioncomment-274291 
    // to include own posts as part of the feed.
    const posts = await prisma.post.findMany({
      where: {
        author: {
          id: { in: [...following.following.map((user) => user.followingId), req.user.id] },
        },
      }
    });

    res.status(200).json({ message: "Successful", posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
}