import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../resolvers/inventoryResolvers";

export const inventoryQueries = {
  getProducts,
  getProduct,
};

export const inventoryMutation = {
    addProduct,
    updateProduct,
    deleteProduct,
}
