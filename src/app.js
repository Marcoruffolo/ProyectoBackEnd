import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { engine } from "express-handlebars";
import ProductManager from "./managers/productManager.js"
import { Server } from "socket.io";

const productManager = new ProductManager("./data/products.json");

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/test", (req, res) => {
    res.json({ mensaje: "servidor funcionando" });
});

app.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {products});
});

app.get("/realTimeProducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {products});
});

const httpServer = app.listen(8080, () => {
    console.log("Servidor corriendo en puerto 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Cliente conectado");
});