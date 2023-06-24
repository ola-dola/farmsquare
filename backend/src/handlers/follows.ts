import prisma from "../db";

export const followUser = async (req, res, next) => {
  try {
    await prisma.follows.create({
      data: {
        followerId: req.user.id,
        followingId: req.body.followingId
      }
    });

    res.status(200).json({ message: "Successful" });
  } catch (err) {
    next(err);
  }
}

export const fetchAllUserFollowings = async (req, res, next) => {
  // The people I follow
  try {
    const myFollowings = await prisma.follows.findMany({
      where: {
        followerId: req.user.id,
      },
      select: {
        followerId: false,
        followingId: false,
        following: {
          select: {
            username: true,
            email: true,
            name: true,
            id: true,
          },
        }
      }
    });

    const data = myFollowings.map((following) => following.following)

    res.status(200).json({ message: 'Successful', data })
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export const fetchAllUserFollowers = async (req, res, next) => {
  // the people following me
  try {
    const myFollowers = await prisma.follows.findMany({
      where: {
        followingId: req.user.id,
      },
      select: {
        followerId: false,
        followingId: false,
        follower: {
          select: {
            username: true,
            email: true,
            name: true,
            id: true,
          },
        }
      }
    });

    const data = myFollowers.map((follower) => follower.follower)

    res.status(200).json({ message: 'Successful', data })
  } catch (err) {
    console.error(err);
    next(err);
  }
}