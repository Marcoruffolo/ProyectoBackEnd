
import Product from "../models/Product.js";

class ProductManager {

    async getProducts({ limit = 10, page = 1, sort, query}) {

        const sortOption = sort ? {price : sort === "asc" ? 1 : -1} : {}

        const filterOption = query ? {category : query} : {};

        const filter =  filterOption;
        const options = {
            limit : limit,
            page : page,
            sort: sortOption 
            
        }
        return await Product.paginate(filter,options);
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
