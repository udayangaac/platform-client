class AuthService {
    static getLocalStorageProfile() {
        let dataStr = localStorage.getItem("profile");
        return JSON.parse(dataStr)
    }

    static setLocalStorage(data) {
        localStorage.setItem("profile", JSON.stringify(data));

    }

    static clearLocalStorage() {
        localStorage.removeItem('profile');
    }
}


export default AuthService;
