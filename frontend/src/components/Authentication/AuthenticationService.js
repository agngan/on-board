import AxiosClient from './AxiosClient';
import Cookies from "universal-cookie";

export const SESSION_USERNAME = 'username';
export const SESSION_TOKEN = 'token';

class AuthenticationService {
    static lastPage;

    executeBasicAuthenticationService(username, password) {
        return AxiosClient.get("basicauth",
            {headers: {authorization: this.createBasicAuthToken(username, password)}});
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(SESSION_USERNAME, username);
        sessionStorage.setItem(SESSION_TOKEN, this.createBasicAuthToken(username, password));
    }

    logout() {
        sessionStorage.removeItem(SESSION_USERNAME);
        sessionStorage.removeItem(SESSION_TOKEN);
    }

    isUserLoggedIn() {
        const user = sessionStorage.getItem(SESSION_USERNAME);
        return user !== null;
    }

    getLoggedInUser() {
        const user = sessionStorage.getItem(SESSION_USERNAME);
        if (user === null)
            return '';
        return user
    }

    getPostHeaders() {
        const cookies = new Cookies();
        const csrfToken = cookies.get("XSRF-TOKEN");
        return {
            "Authorization": SESSION_TOKEN,
            "X-XSRF-TOKEN": csrfToken
        }
    }
}

export default new AuthenticationService()