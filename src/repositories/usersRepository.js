import connection from "../dbStrategy/postgres.js";

async function searchUsers(username) {
    return connection.query(`SELECT id AS "userId", username, "pictureUrl" FROM users WHERE username ILIKE $1`, [username + "%"]);}

export const usersRepository = {
    searchUsers
}
