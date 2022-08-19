import urlMetadata from "url-metadata";

import postsRepository from "../repositories/postsRepository.js";

export async function publishNewPost(req, res) {
    const { text, link } = req.body;
    const { userId } = res.locals.validToken;

    try {
        urlMetadata(link).then(
            async function (metadata) {
                await postsRepository.publishPost(userId, text, link, metadata.title, metadata.description, metadata.image);
                res.status(201).send("Post published successfully.");
            },

            async function (error) {
                res.status(500).send(error);
            }
        );
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function getAllPosts(req, res) {
    try {
        const { rows: posts } = await postsRepository.getAllPosts();

        res.status(200).send(posts);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function editPost(req, res) {
    const id = req.params.id;
    const { text } = req.body;
    const user = res.locals.validToken;

    try {
        const { rows: verifyExistingPost } = await postsRepository.verifyExistingPost(id);
        if (verifyExistingPost.length === 0) {
            res.status(404).send("The post you are trying to edit does not exist.");
            return;
        }

        if (user.userId !== verifyExistingPost[0].userId) {
            res.status(401).send("This user is not the author of this post.");
            return;
        }

        await postsRepository.updatePost(text, id);
        res.status(201).send("Post edited successfully.");
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function deletePost(req, res) {
    const id = req.params.id;
    const user = res.locals.validToken;

    try {
        const { rows: verifyExistingPost } = await postsRepository.verifyExistingPost(id);
        if (verifyExistingPost.length === 0) {
            res.status(404).send("The post you are trying to delete does not exist.");
            return;
        }

        if (user.userId !== verifyExistingPost[0].userId) {
            res.status(401).send("This user is not the author of this post.");
            return;
        }

        await postsRepository.deletePost(id);
        res.status(201).send("Post deleted successfully.");
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function getPostsByUserId(req, res) {
    const { userId } = req.params;

    try {
        const { rows: verifyExistingUser } = await postsRepository.verifyExistingUser(userId);
        if (verifyExistingUser.length === 0) {
            res.status(404).send("User not found.");
            return;
        }

        const { rows: getUserPosts } = await postsRepository.getPostsByUserId(userId);

        const formatedResponse = {
            username: verifyExistingUser[0].username,
            userPicture: verifyExistingUser[0].pictureUrl,
            posts: getUserPosts
        };

        res.status(200).send(formatedResponse);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function addLike(req, res) {
    const { postId, userId } = req.body;

    try {
        const { rows: postWasLikedByUser } = await postsRepository.verifyIfUserLikedPost(postId, userId);
        if (postWasLikedByUser.length === 0) {
            await postsRepository.addLike(postId, userId);
            res.status(200).send("Post liked successfully.");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function removeLike(req, res) {
    const postId = req.params.postId;
    const { userId } = res.locals.validToken;

    try {
        const { rows: postWasLikedByUser } = await postsRepository.verifyIfUserLikedPost(postId, userId);
        if (postWasLikedByUser.length > 0) {
            await postsRepository.removeLike(postId, userId);
            res.status(201).send("Post disliked successfully.");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function getLikesByPostId(req, res) {
    const postId = req.params.postId;

    try {
        const { rows: likesByPostId } = await postsRepository.getLikesByPostId(postId);

        res.status(200).send(likesByPostId);

    }
    catch (error) {
        res.status(500).send(error);
    }
}
