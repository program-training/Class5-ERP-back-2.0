import { getInventoryStatisticsByID } from "../dal/internalDal";

export const getProductStatistics = async (_: any, args: any) => {
    try {
        const { id } = args;
        const data = await getInventoryStatisticsByID(id);
        return data;      
    } catch (error) {
        console.log(error);
        return error;
    }
};
