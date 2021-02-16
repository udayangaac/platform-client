import axios from "axios";


const baseUrl = "http://localhost:8003";

class ImageService {

    static uploadImage(e) {
        const uploadUrl = baseUrl + "/ftp/img";
        const data = new FormData();
        const file = e.target.files[0];
        data.append('file', file);
        return axios.post(uploadUrl, data, {})
    }

    static deleteImage(name) {
        const uploadUrl = baseUrl + "/ftp/img?name=" + name;
        return axios.delete(uploadUrl, {})
    }
}

export default ImageService;
