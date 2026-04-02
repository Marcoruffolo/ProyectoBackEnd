import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const cartManager = new CartManager("./data/carts.json");
const router = Router();

router.get("/:cid", async (req, res) => {
    const carts = await cartManager.getCarts();
    const cid = Number(req.params.cid)
    const cart = carts.find(cart => cart.id === cid);
    res.json(cart);
});

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart(req.body);
    res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const cid = Number(req.params.cid);
    const cart = await cartManager.addProductToCart(cid, pid);
    res.json(cart);
});

export default router;