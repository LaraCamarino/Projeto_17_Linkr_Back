import connection from "../dbStrategy/postgres.js";

export default async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) {
        res.status(401).send("No token was sent.");
        return;
    }

    const { rows: verifyValidToken } = await connection.query("SELECT * FROM sessions WHERE token = $1", [token]);
    if (verifyValidToken.length === 0) {
        res.status(401).send("Invalid token.");
        return;
    }

    res.locals.validToken = verifyValidToken[0];

    next();
}