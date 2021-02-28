import axios from 'axios';
import AuthService from "../auth";
import getBaseURL from "../api/getBaseURL";

function setProfile(props, token) {
    axios.get(getBaseURL("/oauth2/v1/fb/authenticate?access_token=" + token)).then(res => {
        console.log(res.data);
        AuthService.setLocalStorage(res.data);
        props.history.push("/");
    }).catch(err => {
    });
}

export default setProfile;
