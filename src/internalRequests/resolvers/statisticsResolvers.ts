import { graphQlAuthCheck } from "../../utils/grapqlAuthCheck";
import { getQuantityLogsById } from "../service/internalService";

export const getProductStatistics = async (_: any, args: any, {token}:any) => {
    try {
        graphQlAuthCheck(token);
        const { id } = args;
        const data = await getQuantityLogsById(id);
        return data;      
    } catch (error) {
        console.log(error);
        return error;
    }
};
