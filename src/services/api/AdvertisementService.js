import axios from "axios";
import getBaseURL from "./getBaseURL";
import getBearerToken from "./getBearerToken";



class AdvertisementService {
    static saveAdd(data) {
        const uploadUrl = getBaseURL("/user/v1/advertisement");
        return axios.post(uploadUrl, data, {
            headers: {
                Authorization: getBearerToken()
            }
        })
    }
}

export default AdvertisementService;
