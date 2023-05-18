import validation from "./validation";
import Joi from "joi";

const logInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .max(10)
    .required(),
});
const logInValidationSchema = (userInput) => validation(logInSchema, userInput);
export default logInValidationSchema;
