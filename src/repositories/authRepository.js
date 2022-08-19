import connection from "../dbStrategy/postgres.js";

async function signUp(email, encryptedPassword, username, pictureUrl) {
    return connection.query(`INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`, [email, encryptedPassword, username, pictureUrl]);
}

async function verifyExistingUser(email) {
    return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

async function signIn(id, token) {
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);
}

async function signOut(token) {
    return connection.query(`DELETE FROM sessions WHERE token = $1;`, [token])
}

export const authRepository = {
	signUp,
    verifyExistingUser,
    signIn,
    signOut
}