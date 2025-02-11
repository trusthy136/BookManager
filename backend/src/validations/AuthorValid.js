import Joi from "joi";

export const authorValid = Joi.object({
  author_name: Joi.string().min(3).max(100).required(),
});
