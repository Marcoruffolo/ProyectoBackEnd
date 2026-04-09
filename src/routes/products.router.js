import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();
const createRouter = (io) => {
    const router = Router();



    router.get("/", async (req, res) => {
        const { limit, page, sort, query } = req.query;        
        const products = await productManager.getProducts({limit,page, sort, query});

        const prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}&limit=${limit}` : null
        const nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}&limit=${limit}` : null
        res.json({
            status : "success",
            payload : products.docs,
            totalPages : products.totalPages,
            prevPage : products.prevPage,
            nextPage : products.nextPage,
            page : products.page,
            hasPrevPage : products.hasPrevPage,
            hasNextPage : products.hasNextPage,
            prevLink : prevLink,
            nextLink : nextLink
        });
    });

    router.get("/:pid", async (req, res) => {
        const pid = Number(req.params.pid);
        const product = await productManager.getProductById(pid);
        res.json(product);
    });

    router.post("/", async (req, res) => {
        const product = await productManager.addProduct(req.body);
        const products = await productManager.getProducts();
        io.emit("updateProducts", products);
        res.json(product);
    });

    router.put("/:pid", async (req, res) => {
        const pid = Number(req.params.pid);
        const product = await productManager.updateProduct(pid, req.body);
        res.json(product);
    });

    router.delete("/:pid", async (req, res) => {
        const pid = Number(req.params.pid);
        const product = await productManager.deleteProduct(pid);
        const products = await productManager.getProducts();
        io.emit("updateProducts", products);
        res.json(product);
    })

    return router;
};
export default createRouter;