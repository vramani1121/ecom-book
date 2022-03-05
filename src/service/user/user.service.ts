import request from "../../utils/request";
import { ICommonFilter } from "../common.model";

class AuthService {
    ENDPOINT = 'user';

    public async getAllUsers(params: ICommonFilter): Promise<any> {
        const url = `${this.ENDPOINT}/Search`;
        return request({ url, method: 'GET', params }).then((res) => {
            return res.data;
        });
    }

    public async getAllUserRoles(): Promise<any> {
        const url = `${this.ENDPOINT}/UserRoles`;
        return request({ url, method: 'GET' }).then((res) => {
            return res.data;
        });
    }

    public async getById(id: number): Promise<any> {
        const url = `${this.ENDPOINT}/getById?id=${id}`;
        return request({ url, method: 'GET' }).then((res) => {
            return res.data;
        });
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.ENDPOINT}/delete?id=${id}`;
        return request({ url, method: 'DELETE' }).then((res) => {
            return res.data;
        });
    }

    public async update(data: any): Promise<any> {
        const url = `${this.ENDPOINT}/update`;
        return request({ url, method: 'PUT', data }).then((res) => {
            return res.data;
        });
    }

}
export default new AuthService();
