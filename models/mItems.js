import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const itemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  tags: {
    type: [String], // Array de strings
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    depth: {
      type: Number,
    },
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
  },
  reviews: [
    {
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      date: {
        type: Date,
      },
      reviewerName: {
        type: String,
      },
      reviewerEmail: {
        type: String,
      },
    },
  ],
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
  },
  meta: {
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    barcode: {
      type: String,
    },
    qrCode: {
      type: String,
    },
  },
  images: {
    type: [String], // Array de strings para las URLs de las imágenes
  },
  thumbnail: {
    type: String,
  },
});

const Sale = mongoose.model("Sale", salesSchema);
const Items = mongoose.model("Items", itemsSchema);

const mItems = {
  getAll: async (query) => {
    try {
      if (!query) {
        return await Items.find();
      }

      const numberQuery = Number(query);
      let results;

      if (isNaN(numberQuery)) {
        // Si es un texto, realiza una búsqueda de texto en varios campos.
        results = await Items.find({
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { tags: { $in: [query] } }, // Búsqueda en los tags
            { sku: { $regex: query, $options: "i" } },
            { availabilityStatus: { $regex: query, $options: "i" } },
          ],
        });
      } else {
        // Si es un número, busca en los campos numéricos.
        results = await Items.find({
          $or: [{ price: numberQuery }],
        });
      }

      return results;
    } catch (error) {
      throw { status: 500, message: error.message };
    }
  },
  getOne: async (id) => {
    try {
      let result = await Items.findById(id);
      return result;
    } catch (error) {
      throw { status: 500, message: "Error al obtener el item con id " + id };
    }
  },
  addsale: async (id) => {
    try {
      const newSale = new Sale({
        itemId: id,
        date: Date.now(),
      });
      let item = await Items.findById(id);
      if (item.stock > 0) {
        item.stock = item.stock - 1;
        await newSale.save();
      } else {
        return false;
      }
      await Items.findByIdAndUpdate(id, {
        stock: item.stock,
      });
      return true;
    } catch (error) {
      throw { status: 500, message: "Error al crear item" };
    }
  },
  sales: async () => {
    try {
      const results = await Sale.find();
      return results;
    } catch (error) {
      throw { status: 500, message: "Error al actualizar item" };
    }
  },
  create: async (item) => {
    try {
      const newItem = new Items(item);
      await newItem.save();
      return newItem;
    } catch (error) {
      throw { status: 500, message: "Error al crear item" };
    }
  },
};

export default mItems;
