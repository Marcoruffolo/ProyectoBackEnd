import Cart from "../models/Cart.js";

class CartManager {   

    async getCarts() {
        return await Cart.find();
    }

    async createCart() {
        return await Cart.create({ products: []});
    }

    async getCartById(id){
        return await Cart.findById(id).populate("products.product");
    }

    async addProductToCart(cartId, productId) {       
        const cart = await Cart.findById(cartId);
        if(!cart) return null; 
        const productIndex = cart.products.findIndex((p) => p.product.toString() === productId.toString());

        if(productIndex === -1){
            cart.products.push({ product : productId, quantity : 1});
        }
        else{
            cart.products[productIndex].quantity += 1;
        }
        
        await cart.save();
        return cart;
    }
}

export default CartManager;