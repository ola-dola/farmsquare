import { Router } from "express"

import { createPost, fetchMyFeed } from "./handlers/posts";
import { createPostSchema, followUserSchema } from "./utils/validators";
import { checkForSelfFollowingAttempt, checkIfAlreadyFollowing, checkIfUserExists, validateObjects } from "./utils/middlewares";
import { followUser, fetchAllUserFollowings, fetchAllUserFollowers } from "./handlers/follows";

const router = Router()

/**
 * Posts
 */
router.post("/posts/create", validateObjects(createPostSchema), createPost);
router.get("/posts/myfeed", fetchMyFeed);

/**
 * Follows
 */

router.post(
  "/follows/create",
  [validateObjects(followUserSchema), checkForSelfFollowingAttempt, checkIfUserExists, checkIfAlreadyFollowing],
  followUser
);

router.get("/follows/myfollowings", fetchAllUserFollowings)

router.get("/follows/myfollowers", fetchAllUserFollowers)

export default router;