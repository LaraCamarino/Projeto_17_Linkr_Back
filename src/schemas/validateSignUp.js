import joi from "joi";

import connection from "../dbStrategy/postgres.js";

export default async function validateSignUp(req, res, next) {
    const newUser = req.body;
    const userNameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]{2,25}$/;
    const passwordRegex = /^.{8,}$/;

    const newUserSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(passwordRegex).required(),
        username: joi.string().pattern(userNameRegex).required(),
        pictureUrl: joi.string().required()     
    });

    const validation = newUserSchema.validate(newUser, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    const { rows: emailsInUse } = await connection.query("SELECT (email) FROM users");
    if (emailsInUse.some((user) => user.email === newUser.email)) {
        res.status(409).send("This e-mail is alrealdy in use.");
        return;
    }

    next();
}