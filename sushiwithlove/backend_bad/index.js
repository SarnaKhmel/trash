import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  productsCreateValidation,
  postCreateValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  UserController,
  ProductsController,
  PostController,
} from "./controllers/index.js";
import User from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://admin:NDQtU8psAZpxqmL9@crud.phfcxck.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Success connect DB!");
  })
  .catch((err) => {
    console.log("Error connecting DB(((", err);
  });

const app = express();
app.use(cors);
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/admin/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// User
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/admin/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/admin/me", checkAuth, UserController.getMe);

//products - user
app.get("/products", ProductsController.getAll);
app.get("/products/:id", ProductsController.getOne);

//products - admin
app.post(
  "/admin/products",
  checkAuth,
  productsCreateValidation,
  handleValidationErrors,
  ProductsController.create
);
app.delete("/admin/products/:id", checkAuth, ProductsController.remove);
app.patch(
  "/admin/products/:id",
  checkAuth,
  productsCreateValidation,
  handleValidationErrors,
  ProductsController.update
);

//Posts - user
app.get("/admin/posts", PostController.getAll);
app.get("/admin/posts/:id", PostController.getOne);

//Post-admin
app.post(
  "/admin/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/admin/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/admin/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

//Server
app.listen(1234, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK! Nice!");
});
