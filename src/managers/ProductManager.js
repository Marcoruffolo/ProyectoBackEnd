
import Product from "../models/Product.js";

class ProductManager {

    async getProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id); 
    }

    async addProduct(productData) {
        return await Product.create(productData);
    }

    async updateProduct(id, updatedData) {
        return await Product.findByIdAndUpdate(id, updatedData, { new : true});
    }

    async deleteProduct(id) {
        return await  Product.findByIdAndDelete(id);
    }
}

export default ProductManager;
