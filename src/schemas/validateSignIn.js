import joi from "joi";

export default async function validateSignIn(req, res, next) {
    const login = req.body;

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    
    const validation = loginSchema.validate(login, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    next();
}