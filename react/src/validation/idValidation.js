import Joi from "joi";

import validation from "./validation";
const idCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});
const validateIdCardParamsSchema = (userInput) =>
  validation(idCardParamsSchema, userInput);
export default validateIdCardParamsSchema;
