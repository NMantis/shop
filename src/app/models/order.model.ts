import {Product} from './product.model';

export class Order {
    _id: String;
    products: Product[];
    method: String;
    total: number;
    user_id: String;
    address_id: String;
    orderDate: Date;
}
