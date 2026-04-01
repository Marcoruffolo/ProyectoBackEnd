import fs from "fs/promises";

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: Date.now(),
            products: []
        }
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const index = carts.findIndex((c) => c.id === cartId);
        if (index === -1) {
            return null;
        }
        const productIndex = carts[index].products.findIndex((p) => p.product === productId);

        if (productIndex != -1) {
            carts[index].products[productIndex].quantity += 1;
        }
        else {
            carts[index].products.push({ product: productId, quantity: 1 });
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return carts[index];
    }
}

export default CartManager;