import { Products } from "../model/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      res.status(404).json({ message: `Cannot get product with id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    if (!name || !quantity || !price) {
      res.status(400).json({ message: "Please fill all the required!" });
    }
    const products = await Products.create(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Products.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!products) {
      return res.status(404).json({ message: "Cannot update the user " });
    }

    return res
      .status(200)
      .json({ message: "Product update successfull", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await Products.findByIdAndDelete(id);

    if (!products) {
      return res.status(404).json({ message: "Product not found!!" });
    }

    return res.status(200).json({ message: "Product delete sucessfull!!",products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
