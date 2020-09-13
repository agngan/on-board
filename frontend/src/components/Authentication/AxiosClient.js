import Axios from 'axios'
import AuthenticationService, {SESSION_TOKEN} from "./AuthenticationService";

const AxiosClient = () => {
    const instance = Axios.create({baseURL: 'http://localhost:8080/api/'});
    instance.interceptors.request.use(
        config => {
            if (AuthenticationService.isUserLoggedIn())
                config.headers.Authorization = sessionStorage.getItem(SESSION_TOKEN);
            return config;
        }
    );
    return instance;
};

export default AxiosClient();