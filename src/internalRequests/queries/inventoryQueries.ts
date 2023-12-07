import {
  addProduct,
  deleteProduct,
  getMyProducts,
  getProduct,
  getProducts,
  updateProduct,
} from "../resolvers/inventoryResolvers";

export const inventoryQueries = {
  getProducts,
  getProduct,
  getMyProducts,
};

export const inventoryMutation = {
    addProduct,
    updateProduct,
    deleteProduct,
}
