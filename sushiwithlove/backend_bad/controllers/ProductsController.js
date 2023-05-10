import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Product from "../models/Product.js";

//user
export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        message: "Cant find products",
      });
  }
};

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;
    const doc = await Product.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        returnDocument: "after",
      }
    );
    if (!doc) {
      return res.status(404).json({
        message: "Error, cant found product",
      });
    }
    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant find product",
    });
  }
};

//admin
export const create = async (req, res) => {
  try {
    const doc = new Product({
      name: req.body.name,
      text: req.body.text,
      type: req.body.type,
      sale: req.body.sale,
      weight: req.body.weight,
      price: req.body.price,
      old_price: req.body.old_price,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const product = await doc.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500),
      json({
        message: "Cant create product",
      });
  }
};

export const remove = async (req, res) => {
  try {
    const productId = req.params.id;
    const doc = await Product.findOneAndDelete({
      _id: productId,
    });

    if (!doc) {
      return res.status(404).json({
        message: "Error, cant found post",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can`t remove product",
    });
  }
};

export const update = async (req, res) => {
  try {
    const productId = req.params.id;
    const doc = await Product.updateOne(
      {
        _id: productId,
      },
      {
        name: req.body.name,
        text: req.body.text,
        sale: req.body.sale,
        weight: req.body.weight,
        price: req.body.price,
        old_price: req.body.old_price,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json(doc);
  } catch (error) {
    res.status(500).json({
      message: "Cant update product",
    });
  }
};
