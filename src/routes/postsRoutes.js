import { Router } from "express";
import { publishNewPost, getAllPosts, deletePost, editPost, getPostsByUserId, addLike, removeLike, getLikesByPostId } from "./../controllers/postsController.js"
import validateToken from "../middlewares/validateToken.js";
import validateNewPost from "../schemas/validateNewPost.js";
import validatePostEdit from "../schemas/validatePostEdit.js"; 
import validateLike from "../schemas/validateLike.js";

const router = Router();

router.post("/publish", validateToken, validateNewPost, publishNewPost);
router.get("/posts", getAllPosts);
router.put("/posts/edit/:id", validateToken, validatePostEdit, editPost);
router.delete("/posts/delete/:id", validateToken, deletePost);
router.get("/posts/:userId", getPostsByUserId);
router.post("/likes", validateToken, validateLike, addLike);
router.delete("/likes/:postId", validateToken, removeLike);
router.get("/likes/:postId", validateToken, getLikesByPostId);

export default router;