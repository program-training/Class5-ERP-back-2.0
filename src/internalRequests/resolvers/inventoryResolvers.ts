import { GraphQLError } from "graphql";
import { verifyToken } from "../../auth/model/jwt/jwt";
import {
  getProductByIdService,
  getAllProductsService,
  addNewProductService,
  updateProductService,
  deleteProductByIdService,
} from "../service/internalService";
import { graphQlAuthCheck } from "../../utils/grapqlAuthCheck";

export const getProducts = async (_parent: any, _args: any, { token }: any) => {
  try {
    graphQlAuthCheck(token);
    const products = await getAllProductsService();
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProduct = async (_: any, args: any, {token}: any) => {
  try {
    graphQlAuthCheck(token);
    const { id } = args;
    const product = await getProductByIdService(id);
    return product[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addProduct = async (_: any, args: any, context: any) => {
  try {
    graphQlAuthCheck(context.token);
    const { product } = args;
    const token = context.req.headers.authorization;
    const newProduct = await addNewProductService(product, token);
    return newProduct;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateProduct = async (_: any, args: any, {token}: any) => {
  try {
    graphQlAuthCheck(token);
    const {  input: { product, id  }} = args;
    const updatedProduct = await updateProductService(id, product);
    return updatedProduct[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteProduct = async (_: any, args: any, {token}:any) => {
  try {
    graphQlAuthCheck(token);
    const {
      input: { id },
    } = args;
    const deletedProduct = await deleteProductByIdService(id);
    return deletedProduct[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};
