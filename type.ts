export interface Product {
    product_id: number;
    img: string;
    tag: string;
    product_name: string;
    price: number;
    description: string;
}
export interface Users {
    username: string;
    email: string;
    password: string;
}

export interface Category {
    category_id: number;
    category_name: string;
    description: string;
    imagepath: string;
}