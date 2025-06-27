import Product from "../../models/productSchema.js";

// GET PRODUCTS BY QUERY PARAMS
export const getByQueryParams = async (req, res) => {
  const { name, price, year } = req.query;
  const filter = {};

  if (name) filter.name = name;
  if (price) filter.price = price;
  if (year) filter.year = year; // Only include if your schema has "year"

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};