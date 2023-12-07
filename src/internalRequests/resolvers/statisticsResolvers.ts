import { getQuantityLogsById } from "../service/internalService";

export const getProductStatistics = async (_: any, args: any) => {
    try {
        const { id } = args;
        const data = await getQuantityLogsById(id);
        return data;      
    } catch (error) {
        console.log(error);
        return error;
    }
};
