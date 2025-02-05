import Joi from "joi";

export const categoryValid = Joi.object({
  category_name: Joi.string().min(3).max(100).required(),
});
