import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js"; // This should be ../ not ./
import { connectDB } from "../config/database.js"; // This should be ../ not ./

connectDB();

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/", ContactRoutes);

export default serverless(app);
