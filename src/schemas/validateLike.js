import joi from "joi";

export default async function validateLike(req, res, next) {
    const like = req.body;

    const likeSchema = joi.object({
        postId: joi.number().required(),
        userId: joi.number().required()
    });

    const validation = likeSchema.validate(like, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    next();
}