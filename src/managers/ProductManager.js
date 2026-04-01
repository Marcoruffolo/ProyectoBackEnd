import fs from "fs/promises";

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            return null;
        }
        return product;
    }

    async addProduct(productData) {

        const products = await this.getProducts();
        const newProduct = {
            id: Date.now(),
            ...productData
        }
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedData) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return null;
        }
        const { id: _, ...dataWithoutId } = updatedData;
        products[index] = {
            ...products[index],
            ...dataWithoutId
        }
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return null;
        }
        const deletedProduct = products.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return deletedProduct[0];
    }
}

export default ProductManager;
