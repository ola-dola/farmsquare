import { Router } from "express"
import { createPost } from "./handlers/posts";
import { checkForSelfFollowingAttempt, checkIfAlreadyFollowing, checkIfUserExists, validateObjects } from "./utils/middlewares";
import { createPostSchema, followUserSchema } from "./utils/validators";
import { followUser } from "./handlers/follows";

const router = Router()

/**
 * Posts
 */
router.post("/posts/create", validateObjects(createPostSchema), createPost);

/**
 * Follows
 */

router.post(
  "/follows",
  [validateObjects(followUserSchema), checkForSelfFollowingAttempt, checkIfUserExists, checkIfAlreadyFollowing],
  followUser
);

export default router;