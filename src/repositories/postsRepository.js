import connection from "../dbStrategy/postgres.js";

async function publishPost(userId, text, link, linkTitle, linkDescription, linkImage) {
    return connection.query(`INSERT INTO posts ("userId", text, link, "linkTitle", "linkDescription", "linkImage") VALUES ($1, $2, $3, $4, $5, $6)`, [userId, text, link, linkTitle, linkDescription, linkImage]);
}

async function getAllPosts(){
    return connection.query(`SELECT posts.id AS "postId", posts."userId", text, link, "linkTitle", "linkDescription", "linkImage", users.username, users."pictureUrl" AS "userPicture" 
    FROM posts 
    JOIN users ON posts."userId" = users.id 
    ORDER BY posts."createdAt" DESC LIMIT 20`);
}   

async function verifyExistingPost(id) {
    return connection.query(`SELECT * FROM posts WHERE id = $1`, [id]);
}

async function updatePost(text, id) {
    return connection.query(`UPDATE posts SET text =$1 WHERE id = $2`, [text, id]);
}

async function deletePost(id){
    return connection.query(`DELETE FROM posts WHERE id = $1`,[id]);
}

async function verifyExistingUser(userId) {
    return connection.query(`SELECT * FROM users WHERE id = $1`, [userId]);
}

async function getPostsByUserId(userId) {
    return connection.query(`SELECT posts.id AS "postId", posts."userId", text, link, "linkTitle", "linkDescription", "linkImage", users.username, users."pictureUrl" AS "userPicture" 
    FROM posts 
    JOIN users ON posts."userId" = users.id 
    WHERE "userId" = $1 
    ORDER BY posts."createdAt" DESC LIMIT 20`, [userId]);
}

async function verifyIfUserLikedPost(postId, userId) {
    return connection.query(`SELECT * FROM likes WHERE "postId"= $1 AND "userId" = $2`, [postId, userId]);
}

async function addLike(postId, userId) {
    return connection.query(`INSERT INTO likes ("postId", "userId") VALUES ($1, $2)`, [postId, userId]);
}

async function removeLike(postId, userId) {
    return connection.query(`DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2`, [postId, userId]);
}

async function getLikesByPostId(postId) {
    return connection.query(`SELECT users.username, likes."userId", likes."postId" 
    FROM likes 
    JOIN users ON users.id = likes."userId"
    WHERE "postId" = $1`, [postId]);
}

const postsRepository = {
    publishPost,
    getAllPosts,
    verifyExistingPost,
    updatePost,
    deletePost,
    verifyExistingUser,
    getPostsByUserId,
    verifyIfUserLikedPost,
    addLike,
    removeLike,
    getLikesByPostId
}

export default postsRepository;