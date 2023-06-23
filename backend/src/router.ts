import { Router } from "express"
import { createPost } from "./handlers/posts";
import { validateObjects } from "./utils/middlewares";
import { createPostSchema } from "./utils/validators";

const router = Router()

/**
 * Posts
 */
router.post("/posts/create", validateObjects(createPostSchema), createPost);

/**
 * Comments
 */

export default router;