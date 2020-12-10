import axios from 'axios';
import AuthService from "../auth";

function setProfile(props, token) {
    axios.get("http://localhost:8085/oauth2/v1/fb/authenticate?access_token=" + token).then(res => {
        console.log(res.data);
        AuthService.setLocalStorage(res.data);
        props.history.push("/");
    }).catch(err => {
    });
}

export default setProfile;
