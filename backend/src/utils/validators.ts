import Joi from "joi";

export const registrationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  accountType: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  bio: Joi.string().max(256),
})

export const signInSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
})

