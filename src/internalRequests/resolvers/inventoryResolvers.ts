import { sendGetAllProductsQuery } from "../dal/internalDal";

export const getProducts = async () => {
    try {
        const products = sendGetAllProductsQuery();
        return products;
    } catch (error) {
        console.log(error);
        return error;
    }
}