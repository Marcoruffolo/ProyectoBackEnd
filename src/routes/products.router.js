import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager("./data/products.json");
const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const product = await productManager.getProductById(pid);
    res.json(product);
});

router.post("/", async (req, res) => {
    const product = await productManager.addProduct(req.body);
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
    res.json(product);
})

export default router;