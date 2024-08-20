import { axiosInstance } from "../../Modal/APIforaxios";

export const CheckValues = async <T extends { key: string; category: string; location: string }>(data: T): Promise<any | false> => {
    // console.log(data);

   
    if (!data.key && !data.category && !data.location) {
        return false;
    } else {
        try {
            const response = await axiosInstance.get(`/job/search`, {
                params: {
                    key: data.key,
                    category: data.category,
                    location: data.location,
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};
