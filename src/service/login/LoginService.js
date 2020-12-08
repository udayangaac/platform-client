import axios from 'axios';
import AuthService from "../auth";

function setProfile(token) {
    axios.get("http://localhost:8085/oauth2/v1/fb/authenticate?access_token=" + token).then(res => {
        AuthService.setLocalStorage(res.data)
    }).catch(err => {
    });
}

export default setProfile;
