import {
  getProductByIdService,
  getAllProductsService,
  addNewProductService,
  updateProductService,
  deleteProductByIdService,
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

export const addProduct = async (_:any, args:any, context:any) => {
    try {
        const {product} = args;
        const token = context.req.headers.authorization;
        const newProduct = await addNewProductService(product, token);
        return newProduct;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateProduct = async (_:any, args:any, context:any) => {
  try {
    const {product, id} = args;
    const updatedProduct = await updateProductService(id, product)
    return updatedProduct[0]
  } catch (error) {
    console.error(error);
    return error
  }
}

export const deleteProduct = async (_: any, args: any) => {
  try {
    const { input: { id } } = args
    const deletedProduct = await deleteProductByIdService(id)
    return deletedProduct[0]
  } catch (error) {
    console.error(error);
    return error
  }
}