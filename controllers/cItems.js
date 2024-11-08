import mItems from "../models/mItems.js";
import errors from "../middleware/error.js";

const cItems = {
  getItems: async (req, res) => {
    try {
      const query = req.query.q;
      const results = await mItems.getAll(query);
      res.status(200).json(results);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  getItem: async (req, res) => {
    try {
      const id = req.params.id;
      const results = await mItems.getOne(id);
      res.status(200).json(results);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  getSales: async (req, res) => {
    try {
      const results = await mItems.sales();
      res.status(200).json(results);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
  addSale: async (req, res) => {
    try {
      const id = req.body.id;
      const results = await mItems.addsale(id);
      res.status(200).json(results);
    } catch (error) {
      errors.e500(req, res, error);
    }
  },
};

export default cItems;
