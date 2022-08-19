import joi from "joi";

export default async function validatePostEdit(req, res, next) {
    const text = req.body;

    const postSchema = joi.object({
        text: joi.string().min(0).required()
    });
    
    const validation = postSchema.validate(text, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    next();
}