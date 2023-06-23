import prisma from "../db";

export const followUser = async (req, res, next) => {
  try {
    await prisma.follows.create({
      data: {
        followerId : req.user.id,
        followingId: req.body.followingId
      }
    });

    res.status(200).json({ message: "Successful" });
  } catch (err) {
    next(err);
  }
}