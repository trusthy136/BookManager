import Joi from "joi";

export const NXBValid = Joi.object({
  nxb_name: Joi.string().min(3).max(100).required(),
});
