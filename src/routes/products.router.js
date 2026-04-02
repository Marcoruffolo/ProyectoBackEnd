import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager("./data/products.json");
const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

export default router;