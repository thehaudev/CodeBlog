import { ObjectId } from "mongoose";

// // validator user
const Joi = require("joi");

export const registerValidator = (data: any) => {
  const rule = Joi.object({
    display_name: Joi.string().max(225).required(),
    email: Joi.string().min(6).max(225).required().email(),
    //password a-z A-Z 6-20
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
  });

  return rule.validate(data);
};

export const passwordValidator = (data: any) => {
  const rule = Joi.object({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
  });

  return rule.validate(data);
};

export const displayNameValidator = (data: any) => {
  const rule = Joi.object({
    display_name: Joi.string().max(225).required(),
  });

  return rule.validate(data);
};

// export default validationMiddleware;

/////
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};
