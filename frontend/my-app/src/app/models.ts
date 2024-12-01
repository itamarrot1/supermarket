// // export class product{
// //     id: number =0; // Assuming you have an ID field
// //     name: string = '';
// //     price: number = 0; // Use `number` for decimal values
// //     category: string = '';
// //     stock: number=0; // Use `number` for positive integer values
// //     image: string=''; // Optional, since the image field can be null or blank
    

// }

export class User{
    id : number = 0;
    username : string = '';
    password : string = '';
}

export class Product {
    id: number=0;
    name: string='';
    price: number=0;
    category: string='';
    stock: number=0;
    image: string='';

}

// Define the CartItem class
export class CartItem {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}