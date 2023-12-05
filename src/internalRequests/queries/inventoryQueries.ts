import {
  addProduct,
  getProduct,
  getProducts,
} from "../resolvers/inventoryResolvers";

export const inventoryQueries = {
  getProducts,
  getProduct,
};

export const inventoryMutation = {
    addProduct,
}
