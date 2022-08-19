
import { usersRepository } from "../repositories/usersRepository.js";


export async function getUserByName(req, res) {
    let username = req.params.user;
    username = username.toLowerCase();

    try {
        const { rows: users } = await usersRepository.searchUsers(username);

        if (users.length === 0) {
            res.status(404).send("No user found.");
            return;
        }

        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
}