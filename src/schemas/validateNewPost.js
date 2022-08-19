import joi from "joi";

export default async function validateNewPost(req, res, next){
    const post = req.body;
    
    const newPostSchema = joi.object({
        link: joi.string().required(),
        text: joi.string().min(0).required()
    });   
    
    const validation = newPostSchema.validate(post, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    next();
}