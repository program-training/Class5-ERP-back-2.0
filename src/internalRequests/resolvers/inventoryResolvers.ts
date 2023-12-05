import {
  getProductByIdService,
  getAllProductsService,
} from "../service/internalService";

export const getProducts = async () => {
  try {
    const products = await getAllProductsService();
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProduct = async (_: any, args: any) => {
    try {
        const { id } = args;
        const product = await getProductByIdService(id);
        return product[0];      
    } catch (error) {
        console.log(error);
        return error;
    }
};
