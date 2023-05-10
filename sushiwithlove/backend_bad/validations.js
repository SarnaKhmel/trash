import { body } from "express-validator";

export const registerValidation = [
  body("email", "bad email").isEmail(),
  body("password", "bad pass").isLength({ min: 6 }),
  body("fullName", "bad name").isLength({ min: 3 }),
  body("avatarUrl", "bad url").optional().isURL(),
];

export const loginValidation = [
  body("email", "bad email").isEmail(),
  body("password", "bad pass").isLength({ min: 6 }),
];

export const postCreateValidation = [
  body("title", "bad title").isLength({ min: 0 }).isString(),
  body("text", "bad text").isLength({ min: 0 }).isString(),
  body("imageUrl", "bad image url ").optional().isString(),
];

export const productsCreateValidation = [
  body("name", "bad name").isLength({ min: 3 }).isString(),
  body("text", "bad text").isLength({ min: 10 }).isString(),
  body("type", "bad type").isLength({ min: 3 }).isString(),
  body("sale", "bad sale").optional().isBoolean(),
  body("weight", "bad weight").optional().isLength({ min: 1 }).isString(),
  body("price", "bad price").optional().isLength({ min: 1 }).isString(),
  body("old_price", "bad text old_price")
    .optional()
    .isLength({ min: 1 })
    .isString(),
  body("imageUrl", "bad image url ").optional().isString(),
];
