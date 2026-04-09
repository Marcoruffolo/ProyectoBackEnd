import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const cartManager = new CartManager();
const router = Router();

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
});

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart(req.body);
    res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { pid } = req.params;
    const{ cid }= req.params;
    const cart = await cartManager.addProductToCart(cid, pid);
    res.json(cart);
});

router.delete("/:cid", async (req,res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    cart.products = [];
    await cart.save();
    res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.json(cart);
});

router.put("/:cid/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);    
    const productIndex = cart.products.findIndex((p) => p.product.toString() === pid.toString());
    cart.products[productIndex].quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
});

router.put("/:cid", async (req,res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    cart.products = req.body;
    await cart.save();
    res.json(cart);
});

export default router;