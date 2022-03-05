import request from "../../utils/request";
import { ICreateUser, ILogin } from "./auth.model";

class AuthService {
    ENDPOINT = 'api/BookStore';

    public async login(data: ILogin): Promise<any> {
        const url = `${this.ENDPOINT}/Login`;
        return request({ url, method: 'POST', data }).then((res) => {
            return res.data;
        });
    }

    public async create(data: ICreateUser): Promise<any> {
        const url = `${this.ENDPOINT}/RegisterUser`;
        return request({ url, method: 'POST', data }).then((res) => {
            return res.data;
        });
    }
}
export default new AuthService();
