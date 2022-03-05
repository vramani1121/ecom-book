import request from "../../utils/request";
import { ICommonFilter } from "../common.model";
import { IAddOrEditBook } from './book.model';

class BookService {
    ENDPOINT = 'book';

    public async getAll(params: ICommonFilter): Promise<any> {
        const url = `${this.ENDPOINT}/Search`;
        return request({ url, method: 'GET', params }).then((res) => {
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

    public async save(data: IAddOrEditBook): Promise<any> {
        if (data.id) {
            const url = `${this.ENDPOINT}/update`;
            return request({ url, method: 'PUT', data }).then((res) => {
                return res.data;
            });
        } else {
            const url = `${this.ENDPOINT}/create`;
            return request({ url, method: 'POST', data }).then((res) => {
                return res.data;
            });
        }
    }

}
export default new BookService();
