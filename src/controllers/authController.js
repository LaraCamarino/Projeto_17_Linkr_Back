import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { authRepository } from "../repositories/authRepository.js";

export async function signUp(req, res) {
    const { email, password, username, pictureUrl } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        await authRepository.signUp(email, encryptedPassword, username, pictureUrl);
        res.status(201).send("User registered successfully.");
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const { rows: existingUser } = await authRepository.verifyExistingUser(email);
        if (existingUser.length === 0) {
            res.status(401).send("Incorrect e-mail or password.");
            return;
        }

        const verifyPassword = bcrypt.compareSync(password, existingUser[0].password);
        if (!verifyPassword) {
            res.status(401).send("Incorrect e-mail or password.");
            return;
        }

        if (existingUser && verifyPassword) {
            const token = uuid();

            await authRepository.signIn(existingUser[0].id, token);

            const userData = {
                token,
                userId: existingUser[0].id,
                userPicture: existingUser[0].pictureUrl
            }

            res.status(200).send(userData);
            return;
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function signOut(req, res) {
    const { token } = res.locals.validToken;

    try {
        await authRepository.signOut(token);
        res.status(200).send("User logged out successfully.");
    }
    catch (error) {
        res.status(500).send(error);
    }
}